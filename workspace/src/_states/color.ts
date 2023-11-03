import { ref } from "lake";
import { map } from "nanostores";

type Parameters = {
  code: string;
};

const themeColor = map<Parameters>({
  code: "#1793a9",
});

export const themeColorGetters = () => themeColor.get();
export const themeColorMutators = (update: Parameters) =>
  themeColor.set(update);

export const themeColorRef = ref(themeColor);

export const themeColorCodeWatch = (callback: (code: string) => void) => {
  themeColor.subscribe((value) => {
    callback(value.code);
  });
};
