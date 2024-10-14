"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { FaCloudUploadAlt, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

import GHForm from "@/src/components/form/GHForm";
import GHInput from "@/src/components/form/GHInput";
import GHSelect from "@/src/components/form/GHSelect";
import registerValidationSchema from "@/src/schema/register.schema";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import GlobalLoading from "@/src/components/UI/GlobalLoading";
import { TResponse } from "@/src/types";
import { verifyToken } from "@/src/utils/jwt";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hook";
import uploadImageToCloudinary from "@/src/utils/uploadImageToCloudinary";

const genderOptions = [
  { key: "Male", label: "Male" },
  { key: "Female", label: "Female" },
  { key: "Other", label: "Other" },
];

const RegisterPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [createUser, { isLoading }] = useRegisterMutation(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    let registerData;

    if (imageFile) {
      const imageUrl = await uploadImageToCloudinary(imageFile);

      registerData = {
        ...data,
        profilePicture: imageUrl,
      };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      registerData = data;
    }

    const res = (await createUser(registerData)) as unknown as TResponse<any>;

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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const file = files[0];

    setImageFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
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
          <Card className="bg-background/80 backdrop-blur-lg shadow-2xl border border-green-500/10">
            <CardHeader className="flex flex-col items-center pb-0 pt-6">
              <motion.div
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <FaLeaf className="text-green-500 text-5xl mb-4" />
              </motion.div>
              <h3 className="text-3xl font-bold text-foreground mb-2">
                Join Gardening HUB
              </h3>
              <p className="text-foreground-500 text-sm mb-4">
                Let&apos;s start your gardening journey!
              </p>
            </CardHeader>
            <CardBody className="px-6 py-8">
              <GHForm
                resolver={zodResolver(registerValidationSchema)}
                onSubmit={onSubmit}
              >
                <div className="space-y-4">
                  <GHInput
                    label="Username"
                    name="username"
                    // startContent={<FaUser className="text-green-500" />}
                  />
                  <GHInput
                    label="Email"
                    name="email"
                    type="email"
                    // startContent={<FaEnvelope className="text-green-500" />}
                  />
                  <GHInput
                    label="Password"
                    name="password"
                    type="password"
                    // startContent={<FaLock className="text-green-500" />}
                  />
                  <GHSelect
                    label="Gender"
                    name="gender"
                    options={genderOptions}
                    radius="sm"
                    size="lg"
                    // startContent={<FaVenusMars className="text-green-500" />}
                  />
                  <div className="relative">
                    <input
                      className="hidden"
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <label
                      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-green-500 text-green-500 transition-all duration-300 hover:bg-green-500 hover:text-white"
                      htmlFor="image"
                    >
                      <FaCloudUploadAlt className="mr-2" />
                      Upload Profile Picture
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="flex justify-center">
                      <div className="relative w-24 h-24 rounded-full border-2 border-green-500 p-1 group">
                        <img
                          alt="Profile Preview"
                          className="w-full h-full object-cover rounded-full"
                          src={imagePreview}
                        />
                        <button
                          aria-label="Remove Image"
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          type="button"
                          onClick={handleImageRemove}
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  )}
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold"
                    size="lg"
                    type="submit"
                  >
                    Register
                  </Button>
                </div>
              </GHForm>
              <div className="text-center mt-6 text-sm">
                Already have an account?{" "}
                <Link
                  className="text-green-500 font-semibold hover:underline"
                  href="/login"
                >
                  Login
                </Link>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;
