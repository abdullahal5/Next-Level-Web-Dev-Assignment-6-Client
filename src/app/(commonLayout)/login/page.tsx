"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import loginValidationSchema, {
  forgetPasswordValidationSchema,
} from "@/src/schema/login.schema";
import GHInput from "@/src/components/form/GHInput";
import GHForm from "@/src/components/form/GHForm";
import {
  useForgetPasswordMutation,
  useLoginMutation,
} from "@/src/redux/features/auth/authApi";
import { TResponse } from "@/src/types";
import { verifyToken } from "@/src/utils/jwt";
import { useAppDispatch } from "@/src/redux/hook";
import { setUser } from "@/src/redux/features/auth/authSlice";
import GlobalLoading from "@/src/components/UI/GlobalLoading";

const LoginPage = () => {
  const [loginUser, { isLoading }] = useLoginMutation(undefined);
  const [isForgetPasswordForm, setIsForgetPasswordForm] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [forgetPassword] = useForgetPasswordMutation(undefined);

  const onSubmit = async (data: FieldValues) => {
    const res = (await loginUser(data)) as unknown as TResponse<any>;

    if (res.error) {
      toast.error(res.error.data.message, {
        duration: 2000,
      });
    } else {
      toast.success(res.data.message, {
        duration: 2000,
      });

      const token = res.data?.data?.accessToken;
      const decoded = await verifyToken(token);

      dispatch(
        setUser({
          token: res.data?.data?.accessToken,
          user: decoded,
        }),
      );

      router.push("/");
    }
  };

  const onSubmitForgetPassword = async (data: FieldValues) => {
    const res = await forgetPassword(data);

    if (res.data) {
      toast.success(res.data.message);
    }
  };

  return (
    <>
      {isLoading && <GlobalLoading />}
      {isForgetPasswordForm ? (
        <div className="flex h-[calc(100vh-300px)] w-full flex-col items-center justify-center">
          <div className="w-[35%] mx-auto">
            <h3 className="my-2 text-2xl font-bold">Forget Password</h3>
            <p className="mb-4">forgot password? Reset it.</p>
            <GHForm
              resolver={zodResolver(forgetPasswordValidationSchema)}
              onSubmit={onSubmitForgetPassword}
            >
              <GHInput label="Email" name="email" type="email" />
              <button
                className="text-xs inline-block pb-6 hover:underline cursor-pointer text-blue-600 font-semibold"
                type="button"
                onClick={() => setIsForgetPasswordForm(false)}
              >
                Login
              </button>
              <Button
                className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                size="lg"
                type="submit"
              >
                Send OTP
              </Button>
            </GHForm>
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
          <h3 className="my-2 text-2xl font-bold">
            Login with Gardening HUB!!!
          </h3>
          <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
          <div className="w-[35%]">
            <GHForm
              resolver={zodResolver(loginValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="py-3">
                <GHInput label="Email" name="email" type="email" />
              </div>
              <div className="py-3">
                <GHInput label="Password" name="password" type="password" />
              </div>
              <button
                className="text-xs inline-block pb-6 hover:underline cursor-pointer text-blue-600 font-semibold"
                type="button"
                onClick={() => setIsForgetPasswordForm(true)}
              >
                Forget Password?
              </button>

              <Button
                className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                size="lg"
                type="submit"
              >
                Login
              </Button>
            </GHForm>
            <div className="text-center">
              Don&lsquo;t have account ?{" "}
              <Link className="text-blue-500" href={"/register"}>
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
