"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
        })
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
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <h3 className="my-2 text-xl font-bold">Register with Gardening HUB</h3>
        <p className="mb-4">Let&apos;s Gardening</p>
        <div className="w-[35%]">
          <GHForm
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <GHInput label="User Name" name="username" />
            </div>
            <div className="py-3">
              <GHInput label="Email" name="email" />
            </div>
            <div className="py-3">
              <GHInput label="Password" name="password" type="password" />
            </div>
            <div className="py-3">
              <GHSelect
                label="Gender"
                name="gender"
                options={genderOptions}
                radius="sm"
                size="lg"
              />
            </div>
            <div className="min-w-fit flex-1">
              <label
                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                htmlFor="image"
              >
                Upload image
              </label>
              <input
                className="hidden"
                id="image"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            {imagePreview && (
              <div className="flex gap-5 my-5 flex-wrap">
                <div className="relative size-20 rounded-full border-2 mx-auto border-dashed border-default-300 p-2 group">
                  <img
                    alt="item"
                    className="h-full w-full object-cover object-center rounded-full"
                    src={imagePreview}
                  />
                  <button
                    aria-label="Remove Image"
                    className="absolute -top-4 -right-2 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={handleImageRemove}
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
            <Button
              className="my-3 w-full rounded-md bg-default-900 text-default"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </GHForm>
          <div className="text-center">
            Already have an account?{" "}
            <Link className="text-blue-500" href={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
