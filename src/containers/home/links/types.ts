import { Dispatch, SetStateAction } from "react";

export interface Props {
  modalHandler: Dispatch<SetStateAction<boolean>>;
}
