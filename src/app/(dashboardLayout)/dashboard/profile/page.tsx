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
  FaLeaf,
} from "react-icons/fa";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";

export default function Component() {
  const staticUserData = {
    email: "garden_lover@example.com",
    role: "user",
    username: "garden_lover",
    profilePicture: "https://i.ibb.co/vkVW6s0/download.png",
    bio: "🌱 Growing greens, one day at a time. Nature lover. Beginner gardener.",
    followers: 124,
    following: 45,
    post: 20,
    isVerified: true,
    verificationBadge:
      "https://i.ibb.co.com/TMctChJ/download-removebg-preview-2.png",
    dateOfBirth: "1990-05-15",
    location: "California, USA",
    gender: "Female",
    gardeningExperienceLevel: "Intermediate",
    phone: "+1-123-456-7890",
    interests: ["Succulents", "Herb gardening", "Landscaping"],
    socialMediaLinks: {
      facebook: "https://facebook.com/gardenlover",
      twitter: "https://twitter.com/gardenlover",
      instagram: "https://instagram.com/gardenlover",
      linkedin: "https://linkedin.com/in/gardenlover",
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="shadow-lg">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex flex-col items-center text-center">
                <Avatar
                  alt={staticUserData.username}
                  className="w-32 h-32 text-large mb-4"
                  src={staticUserData.profilePicture}
                />
                <h2 className="text-2xl font-bold mb-2">
                  {staticUserData.username}
                </h2>
                <p className="border px-3 py-1 my-2 rounded-md text-xs border-gray-600">
                  {staticUserData.gardeningExperienceLevel}
                </p>
                <p className="text-default-500 mb-4">{staticUserData.bio}</p>
                <div className="flex justify-center gap-4 mb-4">
                  <div>
                    <span className="font-semibold text-success">
                      {staticUserData.followers}
                    </span>
                    <p className="text-small text-default-500">Followers</p>
                  </div>
                  <Divider orientation="vertical" />
                  <div>
                    <span className="font-semibold text-success">
                      {staticUserData.following}
                    </span>
                    <p className="text-small text-default-500">Following</p>
                  </div>
                  <Divider orientation="vertical" />
                  <div>
                    <span className="font-semibold text-success">
                      {staticUserData.post}
                    </span>
                    <p className="text-small text-default-500">Posts</p>
                  </div>
                </div>
                <Link className="w-full" href="/dashboard/edit-profile">
                  <div className="w-full">
                    <Button
                      className="w-full textwhi"
                      color="success"
                      variant="solid"
                    >
                      Edit Profile
                    </Button>
                  </div>
                </Link>
              </div>
            </div>
            <Divider className="hidden md:block" orientation="vertical" />
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold mb-4">About Me</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-success" />
                  <span>{staticUserData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-success" />
                  <span>{staticUserData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBirthdayCake className="text-success" />
                  <span>{staticUserData.dateOfBirth}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaVenusMars className="text-success" />
                  <span>{staticUserData.gender}</span>
                </div>
              </div>
              <Divider className="my-6" />
              <h3 className="text-xl font-semibold mb-4">
                Gardening Interests
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {staticUserData.interests.map((interest) => (
                  <div key={Math.random()} className="flex items-center gap-2">
                    <FaLeaf className="text-success" />
                    {interest}
                  </div>
                ))}
              </div>
              <Divider className="my-6" />
              <h3 className="text-xl font-semibold mb-4">Social Media</h3>
              <div className="flex gap-4">
                <a
                  aria-label="Facebook"
                  href={staticUserData.socialMediaLinks.facebook}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaFacebook className="text-3xl text-success hover:text-success-400" />
                </a>
                <a
                  aria-label="Twitter"
                  href={staticUserData.socialMediaLinks.twitter}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaTwitter className="text-3xl text-success hover:text-success-400" />
                </a>
                <a
                  aria-label="Instagram"
                  href={staticUserData.socialMediaLinks.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaInstagram className="text-3xl text-success hover:text-success-400" />
                </a>
                <a
                  aria-label="LinkedIn"
                  href={staticUserData.socialMediaLinks.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaLinkedin className="text-3xl text-success hover:text-success-400" />
                </a>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
