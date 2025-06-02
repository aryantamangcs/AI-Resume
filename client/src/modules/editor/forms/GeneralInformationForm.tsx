"use client";
import { useForm } from "react-hook-form";
import { generalInformationSchema, GeneralInformationValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export const GeneralInformationForm = () => {
  const form = useForm<GeneralInformationValues>({
    resolver: zodResolver(generalInformationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
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
        <Form {...form}>
          <form onSubmit={() => alert("suubmit")}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: My school resume" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </main>
    </div>
  );
};
