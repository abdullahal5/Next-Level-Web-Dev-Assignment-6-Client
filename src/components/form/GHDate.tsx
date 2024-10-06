import { DatePicker } from "@nextui-org/date-picker";
import { Controller } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

const GHDate = ({ label, name, defaultValue }: IProps) => {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      render={({ field: { value, ...fileds } }) => (
        <DatePicker
          className="min-w-full sm:min-w-[225px]"
          isRequired={true}
          label={label}
          {...fileds}
        />
      )}
    />
  );
};

export default GHDate;
