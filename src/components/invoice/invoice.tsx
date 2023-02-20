import { useFieldArray, useForm, Controller } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { add, update } from "@/store/invoice/invoice-slice";
import { useAppDispatch } from "@/hooks/hooks";
import { ID } from "@/components/id/id";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button/button";
import { DatePicker } from "@/components/date-picker/date-picker";
import { FormItem } from "@/components/form-item/form-item";
import { Select } from "@/components/select/select";
import { Input } from "@/components/input/input";
import { invoiceSchema } from "@/validation-schemas/invoice";
import { FormInvoiceItem } from "@/components/form-invoice-item/form-invoice-item";
import { generateId } from "@/utility/invoice";
import { toDate } from "@/utility/dates";
import { InvoiceType, InvoiceFormType } from "@/types/invoice";

import style from "./invoice.module.scss";

const paymentTermsOptions = [
  {
    value: 1,
    label: "Net 1 Day",
  },
  {
    value: 7,
    label: "Net 7 Days",
  },
  {
    value: 14,
    label: "Net 14 Days",
  },
  {
    value: 30,
    label: "Net 30 Days",
  },
];

type Props = {
  invoice?: InvoiceType;
  isEditMode?: boolean;
  onFormSubmit?: () => void;
  onCancel?: () => void;
};

export const Invoice = ({
  invoice,
  isEditMode,
  onFormSubmit,
  onCancel,
}: Props) => {
  const dispatch = useAppDispatch();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<InvoiceFormType>({
    values: invoice,
    resolver: zodResolver(invoiceSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });

  const handleAddNewItem = () =>
    append({ name: "", quantity: 1, price: 0, total: 0 });

  const onSubmit: SubmitHandler<InvoiceFormType> = (data) => {
    const total = data.items.reduce((acc, next) => acc + next.total, 0);

    const copiedInvoice = {
      ...data,
      clientEmail: data.clientEmail.toLowerCase(),
      total,
    } as InvoiceType;

    if (isEditMode) {
      copiedInvoice.id = invoice!.id;
      copiedInvoice.paymentDue = new Date(
        toDate(copiedInvoice.createdAt).getTime() +
          +data.paymentTerms * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];

      dispatch(update(copiedInvoice));
    } else {
      const createdAt = data.createdAt ? toDate(data.createdAt) : new Date();
      const paymentTerms = data.paymentTerms ? +data.paymentTerms : 1;

      copiedInvoice.id = generateId();
      copiedInvoice.createdAt = createdAt.toISOString().split("T")[0];
      copiedInvoice.paymentDue = new Date(
        createdAt.getTime() + paymentTerms * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];

      dispatch(add(copiedInvoice));
    }

    onFormSubmit?.();
  };

  const handleSaveAsDraftClick = () => {
    const formData = getValues();
    onSubmit({ ...formData, status: "draft" });
  };

  const handleCancelResetButtonClick = () => {
    reset();

    if (isEditMode) return onCancel?.();
  };

  return (
    <form
      className={style.new_invoice}
      onSubmit={handleSubmit((data) =>
        onSubmit({ ...data, status: "pending" })
      )}
    >
      <h2 className={style.title}>
        {isEditMode ? (
          <>
            Edit <ID text={invoice!.id} />
          </>
        ) : (
          "New Invoice"
        )}
      </h2>

      <div className={style.bill_from_container}>
        <h3 className={style.sub_title}>Bill From</h3>

        <FormItem
          label="Street Address"
          id="street_address"
          className={style.bill_street}
          errorMessage={errors.senderAddress?.street?.message}
        >
          <Input {...register("senderAddress.street")} />
        </FormItem>

        <FormItem
          label="City"
          id="city"
          errorMessage={errors.senderAddress?.city?.message}
        >
          <Input {...register("senderAddress.city")} />
        </FormItem>

        <FormItem
          label="Post Code"
          id="post_code"
          errorMessage={errors.senderAddress?.postCode?.message}
        >
          <Input {...register("senderAddress.postCode")} />
        </FormItem>

        <FormItem
          label="Country"
          id="country"
          className={style.bill_country}
          errorMessage={errors.senderAddress?.country?.message}
        >
          <Input {...register("senderAddress.country")} />
        </FormItem>
      </div>

      <div className={style.bill_to_container}>
        <h3 className={style.sub_title}>Bill To</h3>

        <FormItem
          label="Client's name"
          id="client"
          className={style.client}
          errorMessage={errors.clientName?.message}
        >
          <Input {...register("clientName")} />
        </FormItem>

        <FormItem
          label="Client's email"
          id="email"
          className={style.email}
          errorMessage={errors.clientEmail?.message}
        >
          <Input {...register("clientEmail")} />
        </FormItem>

        <FormItem
          label="Street Address"
          id="client_address"
          className={style.client_address}
          errorMessage={errors.clientAddress?.street?.message}
        >
          <Input {...register("clientAddress.street")} />
        </FormItem>

        <FormItem
          label="City"
          id="client_city"
          className={style.client_city}
          errorMessage={errors.clientAddress?.city?.message}
        >
          <Input {...register("clientAddress.city")} />
        </FormItem>

        <FormItem
          label="Post Code"
          id="client_post_code"
          className={style.client_code}
          errorMessage={errors.clientAddress?.postCode?.message}
        >
          <Input {...register("clientAddress.postCode")} />
        </FormItem>

        <FormItem
          label="Country"
          id="client_country"
          className={style.client_country}
          errorMessage={errors.clientAddress?.country?.message}
        >
          <Input {...register("clientAddress.country")} />
        </FormItem>
      </div>

      <div className={style.date_payment_description_container}>
        <FormItem
          label="Invoice Date"
          errorMessage={errors.createdAt?.message}
          className={style.invoice_date}
        >
          <Controller
            render={({ field: { onChange, value } }) => (
              <DatePicker
                value={value}
                onChange={onChange}
                disabled={isEditMode}
                errorMessage={errors.createdAt?.message}
              />
            )}
            control={control}
            name="createdAt"
            defaultValue={invoice?.createdAt}
          />
        </FormItem>

        <FormItem
          label="Payment Terms"
          errorMessage={errors.paymentTerms?.message}
          className={style.payment_terms}
        >
          <Controller
            render={({ field: { onChange, value } }) => (
              <Select
                options={paymentTermsOptions}
                onChange={(selectedValue) => onChange(selectedValue)}
                value={value}
                errorMessage={errors.paymentTerms?.message}
              />
            )}
            name="paymentTerms"
            control={control}
            defaultValue={invoice?.paymentTerms}
          />
        </FormItem>

        <FormItem
          label="Project Description"
          id="project_description"
          errorMessage={errors.description?.message}
          className={style.description}
        >
          <Input {...register("description")} />
        </FormItem>
      </div>

      <div className={style.item_list_container}>
        <h2 className={style.group_title}>Item List</h2>

        {fields.map((field, index) => (
          <FormInvoiceItem
            key={field.id}
            index={index}
            control={control}
            errors={errors}
            register={register}
            setValue={setValue}
            onRemove={remove}
          />
        ))}
      </div>

      <Button
        type="default"
        nativeType="button"
        block
        onClick={handleAddNewItem}
        className={style.add_item_btn}
      >
        + Add New Item
      </Button>

      <div className={style.form_actions}>
        <Button
          type="default"
          nativeType="button"
          onClick={handleCancelResetButtonClick}
          className={`${style.discard_cancel_btn} ${
            !isEditMode && window.innerWidth >= 768 ? style.pull_right : ""
          }`}
        >
          {isEditMode ? "Cancel" : "Discard"}
        </Button>
        {!isEditMode && (
          <Button
            nativeType="button"
            type="secondary"
            onClick={handleSaveAsDraftClick}
            className={style.draft_btn}
          >
            Save as Draft
          </Button>
        )}

        <Button type="primary" className={style.save_btn}>
          Save & Send
        </Button>
      </div>
    </form>
  );
};
