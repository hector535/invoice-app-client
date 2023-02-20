import { useState } from "react";
import { Invoice } from "@/components/invoice/invoice";
import { useAppSelector } from "@/hooks/hooks";
import { useNavigateToTop } from "@/hooks/useNavigateToTop";
import { Button } from "@/components/button/button";
import { InvoiceItem } from "@/components/invoice-item/invoice-item";
import { Filter } from "@/components/filter/filter";
import { CreateInvoiceMessage } from "@/components/create-invoice-message/create-invoice-message";
import { Modal } from "@/components/modal/modal";
import { ReactComponent as PlusIcon } from "@/assets/icon-plus.svg";

import style from "./invoices-page.module.scss";

const InvoicesPage = () => {
  const invoices = useAppSelector((state) => state.invoice.invoices);
  const navigate = useNavigateToTop();

  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const filteredInvoices = selectedFilter.length
    ? invoices.filter((inv) => selectedFilter.includes(inv.status))
    : invoices;

  const handleNewInvoiceClick = () => {
    if (window.innerWidth < 768) return navigate("/new");

    setShowModal(true);
  };

  const handleFilterOptionClick = (option: string) => {
    let clonedFilter = [...selectedFilter];

    if (clonedFilter.includes(option)) {
      clonedFilter = clonedFilter.filter((opt) => opt !== option);
    } else {
      clonedFilter.push(option);
    }

    setSelectedFilter(clonedFilter);
  };

  return (
    <>
      <div className={style.invoices_page}>
        <div className={style.invoices_header}>
          <div>
            <h1 className={style.title}>Invoices</h1>
            <p className={style.info}>{invoices.length} total invoices</p>
          </div>

          <div className={style.actions_container}>
            <Filter
              options={["paid", "pending", "draft"]}
              label={<span className={style.filter_text}></span>}
              renderOption={(option) => (
                <Filter.Option
                  key={option}
                  label={option}
                  checked={selectedFilter.includes(option)}
                  onClick={handleFilterOptionClick}
                />
              )}
            />

            <Button
              onClick={handleNewInvoiceClick}
              icon={
                <span className={style.icon_container}>{<PlusIcon />}</span>
              }
            >
              <span className={style.button_text}></span>
            </Button>
          </div>
        </div>

        <div className={style.invoices_container}>
          {filteredInvoices.length ? (
            filteredInvoices.map((invoice) => (
              <InvoiceItem
                key={invoice.id}
                id={invoice.id}
                client={invoice.clientName}
                amount={invoice.total}
                date={invoice.paymentDue}
                status={invoice.status as any}
              />
            ))
          ) : (
            <CreateInvoiceMessage />
          )}
        </div>
      </div>
      <Modal
        openFrom="left"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Invoice onFormSubmit={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default InvoicesPage;
