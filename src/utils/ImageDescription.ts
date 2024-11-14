"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import Base64 from "base64-js";

const generateDescription = async (imageURL: string, prompt: string) => {
  const imageBase64 = await fetch(imageURL)
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => Base64.fromByteArray(new Uint8Array(arrayBuffer)));

  const contents = [
    {
      role: "user",
      parts: [
        {
          inline_data: { mime_type: "image/jpeg", data: imageBase64 },
        },
        { text: prompt },
      ],
    },
  ];

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCyEXVy7JbNXG0t-WihSupGiLgwS16_zlc",
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  //@ts-ignore
  const result = await model.generateContentStream({ contents });

  let responseString = "";

  for await (const res of result.stream) {
    responseString += res.text();
  }

  return responseString;
};

export default generateDescription;