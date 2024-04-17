'use client';

import type { PropsWithChildren } from 'react';

import { TabsCard, TabsWrapper } from '~/components/commons/tabs/styled';
import { Tab, Tabs } from '~/components/commons/tabs/tabs';
import { PublisherTabsEnum } from '~/entities/publisher';
import { useTranslation } from '~/hooks/use-translation';

import { usePublisherPage } from './context';

export function PublisherTabs({ children }: PropsWithChildren) {
  const { translate } = useTranslation('routes.people.publishers');
  const { tabSelected, tabsDisabled } = usePublisherPage();

  return (
    <TabsWrapper className="col-span-2">
      <Tabs>
        <Tab
          selected={tabSelected === PublisherTabsEnum.Information}
          title={translate(`tabs.${PublisherTabsEnum.Information}`).toString()}
          to={PublisherTabsEnum.Information}
          disabled={tabsDisabled}
        />
        <Tab
          selected={tabSelected === PublisherTabsEnum.Spiritual}
          title={translate(`tabs.${PublisherTabsEnum.Spiritual}`).toString()}
          to={PublisherTabsEnum.Spiritual}
          disabled={tabsDisabled}
        />
        <Tab
          selected={tabSelected === PublisherTabsEnum.Assignments}
          title={translate(`tabs.${PublisherTabsEnum.Assignments}`).toString()}
          to={PublisherTabsEnum.Assignments}
          disabled={tabsDisabled}
        />
        <Tab
          selected={tabSelected === PublisherTabsEnum.Records}
          title={translate(`tabs.${PublisherTabsEnum.Records}`).toString()}
          to={PublisherTabsEnum.Records}
          disabled={tabsDisabled}
        />
        <Tab
          selected={tabSelected === PublisherTabsEnum.Emergency}
          title={translate(`tabs.${PublisherTabsEnum.Emergency}`).toString()}
          to={PublisherTabsEnum.Emergency}
          disabled={tabsDisabled}
        />
      </Tabs>
      <TabsCard>{children}</TabsCard>
    </TabsWrapper>
  );
}
