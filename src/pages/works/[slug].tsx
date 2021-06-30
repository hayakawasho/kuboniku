import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { fetcher } from '@/components/projects';
import { IRawWorksId } from '@/domain/works/worksEntity';
import { GET_POST } from '@/domain/works/worksDetail.gql';
import { WorksDetailContainer } from '@/components/pages/works';
import { useRequest } from '@/components/projects';

// interface IProps {
//   data: IRawWorksId;
//   url: string;
// }

const Component: NextPage = (props: any) => {
  const initialData = props.data;
  const variables = {
    slug: props.path
  };
  const [result] = useRequest<IRawWorksId>(GET_POST, {
    deps: [variables],
    initialData
  });

  const newProps = {
    title: result.post.title,
    category: result.post.acf.category.name,
    eyecatch: {
      src: result.post.acf.eyecatch.sourceUrl,
      srcSet: result.post.acf.eyecatch.srcSet,
      mobile: result.post.acf.eyecatchMobile?.sourceUrl
    },
    date: new Date(result.post.date),
    role: result.post.acf.role.map(i => i.name),
    viewWebsite: result.post.acf.url,
    gallery: result.post.acf.gallery?.map(i => {
      return {
        width: i.mediaDetails.width,
        height: i.mediaDetails.height,
        src: i.sourceUrl,
        srcSet: i.srcSet
      }
    }),
    prev: {
      slug: result.post.previous.slug,
      title: result.post.previous.title,
      eyecatch: {
        src: result.post.previous.acf.eyecatch.sourceUrl,
        srcSet: result.post.previous.acf.eyecatch.srcSet,
        mobile: result.post.previous.acf.eyecatchMobile?.sourceUrl,
      },
    },
  };

  return (
    <Layout title="WORKS">
      <WorksDetailContainer {...newProps} />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async ({ query }) => {
  const variables = {
    slug: query?.slug ?? ''
  };
  const data = await fetcher<IRawWorksId>(GET_POST, variables);

  return {
    data,
    path: query?.slug,
  };
};
