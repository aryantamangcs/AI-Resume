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
}
export const EditorBreadCrumbs: FC<EditorBreadCrumbsProps> = ({
  steps,
  currentStep,
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
                className={isCurrent(step.key) ? "font-bold text-black" : ""}
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
