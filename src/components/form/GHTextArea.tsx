import { Textarea } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TTextarea = ({
  label,
  name,
  value,
  onChange,
  variant = "bordered",
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
      value={value}
      variant={variant}
      onChange={onChange}
    />
  );
};

export default TTextarea;
