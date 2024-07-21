import dayjs from "dayjs";
import type { WorkMetadata } from ".";

export const selectWorkCreateAt = (data: WorkMetadata) => {
  return dayjs(data.createAt).format("MMMM D, YYYY");
};

export const selectWorkRole = (data: WorkMetadata) => {
  return data.role.join(" / ");
};

export const selectWorkTitle = (data: WorkMetadata) => {
  return data.title;
};
