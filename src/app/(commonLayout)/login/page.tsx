"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Divider } from "@nextui-org/divider";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { FaArrowLeft, FaLeaf } from "react-icons/fa";

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
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-green-100 to-green-200 dark:from-black dark:to-black p-4">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-background/80 backdrop-blur-lg shadow-2xl border border-foreground/10">
            <CardHeader className="flex flex-col items-center pb-0 pt-8">
              <motion.div
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <FaLeaf className="text-green-400 text-5xl mb-4" />
              </motion.div>
              <h3 className="text-3xl font-bold text-foreground mb-2">
                {isForgetPasswordForm ? "Reset Password" : "Welcome Back!"}
              </h3>
              <p className="text-foreground-500 text-sm">
                {isForgetPasswordForm
                  ? "Enter your email to reset your password"
                  : "Login to your Gardening HUB account"}
              </p>
            </CardHeader>
            <CardBody className="px-6 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isForgetPasswordForm ? "forget" : "login"}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  initial={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isForgetPasswordForm ? (
                    <GHForm
                      resolver={zodResolver(forgetPasswordValidationSchema)}
                      onSubmit={onSubmitForgetPassword}
                    >
                      <div className="space-y-4">
                        <GHInput
                          label="Email"
                          name="email"
                          type="email"
                          variant="bordered"
                        />
                        <Button
                          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-primary-foreground font-semibold"
                          size="lg"
                          type="submit"
                        >
                          Send OTP
                        </Button>
                        <Button
                          className="w-full mt-4 text-foreground"
                          startContent={<FaArrowLeft />}
                          variant="light"
                          onPress={() => setIsForgetPasswordForm(false)}
                        >
                          Back to Login
                        </Button>
                      </div>
                    </GHForm>
                  ) : (
                    <GHForm
                      resolver={zodResolver(loginValidationSchema)}
                      onSubmit={onSubmit}
                    >
                      <div className="space-y-4">
                        <GHInput
                          label="Email"
                          name="email"
                          type="email"
                          variant="bordered"
                        />
                        <div>
                          <GHInput
                            label="Password"
                            name="password"
                            type="password"
                            variant="bordered"
                          />
                          <Button
                            className="text-xs text-green-400 p-0 hover:none font-semibold"
                            variant="light"
                            onPress={() => setIsForgetPasswordForm(true)}
                          >
                            Forgot Password?
                          </Button>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-green-foreground font-semibold"
                          size="lg"
                          type="submit"
                        >
                          Login
                        </Button>
                      </div>
                      <Divider className="my-6" />
                      <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                          className="text-green-400 font-semibold hover:underline"
                          href="/register"
                        >
                          Register
                        </Link>
                      </div>
                    </GHForm>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
