import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";

interface FileInputExampleProps {
  onChange: (file: File | null) => void;
  label: string
}

export default function FileInputExample({ onChange, label }: FileInputExampleProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <ComponentCard title="File Input">
      <div>
        <Label>{label}</Label>
        <FileInput onChange={handleFileChange} className="custom-class" />
      </div>
    </ComponentCard>
  );
}