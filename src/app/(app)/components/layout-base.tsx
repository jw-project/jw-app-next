import type { PropsWithChildren } from "react";
import { BodyMargin } from "~/components/body/body-margin";
import { Navbar } from "~/components/navbar/navbar";
import { Transition } from "./transition";
import { Menu } from "./menu/menu.server";

export function BaseLayout({ children }: PropsWithChildren) {
  const { show } = { show: true }; //useTransition();

  return (
    <>
      {/* <Navbar /> */}
      <Menu />
      <Transition>{children}</Transition>
    </>
  );
}
