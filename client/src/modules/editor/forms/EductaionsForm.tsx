"use client";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  educationSchema,
  EducationValues,
  workExperienceSchema,
  WorkExperienceValues,
} from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FC, useEffect } from "react";
import { EditorFormProps } from "@/interfaces";
import { debounce } from "lodash";
import { WorkExperienceItem } from "./components/WorkExperienceItem";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { EducationItem } from "./components/EducationItem";
export const EducationsForm: FC<EditorFormProps> = ({
  resumeData,
  setResumeData,
}) => {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData?.educations || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });
  useEffect(() => {
    const debounceValidate = debounce(async () => {
      await form.trigger();
    }, 500);

    const subscription = form.watch((values) => {
      setResumeData({
        ...resumeData,
        educations:
          values?.educations?.filter((exp) => exp !== undefined) || [],
      });
      debounceValidate();
    });

    return () => {
      subscription.unsubscribe?.();
      debounceValidate.cancel();
    };
  }, [form, resumeData, setResumeData]);

  const addEducation = () => {
    append({
      degree: "",
      school: "",
      start_date: "",
      end_date: "",
    });
  };

  const onSubmit = form.handleSubmit((data) => {
    console.log("the data", data);
  });
  return (
    <div>
      <header className="text-center">
        <h2 className="font-semibold text-xl">Education</h2>
        <p className="text-muted-foreground text-sm">Add your educations</p>
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
                  <EducationItem key={index} index={index} remove={remove} />
                );
              })}
            </form>
          </Form>
          <Button onClick={addEducation} className="w-fit my-4">
            <PlusSquare width={25} height={25} />
            Add Education
          </Button>
        </FormProvider>
      </main>
    </div>
  );
};
