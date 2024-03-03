'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useTranslation } from '~/hooks/use-translation';

import { Button } from '../button';
import type { IconOpts } from '../icon';

export function NewButton({
  button = 'common.empty-state.button',
  icon = 'add',
}: {
  button?: string;
  icon?: IconOpts;
  mustOpenDrawer?: boolean;
}) {
  const { translate } = useTranslation();
  const pathname = usePathname();
  const { push } = useRouter();

  const goTo = () => {
    push(`${pathname}/new`);
  };

  return (
    <Button onClick={goTo} icon={icon}>
      {translate(button)}
    </Button>
  );
}
