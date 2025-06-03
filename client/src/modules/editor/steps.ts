import { FC } from "react";
import { GeneralInformationForm } from "./forms/GeneralInformationForm";
import { PersonalInformationForm } from "./forms/PersonalInformationForm";

export interface StepsInferface {
  title: string;
  key: string;
  component: FC;
}
const EditorSteps: Array<StepsInferface> = [
  {
    title: "General Information",
    key: "general-info",
    component: GeneralInformationForm,
  },
  {
    title: "Personal Information",
    key: "personal-info",
    component: PersonalInformationForm,
  },
];

export default EditorSteps;
