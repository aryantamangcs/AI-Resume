"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  skillsSchema,
  SkillsValues,
  summarySchema,
  SummaryValue,
} from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { FC, useEffect } from "react";
import { EditorFormProps } from "@/interfaces";
import { debounce } from "lodash";
import { Textarea } from "@/components/ui/textarea";
import { TextAreaField } from "@/components/common/hook-form/TextAreaField";
export const SummaryForm: FC<EditorFormProps> = ({
  resumeData,
  setResumeData,
}) => {
  const form = useForm<SummaryValue>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData?.summary || "",
    },
  });
  useEffect(() => {
    const debounceValidate = debounce(async () => {
      await form.trigger();
    }, 500);

    const subscription = form.watch((values) => {
      setResumeData({
        ...resumeData,
        summary: values?.summary,
      });
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
        <h2 className="font-semibold text-xl">A Professional Summary</h2>
        <p className="text-muted-foreground text-sm">
          Write a short introduction for your resume or let AI generate one from
          your entered data
        </p>
      </header>
      <main>
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <TextAreaField
                name="summary"
                label="Professional Summary"
                placeholder="A brief engagin text about yourself"
              />
            </form>
          </Form>
        </FormProvider>
      </main>
    </div>
  );
};
