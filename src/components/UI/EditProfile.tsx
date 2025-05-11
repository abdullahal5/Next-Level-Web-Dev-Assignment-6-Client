/* eslint-disable padding-line-between-statements */
"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";

import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/auth/authApi";
import { editUserData, IAuthor } from "@/src/types";
import GHInput from "@/src/components/form/GHInput";
import GHSelect from "@/src/components/form/GHSelect";
import GHForm from "@/src/components/form/GHForm";
import uploadImageToCloudinary from "@/src/utils/uploadImageToCloudinary";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { verifyToken } from "@/src/utils/jwt";

const gardeningInterests: { key: string; label: string }[] = [
  { label: "Organic Gardening", key: "Organic Gardening" },
  { label: "Hydroponics", key: "Hydroponics" },
  { label: "Vegetable Gardening", key: "Vegetable Gardening" },
  { label: "Flower Gardening", key: "Flower Gardening" },
  { label: "Permaculture", key: "Permaculture" },
  { label: "Urban Gardening", key: "Urban Gardening" },
  { label: "Indoor Gardening", key: "Indoor Gardening" },
];

export default function EditProfile() {
  const { user } = useAppSelector((state) => state.auth);
  const { data: getMe, isLoading } = useGetMeQuery({ _id: user?.userId });
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getMeData = getMe?.data as IAuthor;

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    getMeData?.profilePicture,
  );

  const onSubmit = async (data: FieldValues) => {
    const userData: editUserData = {
      _id: user?.userId,
      username: data?.username,
      bio: data?.bio,
      gardeningExperienceLevel: data?.gardeningExperienceLevel,
      location: data?.location,
      phone: data?.phone,
      interest: data?.interests,
      gender: data?.gender,
    };

    if (profileImage) {
      const imageUrl = await uploadImageToCloudinary(profileImage);
      if (imageUrl) {
        userData.profilePicture = imageUrl;
      }
    }

    try {
      const res = await updateUser(userData).unwrap();
      if (res.success) {
        toast.success("User updated successfully");
        const decoded = await verifyToken(res.data);
        dispatch(
          setUser({
            token: res.data,
            user: decoded,
          }),
        );

        router.push("/dashboard/profile");
      }
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const defaultValues = {
    username: getMeData?.username || "",
    profilePicture: getMeData?.profilePicture,
    bio: getMeData?.bio || "",
    gardeningExperienceLevel: getMeData?.gardeningExperienceLevel || "",
    location: getMeData?.location || "",
    phone: getMeData?.phone || "",
    gender: getMeData?.gender || "",
    interests: getMeData?.interests || "",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <Card>
            <h1 className="text-5xl font-extrabold text-center text-gray-800 dark:text-gray-200 pt-6">
              Edit Profile
            </h1>
            <CardBody className="p-8">
              <GHForm defaultValues={defaultValues} onSubmit={onSubmit}>
                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Avatar and Basic Info Section */}
                  <div className="lg:w-1/3 flex flex-col items-center text-center space-y-6">
                    {getMeData && (
                      <Avatar
                        alt={getMeData?.username}
                        className="w-36 h-36 rounded-full mb-4 shadow-lg"
                        src={previewImage}
                      />
                    )}
                    <input
                      accept="image/*"
                      className="block w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-medium file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <GHInput label="Username" name="username" type="text" />
                    <GHInput label="Bio" name="bio" type="text" />
                    <GHSelect
                      label="Gardening Experience"
                      name="gardeningExperienceLevel"
                      options={[
                        { label: "Beginner", key: "Beginner" },
                        { label: "Intermediate", key: "Intermediate" },
                        { label: "Expert", key: "Expert" },
                      ]}
                      radius={"sm"}
                    />
                  </div>

                  {/* Divider */}
                  <Divider className="hidden lg:block" orientation="vertical" />

                  {/* About Me Section */}
                  <div className="lg:w-2/3 space-y-8">
                    <h3 className="text-2xl font-semibold">About Me</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <GHInput label="Location" name="location" type="text" />
                      <GHInput label="Phone" name="phone" type="text" />
                      <Input
                        disabled
                        aria-label="Date of Birth"
                        className="cursor-not-allowed"
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={getMeData?.dateOfBirth?.split("T")[0]}
                      />
                      <GHSelect
                        label="Gender"
                        name="gender"
                        options={[
                          { label: "Male", key: "Male" },
                          { label: "Female", key: "Female" },
                          { label: "Other", key: "Other" },
                        ]}
                        radius={"sm"}
                      />
                    </div>
                    <Divider className="my-6" />
                    <h3 className="text-2xl font-semibold">
                      Gardening Interests
                    </h3>
                    <GHSelect
                      label="Gardening Interest"
                      name="interests"
                      options={gardeningInterests}
                      radius={"sm"}
                      size="lg"
                    />
                    <Button
                      className="w-full mt-4"
                      color="success"
                      isLoading={updateLoading}
                      type="submit"
                      variant="solid"
                    >
                      Save Profile
                    </Button>
                  </div>
                </div>
              </GHForm>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
