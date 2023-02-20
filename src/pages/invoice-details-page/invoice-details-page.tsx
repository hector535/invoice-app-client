import { useState } from "react";
import { Navigate, To, useParams } from "react-router-dom";
import { remove, setToPaid } from "@/store/invoice/invoice-slice";
import { useNavigateToTop } from "@/hooks/useNavigateToTop";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Invoice } from "@/components/invoice/invoice";
import { Badge } from "@/components/badge/badge";
import { Button } from "@/components/button/button";
import { ID } from "@/components/id/id";
import { TableSummary } from "@/components/table-summary/table-summary";
import { Modal } from "@/components/modal/modal";
import { formatToDayShortMonthSYear } from "@/utility/dates";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { ReactComponent as ArrowLeftIcon } from "@/assets/icon-arrow-left.svg";
import { TABLET_WIDTH } from "@/const/app";

import style from "./invoice-details-page.module.scss";

const InvoiceDetailsPage = () => {
  const { id } = useParams();
  const invoices = useAppSelector((state) => state.invoice.invoices);
  const { viewportWidth } = useViewportWidth();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!id || !invoice) return <Navigate to="/" />;

  const navigate = useNavigateToTop();
  const dispatch = useAppDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleEditButtonClick = () => {
    if (viewportWidth.current < TABLET_WIDTH)
      return navigate(`/${invoice.id}/edit`);

    setShowInvoiceModal(true);
  };

  const handleDeleteModalButtonClick = () => {
    dispatch(remove(invoice.id));
    setShowDeleteModal(false);
    navigate("/");
  };

  const handleMarkAsPaidButtonClick = () => {
    if (invoice.status === "paid") return;

    dispatch(setToPaid(invoice.id));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <main className={style.invoice_page}>
        <Button
          type="link"
          icon={<ArrowLeftIcon />}
          className={style.back_btn}
          onClick={() => navigate(-1 as To)}
        >
          Go back
        </Button>
        <div className={style.status_actions_container}>
          <div className={style.status_container}>
            <span>Status</span>
            <Badge status={invoice.status} />
          </div>
          <div className={style.actions_container}>
            <Button
              type="default"
              onClick={handleEditButtonClick}
              className={style.edit}
            >
              Edit
            </Button>
            <Button
              type="danger"
              onClick={() => setShowDeleteModal(true)}
              className={style.delete}
            >
              Delete
            </Button>
            {invoice.status === "pending" && (
              <Button
                type="primary"
                onClick={handleMarkAsPaidButtonClick}
                className={style.mark_paid}
              >
                Mark as Paid
              </Button>
            )}
          </div>
        </div>

        <div className={style.invoice_content}>
          <div className={style.header}>
            <div className={style.id_description_container}>
              <ID text={invoice.id} className={style.id} />
              <p className={style.description}>{invoice.description}</p>
            </div>
            <div className={style.bill_from}>
              <p className={style.address}>{invoice.senderAddress.street}</p>
              <p className={style.city}>{invoice.senderAddress.city}</p>
              <p className={style.post_code}>
                {invoice.senderAddress.postCode}
              </p>
              <p className={style.country}>{invoice.senderAddress.country}</p>
            </div>
          </div>

          <div className={style.body}>
            <div className={style.dates_container}>
              <div className={style.invoice_date_container}>
                <p>Invoice Date</p>
                <p className={style.highlight}>
                  {formatToDayShortMonthSYear(invoice.createdAt)}
                </p>
              </div>

              <div className={style.payment_due_container}>
                <p>Payment Due</p>
                <p className={style.highlight}>
                  {formatToDayShortMonthSYear(invoice.paymentDue)}
                </p>
              </div>
            </div>

            <div className={style.bill_to_container}>
              <p>Bill To</p>
              <p className={style.highlight}>{invoice.clientName}</p>
              <div className={style.bill_to}>
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </div>
            </div>

            <div className={style.sent_container}>
              <p>Sent to</p>
              <p className={style.highlight}>{invoice.clientEmail}</p>
            </div>
          </div>

          {invoice.items.length ? (
            <TableSummary items={invoice.items} total={invoice.total} />
          ) : null}
        </div>
      </main>

      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h2 className={style.modal_title}>Confirm Deletion</h2>
        <p className={style.modal_body}>
          Are you sure you want to delete invoice #{invoice.id}? This action
          cannot be undone.
        </p>
        <div className={style.modal_actions}>
          <Button type="default" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button type="danger" onClick={handleDeleteModalButtonClick}>
            Delete
          </Button>
        </div>
      </Modal>
      <Modal
        openFrom="left"
        open={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
      >
        <Invoice
          invoice={invoice}
          isEditMode
          onFormSubmit={() => setShowInvoiceModal(false)}
          onCancel={() => setShowInvoiceModal(false)}
        />
      </Modal>
    </>
  );
};

export default InvoiceDetailsPage;
