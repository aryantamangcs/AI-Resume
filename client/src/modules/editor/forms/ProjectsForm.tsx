"use client";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { projectSchema, projectValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FC, useEffect } from "react";
import { EditorFormProps } from "@/interfaces";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { ProjectItem } from "./components/ProjectItem";
export const ProjectsForm: FC<EditorFormProps> = ({
  resumeData,
  setResumeData,
}) => {
  const form = useForm<projectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects: resumeData?.projects || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });
  useEffect(() => {
    const debounceValidate = debounce(async () => {
      await form.trigger();
    }, 500);

    const subscription = form.watch((values) => {
      setResumeData({
        ...resumeData,
        projects: values?.projects?.filter((exp) => exp !== undefined) || [],
      });
      debounceValidate();
    });

    return () => {
      subscription.unsubscribe?.();
      debounceValidate.cancel();
    };
  }, [form, resumeData, setResumeData]);

  const addProject = () => {
    append({
      name: "",
      description: "",
    });
  };

  const onSubmit = form.handleSubmit((data) => {
    console.log("the data", data);
  });
  return (
    <div>
      <header className="text-center">
        <h2 className="font-semibold text-xl">Projects</h2>
        <p className="text-muted-foreground text-sm">Add your Projects</p>
      </header>
      <main>
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 scroll-auto"
            >
              {fields.map((field, index) => {
                return (
                  <ProjectItem key={index} index={index} remove={remove} />
                );
              })}
            </form>
          </Form>
          <Button onClick={addProject} className="w-fit my-4">
            <PlusSquare width={25} height={25} />
            Add Project
          </Button>
        </FormProvider>
      </main>
    </div>
  );
};
