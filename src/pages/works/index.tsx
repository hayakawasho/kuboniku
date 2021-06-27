import { NextPage } from 'next';
import { Layout } from '~/components/layouts';
import { WorksIndexContainer } from '~/components/pages/works';
import { fetcher } from '~/components/projects';
import { GET_POSTS } from '~/domain/queries/works';

interface IProps {
  data: any;
}

const Component: NextPage<IProps> = props => {
  const initialData = props.data;

  const data = {
    slug: '',
    title: '',
    eyecatch: {},
  };

  return (
    <Layout title="WORKS">
      <WorksIndexContainer {...data} />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const data = await fetcher(GET_POSTS);
  return {
    data,
  };
};

/*
interface IData {
  posts: {
    nodes: TEntryData[];
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
}

interface IProps {
  data: IData;
  total: number;
}

const PER_PAGE = 10;

const Component: NextPage<IProps> = props => {
  const initialData = props.data;
  const totalPost = props.total;
  const totalPage = totalPost / PER_PAGE;
  const loadCount = useRef(1);
  // const [result, status, {  }] = useRequestWorks()
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    index => getQuery(index * PER_PAGE),
    fetcher,
    {
      revalidateOnFocus: false,
      initialData: [initialData],
    }
  );
  const chunkedPostData = data ? [].concat(...data) : [];
  const [entryLoaderRef, inView] = useInView({
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    if (inView && !isValidating && loadCount.current < totalPage) {
      setSize(size + 1).then(() => loadCount.current++);
    }
  }, [inView]);

  return (
    <Layout title="WORKS">
      <WorksContainer />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {

};

*/
