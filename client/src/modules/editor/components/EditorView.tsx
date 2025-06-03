import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import { GeneralInformationForm } from "../forms/GeneralInformationForm";
import { PersonalInformationForm } from "../forms/PersonalInformationForm";
export const EditorView = () => {
  return (
    <div className="w-screen flex flex-col h-full">
      <EditorHeader />
      <EditorCanvas />
      <EditorFooter />
    </div>
  );
};

const EditorHeader: FC = () => {
  return (
    <header className="flex flex-col items-center gap-2 w-full border-b p-4">
      <h1 className="font-bold text-xl capitalize">Design your resume</h1>
      <p className="text-sm text-muted-foreground">
        Follow the steps below to create your resume. Your resume will be saved
        automatically.
      </p>
    </header>
  );
};

const EditorFooter: FC = () => {
  return (
    <div className="flex justify-center w-full border-t">
      <footer className="flex justify-between p-4 w-full max-w-[1000px]">
        <div className="flex gap-4 items-center">
          <Button variant="secondary">Previous Step</Button>
          <Button>Next Step</Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="text-sm text-muted-foreground opacity-0">Saving...</p>
        </div>
      </footer>
    </div>
  );
};

const EditorCanvas: FC = () => {
  return (
    <main className="grow flex">
      <div className="w-full md:w-1/2 p-4">
        {/* <GeneralInformationForm /> */}
        <PersonalInformationForm />
      </div>
      <div className="w-1/2 md:flex hidden border-l p-4">right</div>
    </main>
  );
};
