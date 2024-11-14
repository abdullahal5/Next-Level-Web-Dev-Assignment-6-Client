import { DatePicker } from "@nextui-org/date-picker";
import { Controller } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {}

const GHDate = ({ label, name, defaultValue }: IProps) => {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { value, ...fileds } }) => (
        <DatePicker
          className="min-w-full sm:min-w-[225px]"
          label={label}
          variant="bordered"
          {...fileds}
        />
      )}
    />
  );
};

export default GHDate;
