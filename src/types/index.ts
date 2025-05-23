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
  defaultValue?: string;
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
  _id: string;
  postId: string;
  userId: IAuthor;
  commentText: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface IAuthor {
  post: string;
  socialMediaLinks: ISocialMediaLinks;
  _id: string;
  email: string;
  username: string;
  profilePicture?: string;
  role: string;
  bio: string;
  gardeningExperienceLevel: [];
  followers: string[];
  following: string[];
  favourite: IPost[];
  isVerified: boolean;
  verificationBadge?: string | null;
  gender: string;
  interests: string;
  location: string;
  status: "Active" | "Blocked";
  phone: string;
  dateOfBirth: string;
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
  upvotes: string[];
  downvotes: string[];
  commentsCount: number;
  isPremium: boolean;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface editUserData {
  _id: string | undefined;
  username: string;
  bio: string;
  gardeningExperienceLevel: string;
  location: string;
  phone: string;
  gender: string;
  facebook?: string;
  twitter?: string;
  interest: string;
  instagram?: string;
  linkedin?: string;
  profilePicture?: string;
}

export interface IPayment {
  _id: string;
  user: User;
  amount: number;
  paymentMethod: string;
  status: string;
  transactionId: string;
  planTitle: string;
  planPrice: number;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  socialMediaLinks: SocialMediaLinks;
  _id: string;
  email: string;
  password: string;
  role: string;
  username: string;
  profilePicture: string;
  followers: string[];
  following: any[];
  favourite: any[];
  isVerified: boolean;
  gender: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: string;
  dateOfBirth: string;
  gardeningExperienceLevel: string;
  interests: string;
  location: string;
  phone: string;
}

export interface SocialMediaLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface IMyPost {
  _id: string;
  title: string;
  bio: string;
  content: string;
  author: Author;
  comments: string[];
  tags: string[];
  category: string;
  upvotes: string[];
  downvotes: string[];
  commentsCount: number;
  isPremium: boolean;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Author {
  socialMediaLinks: SocialMediaLinks;
  _id: string;
  email: string;
  password: string;
  role: string;
  username: string;
  profilePicture: string;
  followers: any[];
  following: string[];
  favourite: any[];
  isVerified: boolean;
  gender: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: string;
  gardeningExperienceLevel: string;
  interests: string;
  location: string;
  phone: string;
}

export interface SocialMediaLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}
