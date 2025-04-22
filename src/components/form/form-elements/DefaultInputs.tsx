import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import DatePicker from "../date-picker.tsx";


interface BookData {
  title: string;
  author: string;
  price: string; 
  genre: string;
  date: string;
}


interface DefaultInputsProps {
  bookData: BookData;
  onChange: (field: keyof BookData, value: string) => void;
}

export default function DefaultInputs({ bookData, onChange }: DefaultInputsProps) {
  const options = [
    { value: "Fiction", label: "Fiction" },
    { value: "Education", label: "Education" },
    { value: "Psychology", label: "Psychology" },
    { value: "Motivation", label: "Motivation" },
    { value: "Fitness", label: "Fitness" },
    { value: "Romance", label: "Romance" },
    { value: "Mystery", label: "Mystery" },
    { value: "Thriller", label: "Thriller" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Biography", label: "Biography" },
    { value: "Self-Help", label: "Self-Help" },
    { value: "Business", label: "Business" },
    { value: "Health", label: "Health" },
    { value: "Travel", label: "Travel" },
    { value: "History", label: "History" },
    { value: "Children", label: "Children" },
    { value: "Young Adult", label: "Young Adult" },
    { value: "Horror", label: "Horror" },
    { value: "Religion", label: "Religion" },
    { value: "Spirituality", label: "Spirituality" },
    { value: "Comics", label: "Comics" },
    { value: "Technology", label: "Technology" },
    { value: "Cooking", label: "Cooking" },
    { value: "Parenting", label: "Parenting" },
    { value: "True Crime", label: "True Crime" },
    { value: "Poetry", label: "Poetry" },
    { value: "Drama", label: "Drama" },
    { value: "Art", label: "Art" },
    { value: "Photography", label: "Photography" },
    { value: "Science", label: "Science" },
    { value: "Law", label: "Law" },
  ];

  return (
    <ComponentCard title="Insert New Book Information">
      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Book Title</Label>
          <Input
            type="text"
            id="title"
            value={bookData.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="author">Book Author</Label>
          <Input
            
            type="text"
            id="author"
            value={bookData.author}
            onChange={(e) => onChange("author", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="price">Book Prices</Label>
          <Input
            
            type="text"
            id="price"
            value={bookData.price}
            onChange={(e) => onChange("price", e.target.value)}
          />
        </div>
        <div>
          <Label>Select Genres</Label>
          <Select
            
            options={options}
            value={bookData.genre}
            placeholder="Select a genre"
            onChange={(value) => onChange("genre", value)}
          />
        </div>
        <div>
          <DatePicker
         
            id="date-picker"
            label="Date Picker Input"
            placeholder="Select a date"
            onChange={(dates, dateString) => {
              onChange("date", dateString);
            }}
          />
        </div>
      </div>
    </ComponentCard>
  );
}