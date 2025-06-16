import { Dispatch, ReactNode, SetStateAction } from "react";

export type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: Dispatch<SetStateAction<boolean>>;
};
