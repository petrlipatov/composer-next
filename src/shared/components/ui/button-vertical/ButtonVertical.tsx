import { forwardRef } from "react";
import cn from "classnames";
import { Props } from "./types";
import s from "./ButtonVertical.module.css";

export const ButtonVertical = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      className,
      disabled = false,
      isLoading = false,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          s.button,
          {
            [s.loading]: isLoading,
            [s.disabled]: isDisabled,
          },
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

ButtonVertical.displayName = "ButtonVertical";
