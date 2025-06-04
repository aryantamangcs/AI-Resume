import { InputField } from "@/components/common/hook-form/InputField";
import { TextAreaField } from "@/components/common/hook-form/TextAreaField";
import { Button } from "@/components/ui/button";
import { GripHorizontal, TrashIcon } from "lucide-react";
import { FC } from "react";

interface WorkExperienceItemInterface {
  index: number;
  remove: (index: number) => void;
}
export const WorkExperienceItem: FC<WorkExperienceItemInterface> = ({
  index,
  remove,
}) => {
  return (
    <div className="border p-4 rounded-md">
      <header className="flex justify-between">
        <h2 className="font-semibold">Work Experience {index + 1}</h2>
        <GripHorizontal className="size-5 hover:cursor-pointer text-muted-foreground" />
      </header>
      <main>
        <InputField
          name={`work_experiences[${index}].position`}
          label="Position"
          placeholder="Ex: Full Stack Developer"
        />
        <InputField
          name={`work_experiences[${index}].company`}
          label="company"
          placeholder="Ex: ABC Company"
        />
        <div className="flex gap-4">
          <InputField
            name={`work_experiences[${index}].start_date`}
            label="Start date"
            placeholder="Ex: When you started the company"
            className="w-1/2"
          />
          <InputField
            name={`work_experiences[${index}].end_date`}
            label="End date"
            placeholder="Ex: When you left the company"
            className="w-1/2"
            description="Leave end date blank if you are currently working at the company"
          />
        </div>
        <TextAreaField
          name={`work_experiences[${index}].description`}
          label="Description"
          placeholder="Ex: Description about your role"
        />

        <Button
          variant="destructive"
          className="w-fit"
          onClick={() => remove(index)}
        >
          <TrashIcon className="size-4" />
          Remove
        </Button>
      </main>
    </div>
  );
};
