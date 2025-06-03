"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  personalInformationSchema,
  PersonalInformationValues,
} from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/hook-form/InputField";
export const PersonalInformationForm = () => {
  const form = useForm<PersonalInformationValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      photo: undefined,
      first_name: "",
      last_name: "",
      job_title: "",
      city: "",
      country: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log("the data", data);
  });
  return (
    <div>
      <header className="text-center">
        <h2 className="font-semibold text-xl">Personal Information</h2>
        <p className="text-muted-foreground text-sm">
          Fill your personal informations
        </p>
      </header>
      <main>
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <InputField name="photo" label="Your photo" type="file" />
              <div className="flex gap-4">
                <InputField
                  name="first_name"
                  label="First name"
                  className="w-1/2"
                />
                <InputField
                  name="last_name"
                  label="Last name"
                  className="w-1/2"
                />
              </div>
              <InputField name="job_title" label="Job Title" />
              <div className="flex gap-4">
                <InputField name="city" label="City" className="w-1/2" />
                <InputField name="country" label="Country" className="w-1/2" />
              </div>
              <InputField name="email" label="Email" type="email" />
              <InputField name="phone" label="Phone" type="number" />
            </form>
          </Form>
        </FormProvider>
      </main>
    </div>
  );
};
