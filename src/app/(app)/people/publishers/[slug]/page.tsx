'use server';

import { redirect } from 'next/navigation';

import { PublisherTabsEnum } from '~/entities/publisher';

export default async function PublisherPage({
  params,
}: {
  params: { slug: string };
}) {
  return redirect(
    `/people/publishers/${params.slug}/${PublisherTabsEnum.Information}`,
  );
}
