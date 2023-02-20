import React from "react";
import { classnames } from "@/utility/classnames";
import style from "./form-item.module.scss";

type Props = {
  id?: string;
  label: string;
  errorMessage?: string;
  className?: string;
  children: JSX.Element;
};

export const FormItem = ({
  label,
  id,
  errorMessage,
  className,
  children,
}: Props) => {
  const formItemClasses = classnames(style.form_item, className);

  const labelClasses = classnames(style.label, {
    [style.has_error]: !!errorMessage,
  });

  return (
    <div className={formItemClasses}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      {React.cloneElement(React.Children.only(children), {
        id,
        errorMessage,
      })}
    </div>
  );
};
