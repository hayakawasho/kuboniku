import SplitType from "split-type";
import type { SplitTypeOptions } from "split-type";

export const splitTextNode2Words = (
  textNode: HTMLElement,
  params: {
    lineClass?: string;
    tagName?: string;
    types?: string;
    wordClass?: string;
    charClass?: string;
  }
) => {
  const options = {
    charClass: "_c",
    lineClass: "_l",
    tagName: "span",
    types: "words, lines",
    wordClass: "_w",
    ...params,
  };

  const split = new SplitType(textNode, options as SplitTypeOptions);

  return {
    onSplitUpdate: () => split.split(options as SplitTypeOptions),
    split,
  } as const;
};
