import type { PropsWithChildren } from 'react';

export type ModalSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'question'
  | 'question-warning';

export type ModalRefProps = {
  isOpen: boolean;
  openModal: () => void;
};

export type AlertModalProps = {
  children?: never;
  //
  text: string;
  severity: ModalSeverity;
  onConfirm: () => void;
  onCancel?: () => void;
};

export type ModalProps = PropsWithChildren<{
  text?: never;
  severity?: never;
  //
  onConfirm: () => void;
  onCancel?: () => void;
}>;

export type ModalContextProps = (AlertModalProps | ModalProps) & {
  openModal: () => void;
  closeModal: () => void;
};
