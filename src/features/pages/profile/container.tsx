import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { transition } from '@/common/animations';
import tw, { css } from 'twin.macro';

interface IProps {
  data: {
    paragraph: string;
  };
}

const Component = (props: IProps) => {
  return (
    <motion.div
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      variants={transition}
      tw="overflow-hidden"
    >
      <h1 tw="sr-only">PROFILE</h1>
      <div css={container}>
        <div css={container__in}>
          <div css={hgroup}>
            <h2 css={heading}>Nagisa Kubo</h2>
            <p>Art Director & Designer</p>
          </div>
          <div
            css={about}
            dangerouslySetInnerHTML={{ __html: props.data.paragraph }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Component;

const container = css`
  ${tw`relative`}
  margin: 0 3rem;
  height: calc(var(--vh) * 100);

  @media (min-width: 640px) {
    ${tw`text-left`}
  }
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

  > p {
    font-size: 1.2rem;
    color: #858585;

    @media (min-width: 640px) {
      font-size: 1.4rem;
    }
  }
`;

const heading = css`
  ${tw`font-bold`}
  font-size: 2.4rem;
  line-height: calc(60 / 24);

  @media (min-width: 640px) {
    font-size: 3rem;
  }
`;

const about = css`
  font-size: 1.1rem;
  line-height: calc(40 / 22);

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }
`;
