// import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
// import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import DatePicker from "../date-picker.tsx";

export default function DefaultInputs() {
  // const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "Fiction", label: "Fiction" },
    { value: "Education", label: "Education" },
    { value: "Psychology", label: "Psychology"},
    { value: "Motivation", label: "Motivation"},
    { value: "Fitness", label: "Fitness"},
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
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <ComponentCard title="Insert New Book Information">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">Book Title</Label>
          <Input type="text" id="input" />
        </div>
        <div>
          <Label htmlFor="input">Book Author</Label>
          <Input type="text" id="input" />
        </div>
        <div>
          <Label htmlFor="input">Book Prices</Label>
          <Input type="text" id="input" placeholder="100.00 Birr"/>
        </div>
        <div>
          <Label>Select Genres</Label>
          <Select
            options={options}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>

        <div>
          <DatePicker
            id="date-picker"
            label="Date Picker Input"
            placeholder="Select a date"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>

        {/* <div>
          <Label>Password Input</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
        </div> 


        <div>
          <Label htmlFor="tm">Time Picker Input</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="tm">Input with Payment</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Card number"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
                <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
                <path
                  d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                  fill="#FC6020"
                />
              </svg>
            </span>
          </div>
        </div> */}
      </div> 
    </ComponentCard>
  );
}
