import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Invoice } from "@/components/invoice/invoice";
import { Button } from "@/components/button/button";
import { ReactComponent as ArrowLeftIcon } from "@/assets/icon-arrow-left.svg";

import style from "./invoice-page.module.scss";
import { useAppSelector } from "@/hooks/hooks";

const InvoicePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEditMode = pathname.includes("edit");

  let invoice = { items: [] } as any;

  if (isEditMode) {
    const { id } = useParams();

    if (!id) return <Navigate to="/" />;

    const invoices = useAppSelector((state) => state.invoice.invoices);
    invoice = invoices.find((inv) => inv.id === id);

    if (!invoice) return <Navigate to="/" />;
  }

  return (
    <main className={style.new_invoice_page}>
      <div className={style.content}>
        <Button
          type="link"
          icon={<ArrowLeftIcon />}
          className={style.back_btn}
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>

        <Invoice
          invoice={invoice}
          isEditMode={isEditMode}
          onFormSubmit={() => navigate(-1)}
          onCancel={() => navigate(-1)}
        />
      </div>
    </main>
  );
};

export default InvoicePage;
