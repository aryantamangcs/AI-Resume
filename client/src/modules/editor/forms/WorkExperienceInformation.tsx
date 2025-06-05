"use client";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { workExperienceSchema, WorkExperienceValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FC, useEffect } from "react";
import { EditorFormProps } from "@/interfaces";
import { debounce } from "lodash";
import { WorkExperienceItem } from "./components/WorkExperienceItem";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
export const WorkExperienceForm: FC<EditorFormProps> = ({
  resumeData,
  setResumeData,
}) => {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      work_experiences: resumeData?.work_experiences || [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "work_experiences",
  });
  useEffect(() => {
    const debounceValidate = debounce(async () => {
      await form.trigger();
    }, 500);

    const subscription = form.watch((values) => {
      setResumeData({
        ...resumeData,
        work_experiences:
          values?.work_experiences?.filter((exp) => exp !== undefined) || [],
      });
      debounceValidate();
    });

    return () => {
      subscription.unsubscribe?.();
      debounceValidate.cancel();
    };
  }, [form, resumeData, setResumeData]);

  const addWorkExperience = () => {
    append({
      position: "",
      company: "",
      start_date: "",
      end_date: "",
      description: "",
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id === over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      console.log("Old", oldIndex);
      console.log("New", newIndex);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  };

  const onSubmit = form.handleSubmit((data) => {
    console.log("the data", data);
  });
  return (
    <div>
      <header className="text-center">
        <h2 className="font-semibold text-xl">Work Experience</h2>
        <p className="text-muted-foreground text-sm">
          You can add as many as experience you like
        </p>
      </header>
      <main>
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 scroll-auto"
            >
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEvent}
              >
                <SortableContext
                  items={fields}
                  strategy={verticalListSortingStrategy}
                >
                  {fields.map((field, index) => {
                    return (
                      <WorkExperienceItem
                        id={field.id}
                        key={field.id}
                        index={index}
                        remove={remove}
                      />
                    );
                  })}
                </SortableContext>
              </DndContext>
            </form>
          </Form>
          <Button onClick={addWorkExperience} className="w-fit my-4">
            <PlusSquare width={25} height={25} />
            Add Experience
          </Button>
        </FormProvider>
      </main>
    </div>
  );
};
