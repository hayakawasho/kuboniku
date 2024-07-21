import { ResponsiveImage } from "~/_components/ui/responsive-image";
import { formatCloudinaryAPI } from "~/_foundation/cloudinary";
import type { WorkMetadata } from "~/(work)/model";

export const WorkScreenshots: React.FC<{
  screenshots: WorkMetadata["screenshots"];
}> = ({ screenshots }) => {
  return (
    <ul>
      {screenshots!.map((item, index: number) => {
        return (
          <li className="mb-[2rem] pc:mb-[6rem]" key={index}>
            <ResponsiveImage
              alt=""
              className="w-full"
              mob={formatCloudinaryAPI(item.url, "f_auto,q_auto,w_750")}
              mobSize={[item.width, item.height]}
              size={[item.width, item.height]}
              src={formatCloudinaryAPI(item.url, "f_auto,q_auto,w_1440")}
            />
          </li>
        );
      })}
    </ul>
  );
};
