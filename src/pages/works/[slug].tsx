import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Layout } from '~/components/layouts';
import { WorksDetailContainer } from '~/components/pages/works';
import { fetcher } from '~/components/projects';
import { GET_POST } from '~/domain/queries/worksDetail';

interface IProps {
  data: any;
  // path: string;
}

const Component: NextPage<IProps> = props => {
  const initialData = props.data;

  const data = {
    title: '',
    category: '',
    eyecatch: {},
    role: [],
    url: '',
    gallery: [],
    prev: {
      slug: '',
      title: '',
      eyecatch: {
        src: '',
        srcSet: '',
        mobile: '',
      },
    },
  };

  return (
    <Layout title="WORKS">
      <WorksDetailContainer {...data} />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async ({ query }) => {
  const variables = { slug: query?.slug ?? '' };
  const data = await fetcher(GET_POST, variables);

  return {
    data,
    path: query?.slug,
  };
};

// export async function getServerSideProps({ params }) {
//   const variables = { slug: params?.slug ?? '' };
//   const data = await fetcher(GET_POST, variables);
//
//   return {
//     props: {
//       data,
//       path: params?.slug,
//     },
//   };
// }

/*
interface IProps {
  data: IWorks;
  path: string;
}

const Component = props => {
  const initialData = props.data;
  const variables = { slug: props.path };
  const { data } = useSWR<IWorks>([GET_POST, variables], fetcher, {
    initialData,
  });
  const { title, acf, date, previous } = data.post;
  const dispatch = useDispatch();
  const scrollBuffer = useSelector(scrollBufferSelector);
  const { scrollYProgress } = useViewportScroll();
  const inputRange = [0, 1];
  const outputRange = [scrollBuffer, 1];
  const progressVal = useTransform(scrollYProgress, inputRange, outputRange);
  const { val, onScroll } = useSkewScroll(scrollYProgress.get());

  // const [,] = useWorksValue(variables);
};

export default Component;

*/
