import React, { ReactNode } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";

type ISize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full";

interface GlobalModalProps {
  title: string;
  children: ReactNode;
  action: string;
  size?: ISize;
  isOpen: boolean;
  onClose: () => void;
}

const GlobalModal: React.FC<GlobalModalProps> = ({
  title,
  children,
  size = "md",
  isOpen,
  onClose,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        scrollBehavior="outside"
        size={size}
        onClose={onClose}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody className="pb-6">{children}</ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GlobalModal;
