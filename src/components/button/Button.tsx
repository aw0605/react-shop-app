import classNames from "classnames";
import styles from "./Button.module.scss";

interface IButtonProps {
  label?: string;
  type?: "submit" | "reset" | "button" | undefined;
  secondary?: boolean;
  bgColor?: string;
  fgColor?: string;
  width?: string;
  [x: string]: any;
}

const Button = ({
  label = "button",
  type = "button",
  secondary = false,
  bgColor,
  fgColor,
  width,
  ...restProps
}: IButtonProps) => {
  const composeClasses = classNames(
    styles.button,
    secondary ? styles.secondary : styles.primary
  );

  const style = {
    backgroundColor: bgColor || "",
    color: fgColor || "",
    width: width || "",
  };

  return (
    <button type={type} className={composeClasses} style={style} {...restProps}>
      {label}
    </button>
  );
};

export default Button;
