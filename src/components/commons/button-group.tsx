'use client';

import { w, type W } from 'windstitch';

import { Icon, type IconOpts } from './icon';
import { Tooltip } from './tooltip';

const ButtonGroupStyled = w.button(
  `
  inline-flex
  items-center
  px-4
  py-2
  text-sm
  font-medium
  border-gray-200
  dark:border-gray-600
  disabled:bg-gray-300
  disabled:text-gray-500
  disabled:cursor-not-allowed
  dark:disabled:bg-gray-800
  dark:disabled:text-gray-600
  enabled:bg-white
  enabled:text-black
  enabled:hover:bg-gray-100
  enabled:active:bg-gray-200
  dark:enabled:bg-gray-700
  dark:enabled:text-white
  dark:enabled:hover:text-white
  dark:enabled:hover:bg-gray-600
  dark:enabled:active:bg-gray-700

`,
  {
    variants: {
      position: {
        start: `
            border
            rounded-l-lg
        `,
        middle: `
            border-t
            border-b
        `,
        end: `
            border
            rounded-r-md
`,
      },
    },
    defaultVariants: { position: 'middle' },
    transient: ['position'],
  },
);

type ButtonGroupStyledType = W.Infer<typeof ButtonGroupStyled>;

export type ButtonGroupProps =
  | {
      text?: string;
      icon: IconOpts;
      tooltip: string;
      disabled?: boolean;
      onClick?: () => void;
    }
  | {
      text: string;
      icon?: IconOpts;
      tooltip?: string;
      disabled?: boolean;
      onClick?: () => void;
    };

export const ButtonGroup = ({
  buttons,
}: {
  buttons: Array<ButtonGroupProps>;
}) => {
  return (
    <div className="relative inline-flex rounded-md shadow-sm" role="group">
      {buttons.map(({ text, tooltip, icon, disabled, onClick }, index) => {
        let position: ButtonGroupStyledType['position'] = 'middle';
        if (index === 0) {
          position = 'start';
        } else if (index === buttons.length - 1) {
          position = 'end';
        }

        return (
          <Tooltip message={tooltip} direction="top" key={index}>
            <ButtonGroupStyled
              position={position}
              disabled={disabled}
              onClick={onClick}
            >
              {icon && (
                <Icon
                  icon={icon}
                  size="icon-x-small"
                  className={`transition-none ${text ? 'mr-1' : ''}`}
                />
              )}
              {text}
            </ButtonGroupStyled>
          </Tooltip>
        );
      })}
    </div>
  );
};
