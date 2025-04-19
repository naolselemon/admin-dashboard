import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";

interface TextAreaInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextAreaInput({ value, onChange }: TextAreaInputProps) {
  return (
    <ComponentCard title="Book Description">
      <div className="space-y-6">
        <div>
          <Label>Description</Label>
          <TextArea
            value={value}
            onChange={onChange}
            rows={6}
          />
        </div>
      </div>
    </ComponentCard>
  );
}