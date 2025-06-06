
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import PageMeta from "../../components/common/PageMeta";
import { db, getFileViewUrl, uploadFile } from "../../appwrite/databases";
import { account } from "../../appwrite/config";
import { ID } from "appwrite";

export default function FormElements() {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        if (!user.labels?.includes("admin")) {
          throw new Error("Unauthorized: Admin access required");
        }
        setUserId(user.$id);
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/signin");
      }
    };
    checkAuth();
  }, [navigate]);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    date: "",
    description: "",
    file: null as File | null,
    audio: null as File | null,
    coverPage: null as File | null,
    authorImage: null as File | null,
  });

  const handleChange = (field: keyof typeof bookData, value: string | File | null) => {
    setBookData((prev) => ({
      ...prev,
      [field]: value,
    }))
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let fileId: string | null = null;
    let audioId: string | null = null;
    let authorImageId: string | null = null;
    let coverPageId: string | null = null;
    let authorImageUrl: string | null = null;
    let coverPageUrl: string | null = null;

    try {
      if (!userId) {
        toast.error("Authentication required");
        navigate("/signin");
        return;
      }

      // Validate required fields
      if (!bookData.title || !bookData.author || !bookData.price || !bookData.genre) {
        toast.error("Title, author, price, and genre are required");
        setIsLoading(false);
        return;
      }

      // Enforce image upload
      if (!bookData.coverPage || !bookData.file ||  !bookData.authorImage) {
        toast.error("Please upload a cover page, file, and author image");
        setIsLoading(false);
        return;
      }



      if (bookData.file) {
        const fileResponse = await uploadFile(bookData.file);
        if (fileResponse && fileResponse.$id) {
          fileId = fileResponse.$id;
        } else {
          throw new Error("File upload failed");
        }
      }

      // Image is guaranteed to exist due to validation
      const imageResponse = await uploadFile(bookData.coverPage);
      if (imageResponse && imageResponse.$id) {
        coverPageId = imageResponse.$id;
        coverPageUrl = getFileViewUrl(coverPageId);
      } else {
        throw new Error("Cover page upload failed");
      }

      if (bookData.audio){
        const audioResponse = await uploadFile(bookData.audio);
        if (audioResponse && audioResponse.$id) {
          audioId = audioResponse.$id;
        } else {
          throw new Error("Audio upload failed");
        }
      }

      if (bookData.authorImage) {
        const authorImageResponse = await uploadFile(bookData.authorImage);
        if (authorImageResponse && authorImageResponse.$id) {
          authorImageId = authorImageResponse.$id;
          authorImageUrl = getFileViewUrl(authorImageId);
        } else {
          throw new Error("Author image upload failed");
        }
      }

      const bookPayload = {
        "title": bookData.title,
        "author": bookData.author,
        "description": bookData.description,
        "genre": bookData.genre,
        "createdAt": bookData.date,
        "price": parseFloat(bookData.price),
        "coverPageId": coverPageId,
        "fileId": fileId,
        "adminId": userId,
        "audioId":audioId,
        "authorImageId": authorImageId,
        "coverPageUrl": coverPageUrl,
        "authorImageUrl": authorImageUrl,
        "bookId": ID.unique(),
      
      };

      const response = await db.books.create(bookPayload);
      console.log("Book created:", response);
      toast.success("Book added successfully")

      setBookData({
        title: "",
        author: "",
        description: "",
        genre: "",
        date: "",
        price: "",
        coverPage: null,
        file: null,
        audio: null,
        authorImage: null,
      });

      toast.success("Book added successfully!");
    } catch (error: any) {
      console.error("Error creating book:", error);
      if (error.code === 401) {
        toast.error("Unauthorized: Insufficient permissions to upload files.");
      } else if (error.message.includes("Missing required attribute")) {
        toast.error(`Invalid form data: ${error.message}`);
      } else {
        toast.error(`Failed to add book: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageMeta title="Form Elements Dashboard" description="Form Elements Dashboard page" />
      <PageBreadcrumb pageTitle="New Book" />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <DefaultInputs bookData={bookData} onChange={handleChange} />
            <TextAreaInput
              value={bookData.description}
              onChange={(value) => handleChange("description", value)}
            />
          </div>
          <div className="space-y-6">
            <FileInputExample onChange={(file) => handleChange("file", file)} label="Upload File"/>
            <FileInputExample onChange={(authorImage) => handleChange("authorImage", authorImage)} label="Author Photo (PNG or JPG only)"/>
            <FileInputExample onChange={(audio) => handleChange("audio", audio)}  label="Upload Audio"/>
            <DropzoneComponent
              onDrop={(file) => {
                if (file) {
                  handleChange("coverPage", file);
                } else {
                  toast.error("Please drop a valid image file");
                }
              }}
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
