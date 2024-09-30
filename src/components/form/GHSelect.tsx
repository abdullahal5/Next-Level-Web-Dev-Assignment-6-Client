import { Select, SelectItem } from "@nextui-org/select";
import { Controller, useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

const GHSelect = ({
  options,
  label,
  name,
  variant = "bordered",
  disabled,
}: IProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Select
            {...field}
            className="min-w-full sm:min-w-[225px]"
            isDisabled={disabled}
            isInvalid={!!fieldState.error}
            label={label}
            variant={variant}
          >
            {options.map((option) => (
              <SelectItem
                key={option.key}
                className="min-w-full sm:min-w-[225px]"
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>
          {fieldState.error && (
            <p className="text-red-500 text-xs">{fieldState.error.message}</p>
          )}
        </>
      )}
    />
  );
};

export default GHSelect;
