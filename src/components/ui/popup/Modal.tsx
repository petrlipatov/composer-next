import { createPortal } from "react-dom";
import { CloseIcon } from "../../icons/Icons/CloseIcon/CloseIcon";
import s from "./Modal.module.css";
import { Props } from "./types";
import { ACCENT_COLOR } from "@/shared/constants/ui";

export const Modal = ({ isOpen, children, onClose }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={s.container} onClick={() => onClose(false)}>
      <div className={s.content}>
        <button className={s.closeButton} onClick={() => onClose(false)}>
          <CloseIcon color={ACCENT_COLOR} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
