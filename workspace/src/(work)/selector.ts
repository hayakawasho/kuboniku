import dayjs from "dayjs";
import type { WorkMetadata } from ".";

export const selectYear = (data: WorkMetadata) => {
  return dayjs(data.createAt).format("MMMM D, YYYY");
};

export const selectRole = (data: WorkMetadata) => {
  return data.role.join(" / ");
};

export const selectTitle = (data: WorkMetadata) => {
  return data.title;
};
