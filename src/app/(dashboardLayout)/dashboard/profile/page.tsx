"use client";

import {
  FaMapMarkerAlt,
  FaPhone,
  FaBirthdayCake,
  FaVenusMars,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Progress } from "@nextui-org/progress";
import Link from "next/link";
import { Spinner } from "@nextui-org/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useAppSelector } from "@/src/redux/hook";
import { useGetMeQuery } from "@/src/redux/features/auth/authApi";
import { IAuthor, IMyPost } from "@/src/types";
import { formatDate } from "@/src/utils/dateFormat";
import { useGetMyPostQuery } from "@/src/redux/features/post/postApi";

export default function Component() {
  const { user } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const queryId = searchParams.get("userId");

  const router = useRouter();

  const { data: getMe, isFetching } = useGetMeQuery({
    _id: queryId ? queryId : user?.userId,
  });

  const getMeData = getMe?.data as IAuthor;

  const { data: getMyPost } = useGetMyPostQuery(undefined);

  const myPost = (getMyPost?.data as IMyPost[]) || [];

  const fields = [
    getMeData?.username,
    getMeData?.profilePicture,
    getMeData?.location,
    getMeData?.phone,
    getMeData?.dateOfBirth,
    getMeData?.gender,
    getMeData?.gardeningExperienceLevel,
    getMeData?.bio,
    getMeData?.interests,
    getMeData?.socialMediaLinks?.facebook,
    getMeData?.socialMediaLinks?.twitter,
    getMeData?.socialMediaLinks?.instagram,
    getMeData?.socialMediaLinks?.linkedin,
  ];

  const filledFields = fields.filter((field) => {
    return !!field && (!Array.isArray(field) || field.length > 0);
  }).length;
  const profileCompletion = Math.round((filledFields / fields.length) * 100);

  const handleVerify = () => {
    const allUpvoteCountsGreaterThanFive = myPost?.every(
      (post) => (post?.upvotes || 0) >= 5,
    );

    if (getMyPost && allUpvoteCountsGreaterThanFive === false) {
      toast.error("You need atleast 5 likes in your post");
    } else {
      router.push("/subscription");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {isFetching ? (
        <Spinner size="lg" />
      ) : (
        <>
          <h1
            className={`text-4xl font-bold text-center dark:text-gray-200 text-gray-800 pb-5`}
          >
            Profile
          </h1>
          <Progress
            className="pb-5"
            color="success"
            label={`Profile Completion (${profileCompletion}%)`}
            size="md"
            value={profileCompletion}
          />
          <Card className="shadow-lg">
            <CardBody className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative flex flex-col items-center">
                      <Avatar
                        alt={getMeData?.username}
                        className={`w-32 h-32 text-large mb-4 ${getMeData?.isVerified ? "border-4 border-blue-500" : ""}`}
                        src={getMeData?.profilePicture}
                      />
                      {getMeData?.isVerified && (
                        <div className="absolute bottom-1 border border-blue-600 right-0 mb-1 ml-1 p-1 rounded-full">
                          <FaCheckCircle className="w-5 h-5 text-blue-500" />
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      {getMeData?.username}
                    </h2>
                    {getMeData?.gardeningExperienceLevel && (
                      <p className="border px-3 py-1 my-2 rounded-md text-xs border-gray-600">
                        {getMeData?.gardeningExperienceLevel}
                      </p>
                    )}
                    {getMeData?.bio && (
                      <p className="text-default-500 mb-4 text-sm">
                        {getMeData?.bio}
                      </p>
                    )}

                    <div className="flex justify-center gap-4 mb-4">
                      <div>
                        <span className="font-semibold text-success">
                          {getMeData?.followers.length}
                        </span>
                        <p className="text-small text-default-500">Followers</p>
                      </div>
                      <Divider orientation="vertical" />
                      <div>
                        <span className="font-semibold text-success">
                          {getMeData?.following.length}
                        </span>
                        <p className="text-small text-default-500">Following</p>
                      </div>
                      <Divider orientation="vertical" />
                      <div>
                        <span className="font-semibold text-success">
                          {myPost?.length || "0"}
                        </span>
                        <p className="text-small text-default-500">Posts</p>
                      </div>
                    </div>
                    {getMeData?._id === user?.userId && (
                      <>
                        <Link className="w-full" href="/dashboard/edit-profile">
                          <div className="w-full">
                            <Button
                              className="w-full text-white"
                              color="success"
                              variant="solid"
                            >
                              Edit Profile
                            </Button>
                          </div>
                        </Link>
                        {getMeData?.isVerified === false ? (
                          <div className="w-full mt-4">
                            <Button
                              className="w-full"
                              color="secondary"
                              variant="solid"
                              onClick={handleVerify}
                            >
                              Verify
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                </div>

                <Divider className="hidden lg:block" orientation="vertical" />

                <div className="lg:w-2/3">
                  <h3 className="text-xl font-semibold mb-4">About Me</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-success" />
                      <span>{getMeData?.location || "Not provided"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-success" />
                      <span>{getMeData?.phone || "Not provided"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBirthdayCake className="text-success" />
                      <span>
                        {formatDate(getMeData?.dateOfBirth) || "Not provided"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaVenusMars className="text-success" />
                      <span>{getMeData?.gender || "Not provided"}</span>
                    </div>
                  </div>

                  <Divider className="my-6" />

                  <h3 className="text-xl font-semibold mb-4">
                    Gardening Interests
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {!getMeData?.interests
                      ? "Not Provided"
                      : getMeData?.interests}
                  </div>

                  <Divider className="my-6" />

                  <h3 className="text-xl font-semibold mb-4">Social Media</h3>
                  <div className="flex gap-4">
                    {getMeData?.socialMediaLinks?.facebook ||
                    getMeData?.socialMediaLinks?.twitter ||
                    getMeData?.socialMediaLinks?.instagram ||
                    getMeData?.socialMediaLinks?.linkedin ? (
                      <>
                        {getMeData?.socialMediaLinks?.facebook && (
                          <a
                            aria-label="Facebook"
                            href={getMeData?.socialMediaLinks?.facebook}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <FaFacebook className="text-3xl text-success hover:text-success-400" />
                          </a>
                        )}
                        {getMeData?.socialMediaLinks?.twitter && (
                          <a
                            aria-label="Twitter"
                            href={getMeData?.socialMediaLinks?.twitter}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <FaTwitter className="text-3xl text-success hover:text-success-400" />
                          </a>
                        )}
                        {getMeData?.socialMediaLinks?.instagram && (
                          <a
                            aria-label="Instagram"
                            href={getMeData?.socialMediaLinks?.instagram}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <FaInstagram className="text-3xl text-success hover:text-success-400" />
                          </a>
                        )}
                        {getMeData?.socialMediaLinks?.linkedin && (
                          <a
                            aria-label="LinkedIn"
                            href={getMeData?.socialMediaLinks?.linkedin}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <FaLinkedin className="text-3xl text-success hover:text-success-400" />
                          </a>
                        )}
                      </>
                    ) : (
                      <p className="text-default-500">
                        No social media links provided
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
