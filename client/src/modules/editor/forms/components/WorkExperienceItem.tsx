import { InputField } from "@/components/common/hook-form/InputField";
import { TextAreaField } from "@/components/common/hook-form/TextAreaField";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { GripHorizontal, TrashIcon } from "lucide-react";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
interface WorkExperienceItemInterface {
  id: string;
  index: number;
  remove: (index: number) => void;
}
export const WorkExperienceItem: FC<WorkExperienceItemInterface> = ({
  index,
  remove,
  id,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className={cn(
        "border p-4 rounded-md bg-white",
        isDragging && "shadow-xl z-50 cursor-grab relative",
      )}
      style={style}
      ref={setNodeRef}
    >
      <header className="flex justify-between">
        <h2 className="font-semibold">Work Experience {index + 1}</h2>
        <GripHorizontal
          className="size-5 hover:cursor-grab text-muted-foreground"
          {...attributes}
          {...listeners}
        />
      </header>
      <main>
        <InputField
          name={`work_experiences[${index}].position`}
          label="Position"
          placeholder="Ex: Full Stack Developer"
        />
        <InputField
          name={`work_experiences[${index}].company`}
          label="Company"
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
