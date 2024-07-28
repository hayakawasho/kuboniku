import { mapWorkTitle } from "~/(work)/model/mapper";
import { ResponsiveImage } from "~/_components/ui/responsive-image";
import { formatCloudinaryAPI } from "~/_foundation/cloudinary";
import { zeroPadding } from "~/_foundation/utils";
import Styles from "./style.module.scss";
import type { WorkMetadata } from "~/(work)/model";

export const WorkKv: React.FC<{
  post: WorkMetadata;
  projectNumber: number;
}> = ({ post, projectNumber }) => {
  return (
    <div className={Styles.kv} data-ref="kv">
      <div className={Styles.kv__cont}>
        <p className={Styles.project}>
          {zeroPadding(projectNumber)}
          <span className="ml-[.8rem]">Project</span>
        </p>
        <h1 className={Styles.heading}>{mapWorkTitle(post)}</h1>
        <p className={Styles.sub}>
          <span className="inline-block origin-right">{post.category}</span>
        </p>
      </div>
      <ResponsiveImage
        alt=""
        className="object-cover h-full absolute inset-0 m-auto opacity-40"
        mob={formatCloudinaryAPI(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
        mobSize={[post.mv["pc"].width, post.mv["pc"].height]}
        size={[post.mv["pc"].width, post.mv["pc"].height]}
        src={formatCloudinaryAPI(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
      />
    </div>
  );
};
