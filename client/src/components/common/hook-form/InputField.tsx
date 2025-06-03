import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export const InputField: FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  className,
  type = "text",
}) => {
  const { control } = useFormContext();

  return (
    <div className={twMerge("my-4", className)}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder || ""}
                {...field}
                accept={type === "file" ? "image/*" : ""}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
