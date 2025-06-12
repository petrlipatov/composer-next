export type Props = {
  tags: string[];
  selectedTags: string[];
  filteredTags: string[];
  className?: string;
  disabledAll?: boolean;
  handleTagClick: (genre: string) => void;
  handleResetClick: () => void;
};
