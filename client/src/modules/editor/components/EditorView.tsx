"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { EditorBreadCrumbs } from "./EditorBreadCrumbs";
import EditorSteps, { StepsInferface } from "../steps";
import { ResumeValues } from "../schemas";
import { ResumePreview } from "./ResumePreview";
import { FileIcon, Image } from "lucide-react";
import { cn } from "@/lib/utils";
export const EditorView = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<StepsInferface | null>(null);
  const [showSmResumePreview, setShowSmResumePreview] =
    useState<boolean>(false);

  const nextStep = () => {
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };
  const previousStep = () => {
    setCurrentIndex((currentIndex) => currentIndex - 1);
  };

  const setCurrent = (key: string, index: number) => {
    const step = EditorSteps.find((step) => {
      return step.key === key;
    });
    if (step) {
      setCurrentStep(step);

      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    setCurrentStep(EditorSteps[currentIndex]);
  }, [currentIndex]);

  if (!currentStep) return;
  return (
    <div className="w-screen flex flex-col h-full">
      <EditorHeader />
      <EditorCanvas
        currentStep={currentStep}
        setCurrent={setCurrent}
        showSmResumePreview={showSmResumePreview}
      />
      <EditorFooter
        nextStep={nextStep}
        previousStep={previousStep}
        currentIndex={currentIndex}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
      />
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
interface EditorFooterProps {
  nextStep: () => void;
  previousStep: () => void;
  currentIndex: number;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
}

const EditorFooter: FC<EditorFooterProps> = ({
  nextStep,
  previousStep,
  currentIndex,
  showSmResumePreview,
  setShowSmResumePreview,
}) => {
  const total_steps: number = EditorSteps.length;
  const disablePrevious = () => currentIndex == 0;
  const disableNext = () => currentIndex > total_steps - 2;
  return (
    <div className="flex justify-center w-full border-t">
      <footer className="flex justify-between p-4 w-full max-w-[1000px]">
        <div className="flex gap-4 items-center">
          <Button
            variant="secondary"
            onClick={previousStep}
            disabled={disablePrevious()}
          >
            Previous Step
          </Button>
          <Button onClick={nextStep} disabled={disableNext()}>
            Next Step
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="hover:cursor-pointer md:hidden"
          title={showSmResumePreview ? "Show Form" : "Show Resume Preview"}
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
        >
          {showSmResumePreview ? <FileIcon /> : <Image />}
        </Button>
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

interface EditorCanvasProps {
  currentStep: StepsInferface;
  setCurrent: (key: string, index: number) => void;
  showSmResumePreview: boolean;
}

const EditorCanvas: FC<EditorCanvasProps> = ({
  currentStep,
  setCurrent,
  showSmResumePreview,
}) => {
  const CurrentStepComponent = currentStep.component;
  const [resumeData, setResumeData] = useState<ResumeValues>();

  return (
    <main className="grow flex">
      <div
        className={cn(
          "w-full md:w-1/2 p-4 flex flex-col gap-4 md:block",
          showSmResumePreview && "hidden",
        )}
      >
        <EditorBreadCrumbs
          steps={EditorSteps}
          currentStep={currentStep}
          setCurrent={setCurrent}
        />
        <CurrentStepComponent
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      </div>
      <div
        className={cn(
          "w-full md:w-1/2 md:flex border-l p-4 bg-secondary justify-center",
          showSmResumePreview ? "flex" : "hidden",
        )}
      >
        {resumeData && <ResumePreview resumeData={resumeData} />}
      </div>
    </main>
  );
};
