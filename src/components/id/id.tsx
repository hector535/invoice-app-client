import { classnames } from "@/utility/classnames";
import style from "./id.module.scss";

type Props = {
  text: string;
  className?: string;
};

export const ID = ({ text, className }: Props) => {
  const idClasses = classnames(style.id, className);

  return (
    <span className={idClasses}>
      <span className={style.hash}>#</span>
      {text}
    </span>
  );
};
