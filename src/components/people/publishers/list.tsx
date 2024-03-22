'use client';

import Link from 'next/link';

import { Card } from '~/components/commons/card';
import { PublisherTabsEnum } from '~/entities/publisher';

import { usePublisherPage } from './context';

export function PublisherList() {
  const { publishers, tabSelected } = usePublisherPage();

  return (
    <Card padded="sm" className="col-span-1">
      {publishers.map((publisher) => (
        <Link
          key={publisher.id}
          href={`/people/publishers/${publisher.id}/${tabSelected || PublisherTabsEnum.Information}`}
        >
          {publisher.name}
        </Link>
      ))}
    </Card>
  );
}
