import { css } from "@emotion/react";
import { Head } from "./head";
import type { FC, ReactNode } from "react";

const idDev = process.env.NODE_ENV !== "production";
const LOCAL_IP_ADDR = process.env.LOCAL_IP_ADDR || "localhost";

export const PageWithHeader: FC<{
  namespace: string;
  seo: ReactNode;
  header: ReactNode;
  children: ReactNode;
}> = ({ header, children, namespace, seo }) => {
  return (
    <html lang="ja">
      <Head seo={seo} />
      <body data-page={namespace}>
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen pointer-events-none -z-1 invisible"
          css={vh}
          data-ref="windowSizeWatcher"
        />
        {header}
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen h-screen pointer-events-none"
          data-ref="glWorld"
        >
          <canvas className="w-screen h-screen" data-ref="canvas"></canvas>
        </div>
        <div
          aria-live="polite"
          className="relative backface-hidden"
          data-ref="main"
          hx-history-elt=""
          id="main"
        >
          <div className="h-full" data-xhr={namespace}>
            {children}
          </div>
        </div>
        <div css={ui}>
          <div className="hidden" data-component="Cursor" />
        </div>
        {idDev && (
          <script
            defer={true}
            src={`http://${LOCAL_IP_ADDR}:3000/src/entry.ts`}
            type="module"
          />
        )}
        {!idDev && <script defer={true} src="/assets/entry.js" type="module" />}
      </body>
    </html>
  );
};

const vh = css`
  height: var(--vh * 100);
  height: 100vh;
`;

const screen = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const ui = css`
  ${screen}
  pointer-events: none;
  z-index: 999;
`;
