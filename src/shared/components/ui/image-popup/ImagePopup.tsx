import Image from "next/image";
import { Modal } from "../modal";
import { Props } from "./types";

export const ImagePopup = ({
  isOpen,
  onClose,
  src,
  blurDataURL,
  aspectRatio = 1,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          position: "relative",
          width: "90vw",
          maxWidth: "540px",
          aspectRatio: aspectRatio,
        }}
      >
        <Image
          fill
          src={src}
          alt="artwork-image"
          blurDataURL={blurDataURL}
          placeholder={blurDataURL ? "blur" : undefined}
          style={{ pointerEvents: "none" }}
          quality={50}
          sizes="(max-width: 540px) 90vw, (max-width: 1024px) 50vw,(max-width: 1280px) 25vw,"
        />
      </div>
    </Modal>
  );
};
