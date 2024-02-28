import Link from "next/link";
import { w } from "windstitch";

export const Aside = w.aside(
  `
    w-60
    -left-60
    fixed
    top-0
    z-30
    h-screen
    bg-gray-800
    dark:bg-gray-900
    transition-all
`,
  {
    variants: {
      expanded: (expanded: boolean) => (expanded ? "left-0" : "lg:left-0"),
    },
    transient: ["expanded"],
  },
);

export const MenuHeader = w.div(`
    flex
    flex-row
    w-full
    bg-gray-900
    text-white
    flex-1
    px-3
    h-14
    items-center
`);

export const MenuLabel = w.p(`
    p-3
    text-xs
    uppercase
    text-gray-400
`);

export const IconMenuStyled = w.span(`
    w-12
    flex
    justify-center
    text-gray-400
`);

export const LinkMenuStyled = w(Link, {
  className: `
    py-2
    flex
    transition-colors
    text-gray-300
    hover:bg-gray-700
    dark:hover:bg-gray-800
`,
  variants: {
    selected: (selected: boolean) =>
      selected ? "bg-gray-700 dark:bg-gray-800" : "",
  },
  transient: ["selected"],
});

export const LinkLabelMenuStyled = w.span(``);
