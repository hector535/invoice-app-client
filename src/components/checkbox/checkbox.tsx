import style from "./checkbox.module.scss";

type Props = {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent) => void;
};

export const Checkbox = ({ checked, onChange }: Props) => {
  return (
    <div className={style.checkbox_container}>
      <input
        type="checkbox"
        className={style.original_checkbox}
        checked={checked}
        onChange={onChange}
      />
      <span className={style.custom_checkbox}></span>
    </div>
  );
};
