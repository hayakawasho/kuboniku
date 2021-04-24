import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { transition } from '~/foundation/animations';
import Utils from '~/foundation/utils/Utils';
import Layout from '~/components/layouts/Layout';
import Seo from '~/components/Seo';
import tw, { css } from 'twin.macro';

const Component: React.FC = () => {
  return (
    <Layout>
      <Seo title="PROFILE" />
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
        css={container}
      >
        <div css={container__in}>
          <div css={hgroup}>
            <h1>Nagisa Kubo</h1>
            <p>Art Director & Designer</p>
          </div>
          <p css={text}>
            1989年10月5日生まれ。京丹後という海近くで生まれる。辻製菓専門学校卒。
            <br />
            パティシエとして東京に就職するもその3年後、2013年より都内のweb制作会社へ就職。そして2016年、今の株式会社パノラマに就職。主にアートディレクション、web/logoデザインの制作を担う。自分の武器としてはスピードに加え、コーポレートサイト/ブランドサイト/ゲームサイトなど幅広い分野にて100%の課題解決を目指したデザインをお客様へ提供すること。
            <br />
            お肉がとにかく好き。焼肉を食べることと、お笑い、アニメを見ることがライフワーク。
          </p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Component;

const container = css`
  ${tw`relative`}
  margin: 0 3rem;
  height: calc(var(--vh) * 100);

  @media (--pc) {
    ${tw`text-left`}
  }
`;

const container__in = css`
  ${tw`absolute right-0 text-right`}
  bottom: 10rem;

  @media (--pc) {
    ${tw`left-1/2 text-left`}
  }
`;

const hgroup = css`
  margin-bottom: 2.8rem;
  font-family: var(--font-roboto);

  > h1 {
    ${tw`font-bold`}
    font-size: 2.4rem;
    line-height: calc(60 / 24);

    @media (--pc) {
      font-size: 3rem;
    }
  }

  > p {
    font-size: 1.2rem;
    color: #858585;

    @media (--pc) {
      font-size: 1.4rem;
    }
  }
`;

const text = css`
  font-size: 1.1rem;
  line-height: calc(40 / 22);

  @media (--pc) {
    font-size: 1.3rem;
  }
`;
