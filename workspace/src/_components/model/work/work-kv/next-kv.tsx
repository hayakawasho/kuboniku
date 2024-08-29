import { mapWorkTitle } from "~/(work)/model/mapper";
import { Link } from "~/_components/ui/link";
import { ResponsiveImage } from "~/_components/ui/responsive-image";
import { formatCloudinary } from "~/_foundation/cloudinary";
import Styles from "./style.module.scss";
import type { WorkMetadata } from "~/(work)/model";

export const WorkNextKv: React.FC<{
  post: WorkMetadata;
}> = ({ post }) => {
  return (
    <aside className={`${Styles.kv} !h-screen`}>
      <div className="h-full absolute inset-0 m-auto z-10">
        <Link className={Styles.kv__cont} data-cursor="scale" to={`/work/${post.slug}/`}>
          <h2 className={Styles.heading}>Next Project</h2>
          <p className={Styles.sub}>{mapWorkTitle(post)}</p>
        </Link>
        <ResponsiveImage
          alt=""
          className="object-cover h-full absolute inset-0 m-auto opacity-40 saturate-0 brightness-[0.8]"
          mob={formatCloudinary(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
          mobSize={[post.mv["pc"].width, post.mv["pc"].height]}
          size={[post.mv["pc"].width, post.mv["pc"].height]}
          src={formatCloudinary(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
        />
      </div>
    </aside>
  );
};
