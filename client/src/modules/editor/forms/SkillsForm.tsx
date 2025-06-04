"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  generalInformationSchema,
  GeneralInformationValues,
  skillsSchema,
  SkillsValues,
} from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { InputField } from "@/components/common/hook-form/InputField";
import { FC, useEffect } from "react";
import { EditorFormProps } from "@/interfaces";
import { debounce } from "lodash";
import { TextAreaField } from "@/components/common/hook-form/TextAreaField";
import { Textarea } from "@/components/ui/textarea";
export const SkillsForm: FC<EditorFormProps> = ({
  resumeData,
  setResumeData,
}) => {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData?.skills || [],
    },
  });
  useEffect(() => {
    const debounceValidate = debounce(async () => {
      await form.trigger();
    }, 500);

    const subscription = form.watch((values) => {
      setResumeData({
        ...resumeData,
        skills:
          values?.skills
            ?.filter((exp) => exp !== undefined)
            ?.map((skill) => skill.trim())
            ?.filter((skill) => skill !== "") || [],
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
        <h2 className="font-semibold text-xl">Skills</h2>
      </header>
      <main>
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-[150px]"
                        onChange={(e) => {
                          const skills = e.target.value.split(",");
                          field.onChange(skills);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Use comma to seperate the skills.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </FormProvider>
      </main>
    </div>
  );
};
