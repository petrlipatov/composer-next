import { Props } from "./types";
import { Tag } from "../tag";
import s from "./Tags.module.css";
import cn from "classnames";
import { ResetButton } from "./reset-button/ResetButton";

export const Tags = ({
  tags,
  selectedTags,
  filteredTags,
  className,
  disabledAll = false,
  handleTagClick,
  handleResetClick,
}: Props) => {
  const isTagSelected = (tag: string) => {
    return selectedTags.includes(tag);
  };

  const isTagDisabled = (tag: string) => {
    return filteredTags.includes(tag);
  };

  return (
    <div className={cn(s.container, className)}>
      {tags.map((genre) => (
        <Tag
          isSelected={isTagSelected(genre)}
          isDisabled={disabledAll || isTagDisabled(genre)}
          key={genre}
          onClick={() => handleTagClick(genre)}
        >
          {genre}
        </Tag>
      ))}
      <ResetButton
        isActive={selectedTags.length > 0}
        clickHandler={handleResetClick}
      />
    </div>
  );
};
