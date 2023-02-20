import { classnames } from "@/utility/classnames";
import style from "./button.module.scss";

type Props = {
  block?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  nativeType?: "button" | "submit";
  type?: "primary" | "secondary" | "danger" | "default" | "link";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
};

export const Button = ({
  block,
  disabled,
  icon,
  nativeType = "submit",
  type = "primary",
  children,
  className,
  onClick,
}: Props) => {
  const classes = classnames(
    style.button,
    { [style.block]: block },
    { [style[type]]: true },
    { [style.icon]: !!icon },
    className
  );
  return (
    <button
      type={nativeType}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
};
