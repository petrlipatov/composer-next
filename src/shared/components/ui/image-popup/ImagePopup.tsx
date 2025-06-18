import Image from "next/image";
import { Modal } from "../modal";
import { Props } from "./types";

export const ImagePopup = ({ isOpen, onClose, src }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          position: "relative",
          width: "90vw",
          maxWidth: "540px",
          aspectRatio: 1,
        }}
      >
        <Image fill src={src} alt="artwork-image" />
      </div>
    </Modal>
  );
};
