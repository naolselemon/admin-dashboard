import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import { db } from "../../appwrite/databases"; 

export default function FormElements() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    publishDate: "",
    description: "",
    file: null as File | null,
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

    try {
     
      const bookPayload = {
        title: bookData.title,
        author: bookData.author,
        price: parseFloat(bookData.price), 
        genre: bookData.genre,
        publishDate: bookData.publishDate,
        description: bookData.description,
        
      };

      
      const response = await db.books.create(bookPayload);
      console.log("Book created:", response);

      
      setBookData({
        title: "",
        author: "",
        price: "",
        genre: "",
        publishDate: "",
        description: "",
        file: null,
        image: null,
      });

      alert("Book added successfully!");
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <div>
      <PageMeta
        title="Form Elements Dashboard"
        description="Form Elements Dashboard page"
      />
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
            <FileInputExample
              onChange={(file) => handleChange("file", file)}
            />
            <DropzoneComponent
              onDrop={(files) => handleChange("image", files[0])} 
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 "
          >
            Submit Book
          </button>
        </div>
      </form>
    </div>
  );
}