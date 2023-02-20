import { useRef, useState } from "react";
import { Checkbox } from "../checkbox/checkbox";
import style from "./filter.module.scss";

type OptionsProps = {
  children: React.ReactNode;
};

const Options = ({ children }: OptionsProps) => {
  return <div className={style.options}>{children}</div>;
};

type OptionProps = {
  label: string;
  checked: boolean;
  onClick?: (o: string) => void;
};

const Option = ({ label, checked, onClick }: OptionProps) => {
  const handleChange = (e: any) => {
    onClick?.(label);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <label className={style.option} tabIndex={0} onClick={handleClick}>
      <Checkbox checked={checked} onChange={handleChange} />
      {label}
    </label>
  );
};

type FilterProps = {
  label: React.ReactNode;
  options: string[];
  renderOption: (o: string) => React.ReactNode;
};

const Filter = ({ label, options, renderOption }: FilterProps) => {
  const [showOptions, setShowOptions] = useState(false);
  let timerId = useRef<NodeJS.Timeout>();

  const handleFilterClick = () => setShowOptions(!showOptions);

  const handleFilterBlur = () =>
    (timerId.current = setTimeout(() => setShowOptions(false)));

  const handleFilterFocus = () => clearTimeout(timerId.current);

  return (
    <div
      className={style.filter}
      onBlur={handleFilterBlur}
      onFocus={handleFilterFocus}
      onClick={handleFilterClick}
      tabIndex={0}
    >
      {label}
      <img src="/icon-arrow-down.svg" alt="" />
      {showOptions && <Options>{options.map(renderOption)}</Options>}
    </div>
  );
};

Filter.Option = Option;

export { Filter };
