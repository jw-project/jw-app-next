import type { ComponentProps, PropsWithChildren } from "react";

import { w, type W } from "windstitch";

import { Icon, type IconOpts } from "./icon";

const ButtonStyled = w.button(
  `
    border
    cursor-pointer
    justify-center
    px-5
    py-2.5
    text-center
    whitespace-nowrap
    inline-flex
    text-sm
    font-medium
    rounded-lg
    focus:outline-none
    disabled:opacity-50
    disabled:cursor-not-allowed
`,
  {
    variants: {
      buttonstyle: {
        primary: `
          bg-blue-500
          dark:bg-blue-400
          border-blue-500
          dark:border-blue-400
          text-white
          enabled:hover:bg-blue-600
          enabled:hover:border-blue-600
          enabled:active:bg-blue-700
          enabled:hover:dark:bg-blue-500
          enabled:hover:dark:border-blue-500
          enabled:active:dark:bg-blue-400
        `,
        secondary: `
          text-gray-500
          bg-white
          enabled:hover:bg-gray-100
          enabled:border-gray-200
          enabled:hover:text-gray-900
          enabled:active:bg-gray-200
          enabled:dark:bg-gray-700
          enabled:dark:text-gray-300
          enabled:dark:border-gray-500
          enabled:dark:hover:text-white
          enabled:dark:hover:bg-gray-600
          enabled:dark:active:bg-gray-500
        `,
        danger: `
          bg-red-600
          border-red-600
          text-white
          enabled:hover:bg-red-800
          enabled:hover:border-red-800
          enabled:active:bg-red-700
`,
      },
    },
    defaultVariants: { buttonstyle: "primary" },
  },
);

type ButtonStyledType = W.Infer<typeof ButtonStyled>;

export const Button = ({
  buttonstyle = "primary",
  icon,
  children,
  ...props
}: PropsWithChildren<
  ComponentProps<"button"> & ButtonStyledType & { icon?: IconOpts }
>) => {
  const iconColors = {
    primary: "text-white dark:text-black",
    secondary: "text-gray-700 dark:text-gray-300",
    danger: "text-white dark:text-black",
  };

  return (
    <ButtonStyled buttonstyle={buttonstyle} {...props}>
      {icon && (
        <Icon
          icon={icon}
          className={`w-5 h-5 me-2 ${iconColors[buttonstyle]}`}
          size="icon-medium"
        />
      )}
      {children}
    </ButtonStyled>
  );
};
