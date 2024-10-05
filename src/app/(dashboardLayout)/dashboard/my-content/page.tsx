"use client";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { FieldValues } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";

import GlobalModal from "@/src/components/UI/GlobalModal";
import GHInput from "@/src/components/form/GHInput";
import GHForm from "@/src/components/form/GHForm";
import GHSelect from "@/src/components/form/GHSelect";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const categoryOptions = [
  {
    key: "flowers",
    label: "Flowers",
  },
  {
    key: "vegetables",
    label: "Vegetables",
  },
  {
    key: "herbs",
    label: "Herbs",
  },
  {
    key: "shrubs",
    label: "Shrubs",
  },
  {
    key: "trees",
    label: "Trees",
  },
  {
    key: "succulents",
    label: "Succulents & Cacti",
  },
  {
    key: "indoor-plants",
    label: "Indoor Plants",
  },
  {
    key: "garden-tools",
    label: "Garden Tools",
  },
  {
    key: "fertilizers",
    label: "Fertilizers",
  },
  {
    key: "pots-planters",
    label: "Pots & Planters",
  },
  {
    key: "seeds",
    label: "Seeds",
  },
  {
    key: "watering-systems",
    label: "Watering Systems",
  },
];

const modules = {
  toolbar: [
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

  const onSubmit = (data: FieldValues) => {
    const postData = {
      ...data,
      isPremium: isPremium,
      content: value
    };

    console.log(postData);
  };

  return (
    <>
      <Button variant="solid" onPress={onOpen}>
        <IoAddCircleOutline fontSize={"1.5rem"} />
        Add New Content
      </Button>

      <GlobalModal
        action="Create Post"
        isOpen={isOpen}
        size="xl"
        title="New Content"
        onClose={onClose}
      >
        <GHForm onSubmit={onSubmit}>
          <GHInput label="Title" name="title" type="text" />
          <div className="flex items-center gap-2.5 py-3">
            <GHInput label="Tags" name="tags" type="text" />
            <GHSelect
              label="Category"
              name="category"
              options={categoryOptions}
              type="text"
            />
          </div>
          <Checkbox
            radius="full"
            value="ok"
            onChange={() => setIsPremium(!isPremium)}
          >
            Available for premium user only
          </Checkbox>

          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={setValue}
            className="pt-3 rounded-lg border-black max-h-96 overflow-y-auto"
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
    </>
  );
};

export default MyContent;
