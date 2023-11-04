import parse from "html-react-parser";
import { renderToStaticMarkup as r } from "react-dom/server";
import * as styles from "./index.css";
import { Header } from "../_components/header";
import { PageWithHeader } from "../_components/page-with-header";
import { Seo } from "../_components/seo";

class Component {
  render(props: any) {
    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="PROFILE" />}
        namespace="PROFILE"
        seo={<Seo permalink="/profile/" prepend={<></>} title="Profile" />}
      >
        <main className="overflow-hidden" data-component="Profile">
          <h1 className="sr-only">Profile</h1>
          <div className="relative">
            <i className="icon-logo | sp:hidden" css={styles.logo}></i>
            <i className="icon-logo_sp | pc:hidden" css={styles.logo}></i>
            <div css={styles.container}>
              <div css={styles.container__in}>
                <h2 className="mb-[.8rem] pc:mb-[.3rem]" css={styles.heading}>
                  Nagisa Kubo
                </h2>
                <p className="mb-[2.4rem] pc:mb-[3rem]" css={styles.sub}>
                  Art Director & Designer
                </p>
                <div css={styles.about}>{parse(props.wp.profile)}</div>
              </div>
            </div>
          </div>
        </main>
      </PageWithHeader>
    )}`;
  }
}

module.exports = Component;
