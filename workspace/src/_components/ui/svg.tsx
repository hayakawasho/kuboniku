import type { FC } from "react";

export const Svg: FC<{
  name: string;
  className?: string;
}> = ({ className = "", name }) => {
  return (
    <>
      <svg
        className={`${className} w-full h-full pointer-events-none absolute top-0 left-0 fill-current`}
        aria-hidden="true"
      >
        <use xlinkHref={`#${name}`}></use>
      </svg>
    </>
  );
};
