import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { classnames } from "@/utility/classnames";

import style from "./modal.module.scss";

type Props = {
  open?: boolean;
  openFrom?: "left" | "center";
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
};

export const Modal = ({
  children,
  open,
  openFrom = "center",
  className,
  onClose,
}: Props) => {
  const [mounted, setMounted] = useState(false);
  const destinationRef = useRef<HTMLElement | null>(null);

  let direction = "";

  if (open) direction = style[`show_${openFrom}`];
  else direction = style[`hide_${openFrom}`];

  useEffect(() => {
    destinationRef.current = document.getElementById("overlays");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.scrollTo(0, 0);
  }, [open]);

  if (!mounted || !destinationRef.current) return null;

  const modalClasses = classnames(
    style.modal,
    style[`modal_${openFrom}`],
    direction,
    className
  );
  const backdropClasses = classnames(
    style.backdrop,
    { [style.backdrop_open]: open },
    style[`backdrop_${openFrom}`]
  );

  return createPortal(
    <>
      <div
        className={modalClasses}
        role="dialog"
        aria-label={
          openFrom === "left"
            ? "Form to create invoices"
            : "Confirmation for deleting an invoice"
        }
      >
        {children}
      </div>
      <div className={backdropClasses} onClick={onClose}></div>
    </>,
    destinationRef.current
  );
};
