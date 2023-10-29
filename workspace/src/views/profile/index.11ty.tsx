import parse from "html-react-parser";
import { renderToStaticMarkup as r } from "react-dom/server";
import * as styles from "./index.css";
import { Header } from "../_components/header";
import { PageWithHeader } from "../_components/page-with-header";
import { Seo } from "../_components/seo";

module.exports = class {
  render(props: any) {
    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="PROFILE" />}
        namespace="PROFILE"
        seo={<Seo permalink="/profile/" title="PROFILE" />}
      >
        <main className="overflow-hidden" data-component="Profile">
          <h1 className="sr-only">PROFILE</h1>
          <div className="relative">
            <i className="icon-logo | sp:hidden" css={styles.logo}></i>
            <i className="icon-logo_sp | pc:hidden" css={styles.logo}></i>
            <div css={styles.container}>
              <div css={styles.container__in}>
                <div css={styles.hgroup}>
                  <h2 css={styles.heading}>Nagisa Kubo</h2>
                  <p>Art Director & Designer</p>
                </div>
                <div css={styles.about}>{parse(props.wp.profile.html)}</div>
              </div>
            </div>
          </div>
        </main>
      </PageWithHeader>
    )}`;
  }
};
