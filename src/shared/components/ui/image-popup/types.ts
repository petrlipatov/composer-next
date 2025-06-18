export type Props = {
  src: string;
  isOpen: boolean;
  onClose: () => void;
  aspectRatio?: number;
  blurDataURL: string;
};
