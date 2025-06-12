import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
};
