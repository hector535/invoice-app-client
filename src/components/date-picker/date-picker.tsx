import { useState, useRef } from "react";
import { Calendar } from "./calendar/calendar";
import { classnames } from "@/utility/classnames";
import { formatToDayShortMonthSYear } from "@/utility/dates";

import style from "./date-picker.module.scss";

type Props = {
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
  value: string;
  onChange: (e: string) => void;
};

export const DatePicker = ({
  className,
  value,
  errorMessage,
  disabled,
  onChange,
}: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const timerId = useRef<NodeJS.Timeout>();

  const containerClasses = classnames(
    style.datepicker_container,
    {
      [style.has_error]: !!errorMessage,
    },
    {
      [style.disabled]: disabled,
    },
    className
  );

  const handleDatePickerClick = (e: any) =>
    !disabled && setShowCalendar(!showCalendar);

  const handleSelectDate = (date: string) => onChange?.(date);

  const handleBlur = () =>
    (timerId.current = setTimeout(() => setShowCalendar(false)));

  const handleFocus = () => clearTimeout(timerId.current);

  return (
    <>
      <div
        className={containerClasses}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClick={handleDatePickerClick}
        tabIndex={0}
      >
        <span>{formatToDayShortMonthSYear(value || "")}</span>
        <img src="/icon-calendar.svg" alt="" className={style.icon} />

        {showCalendar && (
          <Calendar onSelectDate={(date) => handleSelectDate(date)} />
        )}
      </div>
      {errorMessage && <span className={style.error_text}>{errorMessage}</span>}
    </>
  );
};
