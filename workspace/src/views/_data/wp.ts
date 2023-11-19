import { api } from "@/_foundation/api";
import { searchParamsToString } from "@/_foundation/utils";
import { convertWorkFromCMS } from "@/_models/works/conveter";
import { validateHasPermalink } from "@/_models/works/validator";
import type { WorkMetadata } from "@/_models/works";

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
    allWorks: rawWorks.data.map((item: any) => convertWorkFromCMS(item)),
    profile: rawProfile.data.content.rendered,
    totalCount: rawWorks.headers.get("x-wp-total"),
    works: rawWorks.data
      .map((item: any) => convertWorkFromCMS(item))
      .filter((item: WorkMetadata) => validateHasPermalink(item)),
  };
};
