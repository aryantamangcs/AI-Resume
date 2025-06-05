import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormDescription,
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
  description?: string;
}

export const InputField: FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  className,
  description,
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
              {type === "file" ? (
                <Input
                  type="file"
                  accept="image/*"
                  placeholder={placeholder || ""}
                  name={field.name}
                  ref={field.ref}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              ) : (
                <Input type={type} placeholder={placeholder || ""} {...field} />
              )}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        )}
      />
    </div>
  );
};
