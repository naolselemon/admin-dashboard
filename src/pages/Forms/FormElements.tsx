
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import PageMeta from "../../components/common/PageMeta";
import { db, uploadFile } from "../../appwrite/databases";
import { account } from "../../appwrite/config";

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
    image: null as File | null,
  });

  const handleChange = (field: keyof typeof bookData, value: string | File | null) => {
    setBookData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let fileId: string | null = null;
    let imageId: string | null = null;
    let audioId: string | null = null;

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
      if (!bookData.image || !bookData.file) {
        toast.error("An image and file is required for the book");
        setIsLoading(false);
        return;
      }



      if (bookData.file) {
        const fileResponse = await uploadFile(bookData.file);
        fileId = fileResponse.$id;
      }

      // Image is guaranteed to exist due to validation
      const imageResponse = await uploadFile(bookData.image);
      imageId = imageResponse.$id;

      if (bookData.audio){
        const audioResponse = await uploadFile(bookData.audio)
        audioId = audioResponse.$id
      }

      const bookPayload = {
        "title": bookData.title,
        "author": bookData.author,
        "description": bookData.description,
        "genre": bookData.genre,
        "date": bookData.date,
        "price": parseFloat(bookData.price),
        "imageId": imageId,
        "fileId": fileId,
        "adminId": userId,
        "audioId":audioId
        
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
        image: null,
        file: null,
        audio: null,
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
            <FileInputExample onChange={(audio) => handleChange("audio", audio)}  label="Upload Audio"/>
            <DropzoneComponent
              onDrop={(file) => {
                if (file) {
                  handleChange("image", file);
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
