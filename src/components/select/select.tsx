import { useRef, useState } from "react";
import { classnames } from "@/utility/classnames";

import style from "./select.module.scss";

interface Option {
  value: string | number;
  label: string;
}

type Props = {
  value: string | number;
  errorMessage?: string;
  options: Option[];
  onChange: (v: string | number) => void;
};

export const Select = ({ value, options, errorMessage, onChange }: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectedValue = options.find((v) => v.value == value);

  const timerId = useRef<NodeJS.Timeout>();

  const containerClasses = classnames(style.select_container, {
    [style.has_error]: !!errorMessage,
  });

  const handleSelectClick = () => setShowOptions(!showOptions);

  const handleOptionClick = (value: string | number) => onChange?.(value);

  const handleBlur = (e: React.FocusEvent) =>
    (timerId.current = setTimeout(() => setShowOptions(false)));

  const handleFocus = () => clearTimeout(timerId.current);

  return (
    <>
      <div
        className={containerClasses}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClick={handleSelectClick}
        tabIndex={0}
      >
        <span>{selectedValue?.label}</span>
        <img src="/icon-arrow-down.svg" alt="" />

        {showOptions && (
          <div
            className={style.options}
            ref={(ref) => ref && ref.focus()}
            tabIndex={-1}
          >
            {options.map((o, i) => (
              <div
                key={o.value}
                className={style.option}
                onClick={() => handleOptionClick(o.value)}
              >
                {o.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {errorMessage && <span className={style.error_text}>{errorMessage}</span>}
    </>
  );
};
