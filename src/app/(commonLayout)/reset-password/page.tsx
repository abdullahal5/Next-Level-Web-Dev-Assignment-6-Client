"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import GHForm from "@/src/components/form/GHForm";
import GHInput from "@/src/components/form/GHInput";
import GlobalLoading from "@/src/components/UI/GlobalLoading";
import { useResetPasswordMutation } from "@/src/redux/features/auth/authApi";
import { resetPasswordValidationSchema } from "@/src/schema/login.schema";
import { TResponse } from "@/src/types";

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const resetPasswordData = {
      ...data,
      token,
    };

    const res = (await resetPassword(
      resetPasswordData,
    )) as unknown as TResponse<any>;

    if (res.error) {
      toast.error(res.error.data.message, {
        duration: 2000,
      });
    } else {
      toast.success("Password reset successfully please login again", {
        duration: 2000,
      });

      if (res.data.success) {
        router.push("/login");
      }
    }
  };

  return (
    <>
      {isLoading && <GlobalLoading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Reset Password!!!</h3>
        <p className="mb-4">Reset your password</p>
        <div className="w-[35%]">
          <GHForm
            resolver={zodResolver(resetPasswordValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <GHInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <GHInput
                label="New password"
                name="newPassword"
                type="password"
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Reset Password
            </Button>
          </GHForm>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
