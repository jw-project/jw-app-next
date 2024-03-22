'use client';

import type { PropsWithChildren } from 'react';

import { Tab, Tabs } from '~/components/commons/tabs/tabs';
import { TabsCard, TabsWrapper } from '~/components/commons/tabs/tabs-styled';
import { PublisherTabsEnum } from '~/entities/publisher';
import { useTranslation } from '~/hooks/use-translation';

import { usePublisherPage } from './context';

export function PublisherTabs({ children }: PropsWithChildren) {
  const { translate } = useTranslation('routes.people.publishers');
  const { tabSelected } = usePublisherPage();

  return (
    <TabsWrapper className="col-span-2">
      <Tabs>
        <Tab
          selected={tabSelected === PublisherTabsEnum.Information}
          title={translate(`tabs.${PublisherTabsEnum.Information}`).toString()}
          to={PublisherTabsEnum.Information}
        />
        <Tab
          selected={tabSelected === PublisherTabsEnum.Spiritual}
          title={translate(`tabs.${PublisherTabsEnum.Spiritual}`).toString()}
          to={PublisherTabsEnum.Spiritual}
        />
        <Tab
          selected={tabSelected === PublisherTabsEnum.Assignments}
          title={translate(`tabs.${PublisherTabsEnum.Assignments}`).toString()}
          to={PublisherTabsEnum.Assignments}
        />
        <Tab
          selected={tabSelected === PublisherTabsEnum.Records}
          title={translate(`tabs.${PublisherTabsEnum.Records}`).toString()}
          to={PublisherTabsEnum.Records}
        />
        <Tab
          selected={tabSelected === PublisherTabsEnum.Emergency}
          title={translate(`tabs.${PublisherTabsEnum.Emergency}`).toString()}
          to={PublisherTabsEnum.Emergency}
        />
      </Tabs>
      <TabsCard>{children}</TabsCard>
    </TabsWrapper>
  );
}
