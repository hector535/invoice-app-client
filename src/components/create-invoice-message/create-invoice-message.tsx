import style from "./create-invoice-message.module.scss";

export const CreateInvoiceMessage = () => {
  return (
    <div className={style.message}>
      <img className={style.img} src="/illustration-empty.svg" alt="" />
      <h2 className={style.title}>There is nothing here</h2>
      <p className={style.description}>
        Create an invoice by clicking the <span className={style.new}></span>
        button and get started
      </p>
    </div>
  );
};
