'use client';

import { w } from 'windstitch';

import { Icon, type IconOpts } from '~/components/commons/icon';
import { useTranslation } from '~/hooks/use-translation';

import { NewButton } from './buttons';

const EmptyStateContainer = w.div(`
  container
  px-4
  mx-auto
  grid
  justify-items-center
`);

const EmptyStateTitle = w.h2(`
  text-slate-800
  dark:text-slate-100
  font-bold
`);

const EmptyStateParagraph = w.p(`
  mb-6
  text-center
  text-lg
  text-gray-500
`);

export function EmptyState({
  title = 'common.empty-state.title',
  paragraph = 'common.empty-state.description',
  button = 'common.empty-state.button',
  icon = 'add',
}: {
  title?: string;
  paragraph?: string;
  button?: string;
  icon?: IconOpts;
}) {
  const { translate } = useTranslation();

  return (
    <EmptyStateContainer>
      <Icon
        size="icon-xxxx-large"
        icon="inbox"
        className="mb-4 text-gray-300 dark:text-gray-500"
      />
      <EmptyStateTitle>{translate(title)}</EmptyStateTitle>
      <EmptyStateParagraph>{translate(paragraph)}</EmptyStateParagraph>
      <NewButton button={button} icon={icon} mustOpenDrawer />
    </EmptyStateContainer>
  );
}
