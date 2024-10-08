"use client"; // Ensure this component is treated as a client component

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { IoAddCircleOutline } from "react-icons/io5";
import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";

import GlobalModal from "@/src/components/UI/GlobalModal";
import GHInput from "@/src/components/form/GHInput";
import GHForm from "@/src/components/form/GHForm";
// eslint-disable-next-line import/order
import GHSelect from "@/src/components/form/GHSelect";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";
import uploadImageToCloudinary from "@/src/utils/uploadImageToCloudinary";
import GHTagInput from "@/src/components/form/GHTagInput";
import { useAppSelector } from "@/src/redux/hook";
import {
  useCreatePostMutation,
  useGetMyPostQuery,
} from "@/src/redux/features/post/postApi";
import TTextarea from "@/src/components/form/GHTextArea";
import { IMyPost } from "@/src/types";

const categoryOptions = [
  { key: "flowers", label: "Flowers" },
  { key: "vegetables", label: "Vegetables" },
  { key: "herbs", label: "Herbs" },
  { key: "shrubs", label: "Shrubs" },
  { key: "trees", label: "Trees" },
  { key: "succulents", label: "Succulents & Cacti" },
  { key: "indoor-plants", label: "Indoor Plants" },
  { key: "garden-tools", label: "Garden Tools" },
  { key: "fertilizers", label: "Fertilizers" },
  { key: "pots-planters", label: "Pots & Planters" },
  { key: "seeds", label: "Seeds" },
  { key: "watering-systems", label: "Watering Systems" },
];

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: function () {
        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input?.files?.[0];

          if (file) {
            if (file.size > 10485760) {
              return toast.warning(
                "File size exceeds 10 MB limit. Please select a smaller file."
              );
            }
            const url = await uploadImageToCloudinary(file);

            if (url) {
              const quill = (this as any).quill;
              const range = quill.getSelection();

              if (range) {
                quill.insertEmbed(range.index, "image", url);
              }
            } else {
              toast.error("Failed to upload image to Cloudinary");
            }
          }
        };
      },
    },
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const MyContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [createPost] = useCreatePostMutation();
  const { data: getMyPost, isLoading: getMyPostLoading } =
    useGetMyPostQuery(undefined);

  const myPost = getMyPost as IMyPost;

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 10485760) {
        return toast.warning(
          "File size exceeds 10 MB limit. Please select a smaller file."
        );
      }
      const url = await uploadImageToCloudinary(file);

      if (url) {
        setThumbnail(url);
      } else {
        toast.error("Failed to upload thumbnail");
      }
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const postData = {
      ...data,
      author: user?.userId,
      isPremium: isPremium,
      content: value,
      thumbnail,
    };

    const res = await createPost(postData);

    if (res?.data?.statusCode === 200) {
      toast.success("Post created successfull");
      onClose();
    }
  };

  return (
    <>
      <Button variant="solid" onPress={onOpen}>
        <IoAddCircleOutline fontSize={"1.5rem"} />
        Add New Content
      </Button>

      <div className="h-[95%] w-full">
        <GlobalModal
          action="Create Post"
          isOpen={isOpen}
          size="xl"
          title="New Content"
          onClose={onClose}
        >
          <GHForm onSubmit={onSubmit}>
            <GHInput label="Title" name="title" type="text" />
            <div className="py-3">
              <TTextarea label="Bio" name="bio" type="text" />
            </div>
            <div className="flex items-center gap-2.5 py-3">
              <div className="flex-1">
                <GHTagInput label="Tags" name="tags" type="text" />
              </div>
              <div className="flex-1">
                <GHSelect
                  label="Category"
                  name="category"
                  options={categoryOptions}
                  radius="sm"
                  size="lg"
                  type="text"
                />
              </div>
            </div>
            <Checkbox
              radius="full"
              value="ok"
              onChange={() => setIsPremium(!isPremium)}
            >
              Available for premium user only
            </Checkbox>

            <div className="py-3">
              <GHInput
                label="Thumbnail Image"
                name="thumbnail"
                type="file"
                onChange={handleThumbnailUpload}
              />
              {thumbnail && (
                <Image
                  alt="Thumbnail preview"
                  className="mt-3 w-32 mx-auto rounded-md object-cover"
                  height={100}
                  src={thumbnail}
                  width={200}
                />
              )}
            </div>

            <ReactQuill
              className="mt-3"
              formats={formats}
              modules={modules}
              theme="snow"
              value={value}
              onChange={setValue}
            />
            <Button
              className="my-3 w-full rounded-md font-semibold"
              color="primary"
              size="lg"
              type="submit"
              variant="solid"
            >
              Create
            </Button>
          </GHForm>
        </GlobalModal>
      </div>
      <div></div>
    </>
  );
};

export default MyContent;
