'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from 'react';

import { useIsMobile } from '~/hooks/use-is-mobile';
import { useOutsideClick } from '~/hooks/use-outside-click';
import { useTheme } from '~/hooks/use-theme';

import { ModalContent } from './modal';
import {
  ModalBodyWrapperStyled,
  ModalFullWrapperStyled,
  ModalStyled,
} from './style';
import type {
  AlertModalProps,
  ModalContextProps,
  ModalProps,
  ModalRefProps,
} from './types';

const ModalContext = createContext<ModalContextProps>({
  children: null,
  openModal: () => {},
  closeModal: () => {},
  onConfirm: () => {},
  onCancel: () => {},
});

export const useModal = () => {
  return useContext(ModalContext);
};

export const Modal = forwardRef(
  (props: ModalProps | AlertModalProps, ref: Ref<ModalRefProps>) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const isMobile = useIsMobile();
    const { backdropIsShow, showBackdrop, hideBackdrop } = useTheme();

    const openModal = () => {
      showBackdrop();
      setModalIsOpen(true);
    };

    const closeModal = () => {
      hideBackdrop();
      setModalIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      isOpen: modalIsOpen,
      openModal,
    }));

    useOutsideClick(modalRef, closeModal, [modalIsOpen]);

    useEffect(() => {
      if (modalIsOpen) {
        showBackdrop();
      }
    }, [backdropIsShow]);

    if (!modalIsOpen) {
      return null;
    }

    return (
      <ModalContext.Provider value={{ ...props, openModal, closeModal }}>
        <ModalFullWrapperStyled ref={modalRef} leftmargin={!isMobile}>
          <ModalBodyWrapperStyled visible={modalIsOpen}>
            <ModalStyled>
              <ModalContent />
            </ModalStyled>
          </ModalBodyWrapperStyled>
        </ModalFullWrapperStyled>
      </ModalContext.Provider>
    );
  },
);

Modal.displayName = 'Modal';
