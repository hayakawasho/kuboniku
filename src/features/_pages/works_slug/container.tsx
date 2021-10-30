import { format } from 'date-fns';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { ProgressBar, Picture, Img } from '@/common/components';
import { useArrayRef } from '@/common/hooks';
import { IMetaWork } from '@/domain/works';
import { useSkewOnScroll } from '@/features/scroll';

type IProps = {
  prev?: {
    slug: IMetaWork['slug'];
    title: IMetaWork['title'];
    eyecatch: IMetaWork['eyecatch'];
  };
} & IMetaWork;

const Component = (props: IProps) => {
  const [skewRefs, setSkewRef] = useArrayRef();

  useSkewOnScroll({
    refs: skewRefs,
  });

  const { scrollYProgress } = useViewportScroll();
  // const scrollBuffer = useSelector(scrollBufferSelector);
  const scrollBuffer = 0;
  const inputRange = [0, 1];
  const outputRange = [scrollBuffer, 1];
  const progressValue = useTransform(scrollYProgress, inputRange, outputRange);

  return (
    <>
      <div className="wkslug-kv relative w-full overflow-hidden block md:h-screen">
        <div
          className="wkslug-kv__cont absolute top-1/2 left-0 w-full"
          ref="setSkewRef"
        >
          <h1 className="font-semibold">
            <div className="inline-block overflow-hidden">
              <span className="inline-block origin-right">{props.title}</span>
            </div>
          </h1>
          <p className="wkslug-sub overflow-hidden">
            <span className="inline-block origin-right">
              {props.category}
              <i className="icon-arrow-right" />
            </span>
          </p>
        </div>
        <Picture src={props.eyecatch.src} mobile={props.eyecatch.mobile} />
        <div className="wkslug-kv__scrollDown absolute left-1/2 overflow-hidden transform -translate-x-1/2 font-bold">
          <div className="relative w-full h-full overflow-hidden">
            <div className="wkslug-kv__scrollLabel">scroll</div>
          </div>
          <i className="icon-arrow-down block text-center" />
        </div>
      </div>
      <div className="wkslug-worksContent" ref="setSkewRef">
        <div className="wkslug-intro">
          <div className="wkslug-intro__info">
            <dl className="wkslug-dl">
              <dt className="wkslug-dt">Year :</dt>
              <dd className="wkslug-dd">
                {format(props.createAt, 'MMMM d, yyyy')}
              </dd>
            </dl>
            <dl className="wkslug-dl">
              <dt className="wkslug-dt">Role :</dt>
              <dd className="wkslug-dd">
                <ul>
                  {props.role &&
                    props.role.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </dd>
            </dl>
          </div>
          {props.viewWebsite && (
            <a
              className="wkslug-intro__viewLink"
              href={props.viewWebsite}
              target="_blank"
              rel="noopener"
            >
              View website
              <div className="wkslug-intro__viewLink__hr" />
            </a>
          )}
        </div>
        {props.gallery && (
          <ul className="wkslug-intro__captchaList">
            {props.gallery.map((item, i) => {
              const aspect = Math.round((item.height / item.width) * 100);
              const css = {
                '--aspect': `${aspect}%`,
                backgroundColor: `transparent`,
              };
              return (
                <li className="relative" key={i}>
                  <div className="c-aspect" style={css} />
                  <div className="absolute w-full h-full top-0 left-0">
                    <Img
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={item.height}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {props.prev && (
          <aside className="wkslug-kv wkslug-kv--next">
            <Link scroll={false} href={'/works/' + props.prev.slug}>
              <a className="absolute w-full h-full top-0 left-0 z-10" />
            </Link>
            <div className="wkslug-kv__cont">
              <h2 className="wkslug-heading">Next Project</h2>
              <p className="wkslug-sub">
                {props.prev.title}
                <i className="icon-arrow-right" />
              </p>
            </div>
            <Picture
              src={props.prev.eyecatch.src}
              mobile={props.prev.eyecatch.mobile}
            />
          </aside>
        )}
      </div>
      {/*
        <ProgressBar
        bar={
          <div className="c-progressBar">
            <motion.span
              className="c-progressBar__l"
              style={{ scaleY: progressValue }}
            />
          </div>
        }
      /> */}
    </>
  );
};

export default Component;
