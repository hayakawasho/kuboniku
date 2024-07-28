import { mapWorkRole, mapWorkCreateAt } from "~/(work)/model/mapper";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "~/(work)/model";

export const WorkIntro: React.FC<{
  post: WorkMetadata;
}> = ({ post }) => {
  return (
    <div className={Styles.intro}>
      <div className={Styles.intro__info}>
        <dl className={Styles.dl}>
          <dt className={Styles.dt}>Year</dt>
          <dd className={Styles.dd}>{mapWorkCreateAt(post)}</dd>
        </dl>
        <dl className={Styles.dl}>
          <dt className={Styles.dt}>Role</dt>
          <dd className={`${Styles.dd} uppercase`}>{mapWorkRole(post)}</dd>
        </dl>
      </div>
      <div className={Styles.intro__desc}>
        {post.description && <p className={Styles.intro__desc}>{post.description}</p>}
        {post.siteUrl && (
          <a className={Styles.viewLink} data-cursor="scale" href={post.siteUrl} rel="noopener" target="_blank">
            View website
            <div className={Styles.viewLink__line} />
          </a>
        )}
      </div>
    </div>
  );
};
