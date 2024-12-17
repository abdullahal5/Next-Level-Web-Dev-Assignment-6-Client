"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Divider } from "@nextui-org/divider";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { FaArrowLeft, FaLeaf, FaUserShield } from "react-icons/fa";
import Image from "next/image";

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
import { getToken } from "@/src/utils/setCookie";

const gardeningImages = [
  "https://img.freepik.com/free-photo/close-up-man-watering-plants-with-sprinkler_23-2148396764.jpg?t=st=1728461555~exp=1728465155~hmac=603dda8ad3eba3c433bf3513727772fcce215d1d0eee1a8d533c9149c8758dcc&w=900",
  "https://img.freepik.com/free-photo/plants-pot-with-watering-can_23-2148905231.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/premium-photo/interpreter-standing-with-gardening-trowel-pla-0_975681-159610.jpg?w=826",
  "https://img.freepik.com/free-photo/senior-couple-caring-flowers_23-2148256693.jpg?t=st=1728461630~exp=1728465230~hmac=9bdcc2b0dce03aafd050e82334a4a77005f4c250c5c2387715880a78b2ed9dd8&w=826",
  "https://img.freepik.com/free-photo/young-male-gardener-holding-crate-with-vivid-potted-plants-garden_23-2147844282.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
];
const EnhancedLoginPage = () => {
  const [loginUser, { isLoading }] = useLoginMutation(undefined);
  const [isForgetPasswordForm, setIsForgetPasswordForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [forgetPassword] = useForgetPasswordMutation(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === gardeningImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

      await getToken(token);

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
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              animate={{ opacity: 1 }}
              className="w-full h-full"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Image
                alt="Gardening background"
                className="filter blur-sm"
                layout="fill"
                objectFit="cover"
                src={gardeningImages[currentImageIndex]}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 bg-black dark:bg-black opacity-50 z-10" />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md z-20"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-background/90 backdrop-blur-lg shadow-2xl border border-foreground/10 my-20">
            <CardHeader className="flex flex-col items-center pb-0 pt-8">
              <motion.div
                animate={{ scale: 1, rotate: 360 }}
                initial={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <FaLeaf className="text-green-500 dark:text-green-400 text-6xl mb-4" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {isForgetPasswordForm ? "Reset Password" : "Welcome Back!"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
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
                          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-300"
                          size="lg"
                          type="submit"
                        >
                          Send OTP
                        </Button>
                        <Button
                          className="w-full mt-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
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
                            className="text-xs text-green-500 dark:text-green-400 p-0 hover:underline font-semibold"
                            variant="light"
                            onPress={() => setIsForgetPasswordForm(true)}
                          >
                            Forgot Password?
                          </Button>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-300"
                          size="lg"
                          type="submit"
                        >
                          Login
                        </Button>
                      </div>
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-green-200 dark:border-green-700"
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                          Demo Credentials
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 bg-green-100 dark:bg-green-900/30 p-3 rounded-md">
                            <FaLeaf className="text-green-500 dark:text-green-400" />
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white">
                                User
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Email: abdullahalfahin183@gmail.com
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Password: 12345
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-md">
                            <FaUserShield className="text-purple-500 dark:text-purple-400" />
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white">
                                Admin
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Email: fahim185@gmail.com
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Password: 12345
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      <Divider className="my-6" />
                      <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                        Don&apos;t have an account?{" "}
                        <Link
                          className="text-green-500 dark:text-green-400 font-semibold hover:underline"
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

export default EnhancedLoginPage;
