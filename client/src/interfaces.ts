import { ResumeValues } from "./modules/editor/schemas";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}
