'use client';

import { useTranslation } from '~/hooks/use-translation';

import { Button } from '../button';
import { Icon, type IconProps } from '../icon';
import { useModal } from './';
import {
  ModalAlertCloseButtonStyled,
  ModalAlertTextStyled,
  ModalAlertWrapperButtonStyled,
  ModalContentStyled,
} from './style';
import type { AlertModalProps, ModalProps, ModalSeverity } from './types';

const modalIsAlert = (
  props: ModalProps | AlertModalProps,
): props is AlertModalProps => {
  return 'text' in props;
};

const modalSeverityConfigs: Record<ModalSeverity, IconProps> = {
  success: {
    icon: 'check_circle',
    className: 'text-green-500',
  },
  info: {
    icon: 'info',
    className: 'text-blue-500',
  },
  warning: {
    icon: 'warning',
    className: 'text-yellow-500',
  },
  error: {
    icon: 'error',
    className: 'text-red-500',
  },
  question: {
    icon: 'help',
    className: 'text-blue-500',
  },
  'question-warning': {
    icon: 'help',
    className: 'text-yellow-500',
  },
};

export const ModalContent = () => {
  const props = useModal();
  const { translate } = useTranslation('common');

  if (modalIsAlert(props)) {
    const internalOnConfirm = () => {
      props.onConfirm();
      props.closeModal();
    };

    const internalOnCancel = () => {
      props.onCancel?.();
      props.closeModal();
    };

    return (
      <>
        <ModalAlertCloseButtonStyled
          type="button"
          data-modal-hide="popup-modal"
          onClick={internalOnCancel}
        >
          <Icon icon="close" className="transition-none" />
        </ModalAlertCloseButtonStyled>
        <ModalContentStyled>
          <Icon
            size="icon-xxx-large"
            {...modalSeverityConfigs[props.severity]}
          />
          <ModalAlertTextStyled>{props.text}</ModalAlertTextStyled>
          <ModalAlertWrapperButtonStyled>
            <Button buttonstyle="danger" onClick={internalOnConfirm}>
              {translate('yes')}
            </Button>
            <Button buttonstyle="secondary" onClick={internalOnCancel}>
              {translate('no')}
            </Button>
          </ModalAlertWrapperButtonStyled>
        </ModalContentStyled>
      </>
    );
  }

  return <></>;
};
