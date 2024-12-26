import { ChangeEvent, useState } from "react";
import classNames from "classnames";
import Icon from "../icon/Icon";

import styles from "./Input.module.scss";

interface IInputProps {
  id: string;
  label: string;
  name?: string;
  labelVisible?: boolean;
  icon?: "letter" | "lock" | "show" | "hide";
  email?: boolean;
  password?: boolean;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  value?: string;
  error?: { message: string };
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any;
}

const Input = ({
  id,
  label,
  name = "",
  className = "",
  value,
  labelVisible,
  icon,
  email,
  password,
  error: errorProp,
  placeholder = "",
  readOnly,
  disabled,
  onChange,
  margin,
  ...restProps
}: IInputProps) => {
  const [inputValue, setInputValue] = useState(value ? value : "");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const checkType = () => {
    if (email) return "email";

    if (password) return isPasswordVisible ? "text" : "password";

    return "text";
  };

  const iconType = isPasswordVisible ? "show" : "hide";

  const iconLabel = `비밀번호 ${isPasswordVisible ? "표시" : "감춤"}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    onChange(e);
  };

  return (
    <div className={classNames(styles.formControl, className)}>
      <label
        htmlFor={id}
        className={classNames(styles.label, labelVisible || styles.labelHidden)}
      >
        {label}
      </label>

      <div
        className={classNames(
          styles.inputWrapper,
          errorProp && styles.inputWrapperError
        )}
      >
        {icon ? <Icon type={icon} /> : null}
        <input
          id={id}
          type={checkType()}
          name={name}
          className={classNames(styles.input)}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          style={{ margin: margin }}
          {...restProps}
        />

        {password ? (
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            disabled={disabled}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>
        ) : null}
      </div>

      {errorProp && (
        <span role="alert" className={styles.error}>
          {errorProp.message}
        </span>
      )}
    </div>
  );
};

export default Input;
