"use client";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import dynamic from "next/dynamic";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

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

import { toast } from "sonner";

import { IMyPost } from "../types";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary";

import GHForm from "./form/GHForm";
import GHInput from "./form/GHInput";
import TTextarea from "./form/GHTextArea";
import GHTagInput from "./form/GHTagInput";
import GHSelect from "./form/GHSelect";
import { useUpdatePostMutation } from "../redux/features/post/postApi";

const UpdateContent = ({
  post,
  onClose,
}: {
  post: IMyPost;
  onClose: () => void;
}) => {
  const defaultThumbnail = post?.thumbnail || "/default-thumbnail.png";
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(defaultThumbnail);
  const [value, setValue] = useState(post?.content);
  const [isPremium, setIsPremium] = useState(post?.isPremium || false);
  const [uploading, setUploading] = useState<boolean>(false);

  const [update] = useUpdatePostMutation();

  const defaultValues = {
    title: post.title,
    bio: post.bio,
    tags: post.tags,
    category: post.category,
    thumbnail: thumbnailUrl,
    content: post.content,
  };

  const onSubmit = async (data: any) => {
    const updatedData = {
      ...data,
      isPremium,
      thumbnail: thumbnailUrl,
      content: value,
      _id: post._id,
    };

    const res = await update(updatedData);
    if (res?.data?.success) {
      toast.success("post updated successfully");
      onClose();
    }
  };

  const handleThumbnailUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 10485760) {
        return toast.warning(
          "File size exceeds 10 MB limit. Please select a smaller file."
        );
      }

      setUploading(true);
      const url = await uploadImageToCloudinary(file);

      if (url) {
        setThumbnailUrl(url);
        toast.success("Thumbnail uploaded successfully!");
      } else {
        toast.error("Failed to upload thumbnail");
      }
      setUploading(false);
    }
  };

  return (
    <div className="h-[95%] w-full">
      <GHForm defaultValues={defaultValues} onSubmit={onSubmit}>
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
              defaultValue={post.category}
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
          checked={isPremium}
          name="isPremium"
          radius="full"
          onChange={(e) => setIsPremium(e.target.checked)}
        >
          Available for premium users only
        </Checkbox>

        <div className="py-3">
          <GHInput
            label="Thumbnail Image"
            name="thumbnail"
            type="file"
            onChange={handleThumbnailUpload}
          />
          {uploading ? (
            <p className="mt-3 text-center">Uploading...</p>
          ) : (
            thumbnailUrl && (
              <Image
                alt="Thumbnail preview"
                className="mt-3 w-32 mx-auto rounded-md object-cover"
                height={100}
                src={thumbnailUrl}
                width={200}
              />
            )
          )}
        </div>

        <ReactQuill
          className="mt-3"
          theme="snow"
          value={value}
          modules={modules}
          onChange={setValue}
        />

        <Button
          className="my-3 w-full rounded-md font-semibold"
          color="primary"
          size="lg"
          type="submit"
          variant="solid"
        >
          Update
        </Button>
      </GHForm>
    </div>
  );
};

export default UpdateContent;
