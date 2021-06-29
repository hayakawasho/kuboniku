import React from 'react';
import { motion } from 'framer-motion';
import { transition } from '~/foundation/animations';
import tw, { css } from 'twin.macro';

const PageContainer = () => {
  return (
    <motion.div
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      variants={transition}
      tw="overflow-hidden"
    >
      <div css={container}>
        <div css={name}>
          <picture>
            <source media="(max-width: 639px)" srcSet="/name_sp.png 2x" />
            <img src="/name.png" alt="" decoding="async" />
          </picture>
        </div>
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
      </div>
    </motion.div>
  );
};

export default PageContainer;

const container = css`
  ${tw`relative`}
  margin: 0 3rem;
  height: calc(var(--vh) * 100);

  @media (min-width: 640px) {
    ${tw`text-left`}
  }
`;

const name = css`
  ${tw`absolute top-0 left-0`}
  width: calc(69rem / 2);
  width: calc(100% + 3rem);
  margin-top: 8rem;
  animation: gradient 3.5s linear infinite;
  background: linear-gradient(
    90deg,
    #ab6bff,
    #9ad5f9 15%,
    #575df0 35%,
    #ab6bff 50%,
    #9ad5f9 65%,
    #575df0 85%,
    #ab6bff
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  backface-visibility: hidden;
`;

const container__in = css`
  ${tw`absolute right-0 text-right`}
  bottom: 10rem;
  z-index: 2;

  @media (min-width: 640px) {
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

    @media (min-width: 640px) {
      font-size: 3rem;
    }
  }

  > p {
    font-size: 1.2rem;
    color: #858585;

    @media (min-width: 640px) {
      font-size: 1.4rem;
    }
  }
`;

const text = css`
  font-size: 1.1rem;
  line-height: calc(40 / 22);

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }
`;
