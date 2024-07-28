import dayjs from "dayjs";
import type { WorkMetadata } from ".";

export const mapWorkCreateAt = (data: WorkMetadata) => {
  return dayjs(data.createAt).format("MMMM D, YYYY");
};

export const mapWorkRole = (data: WorkMetadata) => {
  return data.role.join(" / ");
};

export const mapWorkTitle = (data: WorkMetadata) => {
  return data.title;
};
