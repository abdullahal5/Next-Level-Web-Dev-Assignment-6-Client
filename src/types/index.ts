import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse<T> = {
  data: {
    accessToken: any;
    data: any;
    result?: T;
    success: boolean;
    message: string;
  };
  error?: TError;
};

export interface IComment {
  postId: string;
  userId: IAuthor;
  commentText: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthor {
  _id: string;
  email: string;
  username: string;
  profilePicture?: string;
  role: string;
  followers: string[];
  following: string[];
  favourite: IPost[];
  isVerified: boolean;
  verificationBadge?: string | null;
  gender: string;
  interests: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  _id: string;
  title: string;
  bio: string;
  content: string;
  author: IAuthor;
  comments: IComment[];
  tags: string[];
  category: string;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
  isPremium: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
