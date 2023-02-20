import { useNavigateToTop } from "@/hooks/useNavigateToTop";
import { ID } from "@/components/id/id";
import { Badge } from "@/components/badge/badge";
import { getParts, toDate } from "@/utility/dates";
import { toCurrency } from "@/utility/invoice";
import { ReactComponent as ArrowRightIcon } from "@/assets/icon-arrow-right.svg";

import style from "./invoice-item.module.scss";

type Props = {
  id: string;
  date: string;
  client: string;
  amount: number;
  status: "paid" | "pending" | "draft";
};

export const InvoiceItem = ({ id, date, client, amount, status }: Props) => {
  const navigate = useNavigateToTop();
  const { day, month, year } = getParts({ date: toDate(date) });

  const formatedAmount = toCurrency(amount);

  const handleInvoiceClick = () => {
    navigate(`/${id}`);
  };

  return (
    <div className={style.invoice_item} onClick={handleInvoiceClick}>
      <ID text={id} className={style.id} />
      <p className={style.date}>
        Due {day} {month} {year}
      </p>
      <p className={style.client}>{client}</p>
      <p className={style.amount}>{formatedAmount}</p>
      <Badge status={status} className={style.badge} />
      <ArrowRightIcon className={style.icon} />
    </div>
  );
};
