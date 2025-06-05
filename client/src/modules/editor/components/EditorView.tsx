"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { EditorBreadCrumbs } from "./EditorBreadCrumbs";
import EditorSteps, { StepsInferface } from "../steps";
import { ResumeValues } from "../schemas";
import { ResumePreview } from "./ResumePreview";
export const EditorView = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<StepsInferface | null>(null);

  const nextStep = () => {
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };
  const previousStep = () => {
    setCurrentIndex((currentIndex) => currentIndex - 1);
  };

  useEffect(() => {
    setCurrentStep(EditorSteps[currentIndex]);
  }, [currentIndex]);

  if (!currentStep) return;
  return (
    <div className="w-screen flex flex-col h-full">
      <EditorHeader />
      <EditorCanvas currentStep={currentStep} />
      <EditorFooter
        nextStep={nextStep}
        previousStep={previousStep}
        currentIndex={currentIndex}
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
}

const EditorFooter: FC<EditorFooterProps> = ({
  nextStep,
  previousStep,
  currentIndex,
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
}
const EditorCanvas: FC<EditorCanvasProps> = ({ currentStep }) => {
  const CurrentStepComponent = currentStep.component;
  const [resumeData, setResumeData] = useState<ResumeValues>();

  return (
    <main className="grow flex">
      <div className="w-full md:w-1/2 p-4 flex flex-col gap-4">
        <EditorBreadCrumbs steps={EditorSteps} currentStep={currentStep} />
        <CurrentStepComponent
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      </div>
      <div className="w-1/2 md:flex hidden border-l p-4 bg-secondary justify-center">
        {resumeData && <ResumePreview resumeData={resumeData} />}
      </div>
    </main>
  );
};
