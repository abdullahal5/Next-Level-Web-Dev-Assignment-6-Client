import { Textarea } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TTextarea = ({
  label,
  name,
  value,
  onChange,
  variant = "bordered",
  placeholder,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      label={label}
      {...register(name)}
      errorMessage={(errors[name]?.message as string) ?? ""}
      isInvalid={!!errors[name]}
      maxRows={6}
      placeholder={placeholder}
      value={value}
      variant={variant}
      onChange={onChange}
    />
  );
};

export default TTextarea;
