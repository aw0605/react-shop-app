import classNames from "classnames";
import styles from "./Button.module.scss";

const Button = ({
  label = "button",
  type = "button",
  secondary = false,
  bgColor,
  fgColor,
  width,
  ...restProps
}) => {
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
