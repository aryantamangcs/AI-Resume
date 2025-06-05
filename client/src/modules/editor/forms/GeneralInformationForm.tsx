"use client";
import { FormProvider, useForm } from "react-hook-form";
import { generalInformationSchema, GeneralInformationValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/hook-form/InputField";
import { FC, useEffect } from "react";
import { EditorFormProps } from "@/interfaces";
import { debounce } from "lodash";
export const GeneralInformationForm: FC<EditorFormProps> = ({
  resumeData,
  setResumeData,
}) => {
  const form = useForm<GeneralInformationValues>({
    resolver: zodResolver(generalInformationSchema),
    defaultValues: {
      title: resumeData?.title || "",
      description: resumeData?.description || "",
    },
  });
  useEffect(() => {
    const debounceValidate = debounce(async () => {
      await form.trigger();
    }, 500);

    const subscription = form.watch((values) => {
      setResumeData({ ...resumeData, ...values });
      debounceValidate();
    });

    return () => {
      subscription.unsubscribe?.();
      debounceValidate.cancel();
    };
  }, [form, resumeData, setResumeData]);

  const onSubmit = form.handleSubmit((data) => {
    console.log("the data", data);
  });
  return (
    <div>
      <header className="text-center">
        <h2 className="font-semibold text-xl">General Information</h2>
        <p className="text-muted-foreground text-sm">
          This will not appear in your resume{" "}
        </p>
      </header>
      <main>
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <InputField
                name="title"
                label="Project name"
                placeholder="Ex: School Resume"
              />
              <InputField
                name="description"
                label="Description"
                placeholder="Ex: For applying to school"
              />
            </form>
          </Form>
        </FormProvider>
      </main>
    </div>
  );
};
