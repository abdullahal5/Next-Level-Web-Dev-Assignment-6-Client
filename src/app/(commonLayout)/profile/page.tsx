"use client";

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import {
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPen,
  FaBirthdayCake,
  FaHeart,
} from "react-icons/fa";
import { LiaBrainSolid } from "react-icons/lia";
import { MdPhotoLibrary, MdEvent, MdArticle } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { CgGenderMale } from "react-icons/cg";
import { useDisclosure } from "@nextui-org/modal";

import { useAppSelector } from "@/src/redux/hook";
import { IAuthor, IMyPost, IPost } from "@/src/types";
import { useGetMeQuery } from "@/src/redux/features/auth/authApi";
import DashboardMyPostCard from "@/src/components/DashboardMyPostCard";
import { useGetMyPostQuery } from "@/src/redux/features/post/postApi";
import GlobalModal from "@/src/components/UI/GlobalModal";
import CreatePost from "@/src/components/UI/CreatePost";
import EditProfile from "@/src/components/UI/EditProfile";
import { useState } from "react";
import UpdateContent from "@/src/components/UpdateContent";

const ResponsiveSocialProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const queryId = searchParams.get("userId");

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isPostModalOpen,
    onOpen: onPostModalOpen,
    onClose: onPostModalClose,
  } = useDisclosure();

  const {
    isOpen: isPostEditModalOpen,
    onOpen: onPostEditModalOpen,
    onClose: onPostEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isPostDeleteModalOpen,
    onOpen: onPostDeleteModalOpen,
    onClose: onPostDeleteModalClose,
  } = useDisclosure();

  const { data: getMe, isFetching } = useGetMeQuery({
    _id: queryId ? queryId : user?.userId,
  });

  const getMeData = getMe?.data as IAuthor;

  const { data: getMyPost, isLoading: getMyPostLoading } =
    useGetMyPostQuery(undefined);

  const singlePost = getMyPost?.data?.find(
    (item: IMyPost) => item?._id === selectedPostId
  );

  return (
    <>
      <div className="max-w-5xl pt-10 mx-auto shadow-xl rounded-b-xl mt-10 px-4 sm:px-6 lg:px-8">
        <div className="relative h-[180px]">
          <Image
            alt="Cover"
            className="rounded-t-xl"
            layout="fill"
            objectFit="cover"
            src="https://img.freepik.com/free-photo/senior-couple-caring-flowers_23-2148256695.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid"
          />
          <button className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
            <FaCamera className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="relative pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative -mt-20 lg:pl-7 md:lg:pl-7 z-10">
                <Avatar
                  alt="Profile Picture"
                  className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white dark:border-gray-900 rounded-full"
                  src={getMeData?.profilePicture}
                />
                <button className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
                  <FaCamera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <div className="text-center sm:text-left pb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {getMeData?.username}
                </h1>
                <div className="text-sm text-blue-600 dark:text-blue-400 space-x-2">
                  <span>{getMeData?.followers?.length} Followers</span>
                  <span>|</span>
                  <span>{getMeData?.following?.length} Following</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 sm:mt-0">
              <Button
                className="font-semibold w-full sm:w-auto"
                color="primary"
                startContent={<FaPen className="w-4 h-4" />}
                onPress={onEditModalOpen}
              >
                Edit Profile
              </Button>
              <Button
                className="font-semibold w-full sm:w-auto"
                color="default"
                onPress={onPostModalOpen}
              >
                Create Post
              </Button>
              <GlobalModal
                action="Create Post"
                isOpen={isPostModalOpen}
                size="xl"
                title="New Content"
                onClose={onPostModalClose}
              >
                <CreatePost onClose={onPostModalClose} />
              </GlobalModal>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-5 pt-5">
            <div className="w-full lg:w-96 lg:sticky lg:top-[4rem]">
              <Card className="p-4 w-full lg:w-96 mb-5">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Intro
                </h2>
                <div className="space-y-3">
                  <p className="text-center">{getMeData?.bio}</p>

                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <FaEnvelope className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">
                      Email <strong>{getMeData?.email || "N/A"}</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <FaPhone className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">
                      Contact <strong>{getMeData?.phone || "N/A"}</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <FaMapMarkerAlt className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">
                      From <strong>{getMeData?.location || "N/A"}</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <CgGenderMale className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">
                      Gender <strong>{getMeData?.gender || "N/A"}</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <FaBirthdayCake className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">
                      Date of Birth{" "}
                      <strong>{getMeData?.dateOfBirth || "N/A"}</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <FaHeart className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">
                      Interest <strong>{getMeData?.interests || "N/A"}</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <LiaBrainSolid className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">
                      Experience{" "}
                      <strong>
                        {getMeData?.gardeningExperienceLevel || "N/A"}
                      </strong>
                    </span>
                  </div>
                  <Button
                    className="w-full mt-2"
                    color="default"
                    startContent={<FaPen className="w-4 h-4" />}
                    variant="bordered"
                    onPress={onEditModalOpen}
                  >
                    Edit Profile
                  </Button>
                </div>
              </Card>
              <Card className="p-3 w-full lg:w-96 flex flex-col gap-2">
                <h1 className="text-2xl">Photos</h1>
                <div className="flex flex-wrap gap-2">
                  {getMyPost?.data
                    ?.slice(0, 5)
                    ?.map((post: IPost) => (
                      <Image
                        key={post._id}
                        alt="post Images"
                        className="rounded-md"
                        height={110}
                        src={post.thumbnail}
                        width={110}
                      />
                    ))}
                </div>
              </Card>
            </div>
            <div className="flex-1 w-full">
              <Card className="w-full mb-5 p-4">
                <div className="flex space-x-2 mb-4">
                  <div className="w-10 h-10 flex-shrink-0">
                    <Avatar
                      alt="Profile Picture"
                      className="w-10 h-10 rounded-full object-cover"
                      src={getMeData?.profilePicture}
                    />
                  </div>
                  <input
                    placeholder="Post Here, What's on your Mind?"
                    type="text"
                    className="w-full bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    // onClick={onPostModalOpen}
                  />
                </div>
                <div className="flex flex-wrap justify-between items-center pt-2 border-t dark:border-gray-700">
                  <Button
                    className="flex-1 min-w-[33%]"
                    startContent={
                      <MdPhotoLibrary className="w-5 h-5 text-green-500" />
                    }
                    variant="light"
                    onPress={onPostModalOpen}
                  >
                    Media
                  </Button>
                  <Button
                    className="flex-1 min-w-[33%]"
                    startContent={
                      <MdEvent className="w-5 h-5 text-yellow-500" />
                    }
                    variant="light"
                    onPress={onPostModalOpen}
                  >
                    Event
                  </Button>
                  <Button
                    className="flex-1 min-w-[33%]"
                    startContent={
                      <MdArticle className="w-5 h-5 text-blue-500" />
                    }
                    variant="light"
                    onPress={onPostModalOpen}
                  >
                    Write article
                  </Button>
                </div>
              </Card>

              <div className="space-y-5">
                {getMyPost?.data?.length > 0 ? (
                  getMyPost?.data?.map((post: IMyPost) => (
                    <DashboardMyPostCard
                      key={post._id}
                      post={post}
                      onPostDeleteModalOpen={onPostDeleteModalOpen}
                      setSelectedPostId={setSelectedPostId}
                      onPostEditModalOpen={onPostEditModalOpen}
                    />
                  ))
                ) : (
                  <p className="text-center text-lg">
                    You didn&apos;t post anything yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlobalModal
        action="Create Post"
        isOpen={isEditModalOpen}
        size="4xl"
        onClose={onEditModalClose}
      >
        <EditProfile />
      </GlobalModal>

      <GlobalModal
        action="Create Post"
        isOpen={isPostEditModalOpen}
        size="xl"
        onClose={onPostEditModalClose}
      >
        <UpdateContent onClose={onPostEditModalClose} post={singlePost} />
      </GlobalModal>

      <GlobalModal
        action="Create Post"
        isOpen={isPostDeleteModalOpen}
        size="xl"
        onClose={onPostDeleteModalClose}
      >
        Delete {selectedPostId}
      </GlobalModal>
    </>
  );
};

export default ResponsiveSocialProfile;
