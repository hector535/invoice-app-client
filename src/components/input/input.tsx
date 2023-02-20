import { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { InvoiceFormType } from "@/types/invoice";
import { classnames } from "@/utility/classnames";

import style from "./input.module.scss";

type Props = {
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const Input = forwardRef<
  HTMLInputElement,
  Props & ReturnType<UseFormRegister<InvoiceFormType>>
>(({ className, errorMessage, ...props }, ref) => {
  const inputClasses = classnames(style.input, className, {
    [style.has_error]: !!errorMessage,
  });

  return (
    <>
      <input type="text" {...props} className={inputClasses} ref={ref} />
      {errorMessage && <span className={style.error_text}>{errorMessage}</span>}
    </>
  );
});
