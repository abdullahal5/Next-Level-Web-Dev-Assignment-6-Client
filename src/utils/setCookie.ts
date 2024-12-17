"use server";

import { cookies } from "next/headers";

export const getToken = async (token: string) => {
  cookies().set("token", token);
};

export const removeToken = () => {
  cookies().delete("token");
};
