import { Layout } from '@/app/components/layout';
import { ProfilePresenter } from '@/domain/profile';

const Component = () => {
  return (
    <Layout title="PROFILE">
      <ProfilePresenter />
    </Layout>
  );
};

export default Component;
