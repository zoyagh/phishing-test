import {
  forwardRef,
  useState,
  type FocusEvent,
  type ChangeEvent,
  type LegacyRef,
  type KeyboardEvent,
} from "react";
import classNames from "classnames";

import { HideIcon, ShowIcon } from "assets";

import type { TInput } from "../../types/input";
import styles from "./Input.module.scss";

const Input = forwardRef(
  (
    {
      name,
      Icon,
      error,
      label,
      value,
      onBlur,
      onFocus,
      register,
      disabled,
      onChange,
      maxLength,
      minLength,
      onKeyDown,
      className = "",
      placeholder = "",
      containerClass = "",
      autoComplete = "off",
      type = "text",
    }: TInput,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const isPassword = type === "password";
    const displayType = isOpen ? "text" : type;

    const inputClassName = classNames(className, styles.wrapper__input, {
      [styles.wrapper__input__error]: error,
      [styles.wrapper__input__icon]: Icon,
    });

    const eyeIconToggler = () => {
      setIsOpen(prev => !prev);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange?.(value, e);
    };

    return (
      <div className={classNames(styles.wrapper, containerClass)}>
        {label && <span className={styles.wrapper__label}>{label}</span>}

        <div className={styles.wrapper__box}>
          {Icon && <Icon className={styles.wrapper__icon} />}

          <input
            ref={ref}
            name={name}
            value={value}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            onFocus={onFocus}
            placeholder={placeholder}
            className={inputClassName}
            autoComplete={autoComplete}
            onKeyDown={onKeyDown}
            onChange={handleChange}
            onBlur={onBlur}
            type={displayType}
            {...(register ? register(name, { onChange: handleChange, onBlur }) : null)}
          />

          {isPassword && (
            <div
              className={classNames(styles.wrapper__box__eye, {
                [styles.wrapper__box__eye__open]: isOpen,
              })}
              onClick={eyeIconToggler}
            >
              {isOpen ? <ShowIcon /> : <HideIcon />}
            </div>
          )}
        </div>

        {error && <p className={styles.wrapper__error}>{error}</p>}
      </div>
    );
  }
);

export default Input;
