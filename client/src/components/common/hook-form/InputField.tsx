import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

export const InputField: FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
}) => {
  const { control } = useFormContext();

  return (
    <div className="my-4">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder || ""} {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
