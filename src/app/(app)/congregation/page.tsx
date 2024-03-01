'use server';

import { loadCongregation } from '~/actions/congregation/load';
import { Card } from '~/components/commons/card';
import CongregationForm from '~/components/congregation/form';

export default async function CongregationPage() {
  const congregation = await loadCongregation();

  return (
    <Card>
      <CongregationForm congregation={congregation} />
    </Card>
  );
}
