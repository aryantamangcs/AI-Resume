import { FC } from "react";
import { GeneralInformationForm } from "./forms/GeneralInformationForm";
import { PersonalInformationForm } from "./forms/PersonalInformationForm";
import { WorkExperienceForm } from "./forms/WorkExperienceInformation";
import { EducationsForm } from "./forms/EductaionsForm";
import { SkillsForm } from "./forms/SkillsForm";
import { SummaryForm } from "./forms/SummaryForm";
import { ProjectsForm } from "./forms/ProjectsForm";

export interface StepsInferface {
  title: string;
  key: string;
  component: React.ComponentType;
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
  {
    title: "Work Experience",
    key: "work-experience",
    component: WorkExperienceForm,
  },
  {
    title: "Education",
    key: "education",
    component: EducationsForm,
  },
  {
    title: "Skills",
    key: "skills",
    component: SkillsForm,
  },
  {
    title: "Projects",
    key: "projects",
    component: ProjectsForm,
  },
  {
    title: "Summary",
    key: "summary",
    component: SummaryForm,
  },
];

export default EditorSteps;
