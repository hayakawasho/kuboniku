import type { WorkMetadata } from ".";

export const validateHasPermalink = (data: WorkMetadata) => {
  return !!data.screenshots;
};
