import { Item } from "@/types/invoice";
import { toCurrency } from "@/utility/invoice";
import style from "./table-summary.module.scss";

type Props = {
  total: number;
  items: Item[];
};

export const TableSummary = ({ total, items }: Props) => {
  return (
    <div className={style.table}>
      <div className={style.head}>
        <span>Item Name</span>
        <span className={style.qty_header}>QTY.</span>
        <span className={style.price_header}>Price</span>
        <span className={style.total_header}>Total</span>
      </div>
      <div className={style.body}>
        {items.map((i) => (
          <div key={i.name} className={style.row}>
            <span className={style.name}>{i.name}</span>
            <span className={style.qty}>{i.quantity}</span>
            <span className={style.price}>{toCurrency(i.price)}</span>
            <span className={style.total}>{toCurrency(i.total)}</span>
          </div>
        ))}
      </div>
      <div className={style.foot}>
        <span className={style.foot_label}>Amount Due</span>
        <span className={style.foot_total}>{toCurrency(total)}</span>
      </div>
    </div>
  );
};
