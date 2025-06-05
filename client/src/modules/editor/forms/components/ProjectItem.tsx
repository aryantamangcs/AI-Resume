import { InputField } from "@/components/common/hook-form/InputField";
import { TextAreaField } from "@/components/common/hook-form/TextAreaField";
import { Button } from "@/components/ui/button";
import { GripHorizontal, TrashIcon } from "lucide-react";
import { FC } from "react";

interface ProjectItemInterface {
  index: number;
  remove: (index: number) => void;
}
export const ProjectItem: FC<ProjectItemInterface> = ({ index, remove }) => {
  return (
    <div className="border p-4 rounded-md">
      <header className="flex justify-between">
        <h2 className="font-semibold">Project {index + 1}</h2>
        <GripHorizontal className="size-5 hover:cursor-pointer text-muted-foreground" />
      </header>
      <main>
        <InputField
          name={`projects[${index}].name`}
          label="Project"
          placeholder="Ex: AI Resume Builder"
        />
        <TextAreaField
          name={`projects[${index}].description`}
          label="Description"
          placeholder="Ex: Description about your project"
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
