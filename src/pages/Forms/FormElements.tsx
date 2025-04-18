import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import PageMeta from "../../components/common/PageMeta";

// import InputGroup from "../../components/form/form-elements/InputGroup";
// import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
// import RadioButtons from "../../components/form/form-elements/RadioButtons";
// import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
// import SelectInputs from "../../components/form/form-elements/SelectInputs";
// import InputStates from "../../components/form/form-elements/InputStates";

export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="Form Elements Dashboard "
        description=" Form Elements  Dashboard page"
      />
      <PageBreadcrumb pageTitle="New Book" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <TextAreaInput />
          {/* <SelectInputs /> */}
          {/* <InputStates /> */}
        </div>
        <div className="space-y-6">
          <FileInputExample />
          <DropzoneComponent />

          {/* <InputGroup /> */}
          {/* <CheckboxComponents /> */}
          {/* <RadioButtons /> */}
          {/* <ToggleSwitch /> */}
         
        </div>
      </div>
    </div>
  );
}
