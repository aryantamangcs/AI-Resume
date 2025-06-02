import { ResumesView } from "@/modules/resumes/components/ResumesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your resumes",
};
const Page = () => {
  return <ResumesView />;
};

export default Page;
