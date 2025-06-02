import { EditorView } from "@/modules/editor/components/EditorView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design your resume",
};
const Page = () => {
  return <EditorView />;
};

export default Page;
