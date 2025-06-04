import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
}

export const TextAreaField: FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  className,
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
              <Textarea
                placeholder={placeholder || ""}
                {...field}
                className="h-[150px]"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
