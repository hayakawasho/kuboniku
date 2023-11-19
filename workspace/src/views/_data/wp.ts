import { api } from "@/_foundation/api";
import { searchParamsToString } from "@/_foundation/utils";
import { convertWorkFromCMS } from "@/_models/works/conveter";

const WP_API = "https://wp.kuboniku.com/wp-json/";

module.exports = async () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const [rawWorks, rawProfile] = await Promise.all([
    api.get<any>(
      `${WP_API}wp/v2/posts?${searchParamsToString({
        order: "desc",
        per_page: 99,
      })}`,
      {
        headers,
      }
    ),
    api.get<any>(WP_API + "wp/v2/pages/490", {
      headers,
    }),
  ]);

  return {
    profile: rawProfile.data.content.rendered,
    totalCount: rawWorks.headers.get("x-wp-total"),
    works: rawWorks.data.map((item: any) => convertWorkFromCMS(item)),
  };
};
