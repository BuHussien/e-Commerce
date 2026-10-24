"use client";

import { Button } from "@components/tailgrids/core/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/tailgrids/core/dialog";
import { Backdrop, OverlayWrapper } from "@components/tailgrids/core/overlay";
import type { ReactNode } from "react";

interface IProps {
  title: string;
  children: ReactNode;
  cancelBtnTxt?: string;
  confirmBtnTxt?: string;
  onConfirm?: () => void;
}

const Modal = ({
  title,
  children,
  cancelBtnTxt = "Cancel",
  confirmBtnTxt = "Confirm",
  onConfirm,
}: IProps) => {
  return (
    <OverlayWrapper>
      <Button className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-700 active:scale-[0.98]">
        {title}
      </Button>

      <Backdrop>

        <Dialog className="w-full max-w-md overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-2xl">
          <DialogHeader className="border-b border-rose-100/60 bg-rose-50/40 px-5 py-3.5">
            <DialogTitle className="text-base font-bold text-slate-900">
              {title}
            </DialogTitle>
          </DialogHeader>

          <DialogBody className="p-5 text-sm leading-6 text-slate-600">
            {children}
          </DialogBody>

          <DialogFooter className="gap-2.5 border-t border-slate-100 bg-slate-50/50 px-5 py-3">
            <DialogClose
              autoFocus
              appearance="outline"
              className="rounded-xl border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {cancelBtnTxt}
            </DialogClose>

            <Button
              onClick={onConfirm}
              className="rounded-xl bg-pink-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-pink-700 active:scale-[0.98]"
            >
              {confirmBtnTxt}
            </Button>
          </DialogFooter>
        </Dialog>
      </Backdrop>
    </OverlayWrapper>
  );
};

export default Modal;
