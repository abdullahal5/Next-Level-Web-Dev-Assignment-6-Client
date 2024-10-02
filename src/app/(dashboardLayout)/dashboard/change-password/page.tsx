"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import GHForm from "@/src/components/form/GHForm";
import GHInput from "@/src/components/form/GHInput";
import { useChangePasswordMutation } from "@/src/redux/features/auth/authApi";
import { logout } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hook";
import { changePasswordValidationSchema } from "@/src/schema/login.schema";
import { TResponse } from "@/src/types";

const ChangePassswordPage = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const res = (await changePassword(data)) as unknown as TResponse<any>;

    if (res.error) {
      toast.error(res.error.data.message, {
        duration: 2000,
      });
    } else {
      toast.success("Password reset successfully. Please login again", {
        duration: 2000,
      });
      dispatch(logout());
      router.push("/login");
    }
  };

  return (
    <div>
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Change Password</h3>
        <div className="lg:w-[35%] md:w-[35%] w-full">
          <GHForm
            resolver={zodResolver(changePasswordValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <GHInput
                label="Old password"
                name="oldPassword"
                type="password"
              />
            </div>
            <div className="py-3">
              <GHInput
                label="New Password"
                name="newPassword"
                type="password"
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              isLoading={isLoading}
              size="lg"
              type="submit"
            >
              Change Password
            </Button>
          </GHForm>
        </div>
      </div>
    </div>
  );
};

export default ChangePassswordPage;
