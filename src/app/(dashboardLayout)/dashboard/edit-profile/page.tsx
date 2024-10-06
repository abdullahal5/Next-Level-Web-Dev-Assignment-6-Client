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

import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/auth/authApi";
import { editUserData, IAuthor } from "@/src/types";
import GHInput from "@/src/components/form/GHInput";
import GHSelect from "@/src/components/form/GHSelect";
import GHForm from "@/src/components/form/GHForm";
import GHDate from "@/src/components/form/GHDate";
import uploadImageToCloudinary from "@/src/utils/uploadImageToCloudinary";
import { dateToISO } from "@/src/utils/dateToISO";
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
      username: data.username,
      bio: data.bio,
      gardeningExperienceLevel: data.gardeningExperienceLevel,
      location: data.location,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth ? dateToISO(data.dateOfBirth) : undefined,
      interest: data.interests,
      gender: data.gender,
      facebook: data.facebook,
      twitter: data.twitter,
      instagram: data.instagram,
      linkedin: data.linkedin,
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
    dateOfBirth: getMeData?.dateOfBirth || "",
    gender: getMeData?.gender || "",
    interests: getMeData?.interests || "",
    facebook: getMeData?.socialMediaLinks?.facebook || "",
    twitter: getMeData?.socialMediaLinks?.twitter || "",
    instagram: getMeData?.socialMediaLinks?.instagram || "",
    linkedin: getMeData?.socialMediaLinks?.linkedin || "",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <Card className="shadow-lg">
            <CardBody className="p-6">
              <GHForm defaultValues={defaultValues} onSubmit={onSubmit}>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="flex flex-col items-center text-center space-y-5">
                      {getMeData && (
                        <Avatar
                          alt={getMeData?.username}
                          className="w-32 h-32 text-large mb-4"
                          name="profilePicture"
                          src={previewImage}
                        />
                      )}
                      <input
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
                        size="sm"
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

                  <Divider className="hidden lg:block" orientation="vertical" />

                  <div className="lg:w-2/3">
                    <h3 className="text-xl font-semibold mb-4">About Me</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <GHInput label="Location" name="location" type="text" />
                      <GHInput label="Phone" name="phone" type="text" />
                      <GHDate
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
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
                        size="sm"
                      />
                    </div>

                    <Divider className="my-6" />

                    <h3 className="text-xl font-semibold mb-4">
                      Gardening Interests
                    </h3>
                    <GHSelect
                      label="Gardening Interest"
                      name="interests"
                      options={gardeningInterests}
                      radius={"sm"}
                      size="lg"
                      type="text"
                    />

                    <Divider className="my-6" />

                    <h3 className="text-xl font-semibold mb-4">Social Media</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <GHInput label="Facebook" name="facebook" type="text" />
                      <GHInput
                        defaultValue={getMeData?.socialMediaLinks?.twitter}
                        label="Twitter"
                        name="twitter"
                        type="text"
                      />
                      <GHInput label="Instagram" name="instagram" type="text" />
                      <GHInput label="Linkedin" name="linkedin" type="text" />
                    </div>
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
