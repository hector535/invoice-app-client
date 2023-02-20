import { classnames } from "@/utility/classnames";
import style from "./badge.module.scss";

type Props = {
  status: "paid" | "pending" | "draft";
  className?: string;
};

export const Badge = ({ status, className }: Props) => {
  const badgeClasses = classnames(style.badge, style[status], className);
  return (
    <div className={badgeClasses}>
      <span className={style.circle}></span>
      <span>{status}</span>
    </div>
  );
};
