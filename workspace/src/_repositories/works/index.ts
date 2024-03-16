import axios from "redaxios";
import { convertWorkFromCMS } from "./converter";
import type { WorkMetadata } from "../../_components/works";

export const createWorksRepository = () => ({
  findMany: async (
    q: any
  ): Promise<{
    totalCount: number;
    works: WorkMetadata[];
  }> => {
    const res = await axios<any>({
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      params: {
        ...q,
      },
      url: `https://wp.kuboniku.com/wp-json/wp/v2/posts`,
    });

    return {
      totalCount: Number(res.headers.get("x-wp-total")),
      works: res.data.map(convertWorkFromCMS),
    };
  },
});
