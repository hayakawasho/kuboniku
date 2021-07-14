import { Utils } from '@/foundation/utils';

const PER_PAGE = 10;

const worksListResository = () => {
  const findAll = (data, totalPosts: number) => {
    const works = data.flatMap((item, i) =>
      item.posts.nodes.map((node, j) => {
        return {
          title: node.title,
          slug: node.slug,
          index: Utils.zeroPadding(
            totalPosts - (j + (i + i * (PER_PAGE - 1))),
            2
          ),
          eyecatch: {
            src: node.acf.eyecatch.sourceUrl,
            srcSet: node.acf.eyecatch.srcSet,
          },
        };
      })
    );

    return works;
  };

  return { findAll };
};

export { worksListResository };
