'use client';

import { startTransition } from 'react';

import { Icon } from '~/components/commons/icon';
import { Tooltip } from '~/components/commons/tooltip';
import { useTheme } from '~/hooks/use-theme';

import { changeTheme } from './change-theme.server';

export function ChangeTheme() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const changeHandle = async () => {
    const newTheme = toggleTheme();

    startTransition(() => {
      changeTheme(newTheme);
    });
  };

  return (
    <Tooltip message="Mudar o tema">
      <Icon
        icon={isDark ? 'dark_mode' : 'light_mode'}
        onClick={changeHandle}
        className={isDark ? 'dark:text-white' : 'text-black'}
      />
    </Tooltip>
  );
}
