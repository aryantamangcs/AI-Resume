import { InputField } from "@/components/common/hook-form/InputField";
import { Button } from "@/components/ui/button";
import { GripHorizontal, TrashIcon } from "lucide-react";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";

interface EducationItemInterface {
  id: string;
  index: number;
  remove: (index: number) => void;
}
export const EducationItem: FC<EducationItemInterface> = ({
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
        <h2 className="font-semibold">Education {index + 1}</h2>
        <GripHorizontal
          className="size-5 hover:cursor-grab text-muted-foreground"
          {...attributes}
          {...listeners}
        />
      </header>
      <main>
        <InputField
          name={`educations[${index}].degree`}
          label="Degree"
          placeholder="Ex: Bachelor in Computer Science"
        />
        <InputField
          name={`educations[${index}].school`}
          label="School/University"
          placeholder="Ex: ABC School/University "
        />
        <div className="flex gap-4">
          <InputField
            name={`educations[${index}].start_date`}
            label="Start date"
            placeholder="Ex: When you started the schooling"
            className="w-1/2"
          />
          <InputField
            name={`educations[${index}].end_date`}
            label="End date"
            placeholder="Ex: When you ended the schooling"
            className="w-1/2"
            description="Leave end date blank if you are currently studying at the school"
          />
        </div>
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
