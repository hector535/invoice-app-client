import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form/dist/types/form";
import { FormItem } from "@/components/form-item/form-item";
import { InvoiceFormType } from "@/types/invoice";
import { Input } from "@/components/input/input";
import { toCurrency } from "@/utility/invoice";
import { ReactComponent as DeleteIcon } from "@/assets/icon-delete.svg";

import style from "./form-invoice-item.module.scss";

type Props = {
  index: number;
  errors: FieldErrors<InvoiceFormType>;
  control: Control<InvoiceFormType>;
  register: UseFormRegister<InvoiceFormType>;
  setValue: UseFormSetValue<InvoiceFormType>;
  onRemove: (i: number) => void;
};

export const FormInvoiceItem = ({
  index,
  control,
  errors,
  register,
  setValue,
  onRemove,
}: Props) => {
  const itemsWatcher = useWatch({
    name: "items",
    control,
  });

  const { quantity, price, total } = itemsWatcher[index];

  useEffect(() => {
    if (quantity && price) {
      setValue(`items.${index}.total`, quantity * price);
    }
  }, [quantity, price]);

  return (
    <div className={style.form_invoice_item_container}>
      <FormItem
        label="Item Name"
        id={`item_${index}_name`}
        className={style.form_item_name}
        errorMessage={errors?.items?.[index]?.name?.message}
      >
        <Input {...register(`items.${index}.name` as const)} />
      </FormItem>

      <FormItem
        label="Qty."
        id={`item_${index}_qty`}
        className={style.form_item_qty}
        errorMessage={errors?.items?.[index]?.quantity?.message}
      >
        <Input
          {...register(`items.${index}.quantity` as const, {
            valueAsNumber: true,
          })}
        />
      </FormItem>

      <FormItem
        label="Price"
        id={`item_${index}_price`}
        className={style.form_item_price}
        errorMessage={errors?.items?.[index]?.price?.message}
      >
        <Input
          {...register(`items.${index}.price` as const, {
            valueAsNumber: true,
          })}
        />
      </FormItem>

      <div className={style.form_item_total}>
        <span>Total</span>
        <div className={style.form_total_icon}>
          <span>{toCurrency(total)}</span>
          <DeleteIcon
            onClick={() => onRemove(index)}
            className={style.form_item_icon}
          />
        </div>
      </div>
    </div>
  );
};
