"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function GHInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  defaultValue,
  onChange,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      defaultValue={defaultValue}
      errorMessage={(errors[name]?.message as string) ?? ""}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
      onChange={onChange}
    />
  );
}
