import { useState } from "react";
import { classnames } from "@/utility/classnames";
import { formatDateToString, getParts } from "@/utility/dates";
import { ReactComponent as ArrowLeftIcon } from "@/assets/icon-arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "@/assets/icon-arrow-right.svg";

import style from "./calendar.module.scss";

const date = new Date();

const getDays = (
  start: number,
  end: number,
  cssClass: string,
  clickHandler?: (n: number) => void
) => {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(
      <div
        key={i + cssClass}
        className={cssClass}
        onClick={() => clickHandler?.(i)}
        tabIndex={0}
      >
        {i}
      </div>
    );
  }

  return arr;
};

type Props = {
  onSelectDate: (d: string) => void;
  className?: string;
};

export const Calendar = ({ onSelectDate, className }: Props) => {
  const [currentDate, setCurrentDate] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0)
  );

  const calendarClasses = classnames(style.calendar, className);
  const { month, year } = getParts({ date: currentDate, locale: "en-US" });

  const handleArrowClick = (e: React.MouseEvent, n: number) => {
    e.stopPropagation();

    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1 + n, 0)
    );
  };

  const handleDayClick = (day: number) => {
    const copiedDate = new Date(currentDate);
    copiedDate.setDate(day);
    onSelectDate(formatDateToString(copiedDate));
  };

  const renderDays = () => {
    let divs = [] as any;

    const numberOfDaysCurrentMonth = currentDate.getDate();

    const firstDayOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const numberOfDaysLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      0
    ).getDate();

    divs = [
      ...divs,
      ...getDays(
        numberOfDaysLastMonth - firstDayOfCurrentMonth + 1,
        numberOfDaysLastMonth,
        style.calendar_day_blocked
      ),
      ...getDays(
        1,
        numberOfDaysCurrentMonth,
        style.calendar_day,
        handleDayClick
      ),
    ];

    divs = [
      ...divs,
      ...getDays(1, 35 - divs.length, style.calendar_day_blocked),
    ];

    return divs;
  };

  return (
    <div
      className={calendarClasses}
      ref={(ref) => ref && ref.focus()}
      tabIndex={-1}
    >
      <div className={style.calendar_header}>
        <ArrowLeftIcon
          onClick={(e) => handleArrowClick(e, -1)}
          className={style.calendar_arrow}
          tabIndex={0}
        />
        <p>
          {month} {year}
        </p>
        <ArrowRightIcon
          onClick={(e) => handleArrowClick(e, 1)}
          className={style.calendar_arrow}
          tabIndex={0}
        />
      </div>
      <div className={style.calendar_body}>{renderDays()}</div>
    </div>
  );
};
