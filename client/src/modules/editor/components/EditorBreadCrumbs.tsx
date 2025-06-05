import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { StepsInferface } from "../steps";
import { FC } from "react";

interface EditorBreadCrumbsProps {
  steps: Array<StepsInferface>;
  currentStep: StepsInferface;
  setCurrent: (key: string, index: number) => void;
}
export const EditorBreadCrumbs: FC<EditorBreadCrumbsProps> = ({
  steps,
  currentStep,
  setCurrent,
}) => {
  const isCurrent = (key: string) => {
    return key === currentStep.key;
  };
  return (
    <Breadcrumb className="flex justify-center" suppressHydrationWarning>
      <BreadcrumbList>
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => setCurrent(step?.key, index)}
                className={
                  isCurrent(step.key)
                    ? "font-bold text-black dark:text-white"
                    : ""
                }
              >
                {step?.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
