"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";

import GlobalModal from "./UI/GlobalModal";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthenticationModal = ({ isOpen, setIsOpen }: IProps) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <GlobalModal
      action="auth"
      isOpen={isOpen}
      title="Authentication"
      onClose={handleClose}
    >
      <div>
        You are not currently logged in. Please login first to continue.
      </div>
      <div className="mb-4 mt-2 flex gap-2">
        <Link className="flex-1" href={`/register`}>
          <Button className="w-full">Register</Button>
        </Link>
        <Link className="flex-1" href={`/login`}>
          <Button className="w-full">Login</Button>
        </Link>
      </div>
    </GlobalModal>
  );
};

export default AuthenticationModal;
