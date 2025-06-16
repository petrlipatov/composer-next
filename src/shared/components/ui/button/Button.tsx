import { forwardRef } from "react";
import cn from "classnames";
import { Props } from "./types";
import s from "./Button.module.css";

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      className,
      disabled = false,
      isLoading = false,
      variant = "primary",
      size = "m",
      type = "button",
      spinner,
      loadingText,
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
          s[variant],
          s[`size-${size}`],
          {
            [s.loading]: isLoading,
            [s.disabled]: isDisabled,
          },
          className
        )}
        {...rest}
      >
        <span
          className={cn(s.content, {
            [s.hidden]: isLoading && !loadingText,
          })}
        >
          {isLoading && loadingText ? loadingText : children}
        </span>
        {isLoading && (
          <div className={s.spinnerOverlay}>
            <div className={s.spinner}>
              {spinner || <div className={s.defaultSpinner} />}
            </div>
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
