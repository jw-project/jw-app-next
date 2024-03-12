import { BaseErrorScreen } from '~/components/error-screen';

import Layout from './(app)/layout';

export default function NotFound() {
  return (
    <Layout>
      <BaseErrorScreen message="" status={404} />
    </Layout>
  );
}
