import { ResponsiveImage } from "~/_components/ui/responsive-image";
import { formatCloudinaryAPI } from "~/_foundation/cloudinary";
import { cn } from "~/_foundation/utils";
import type { WorkMetadata } from "~/(work)/model";

export const WorkKv: React.FC<{
  mv: WorkMetadata["mv"];
  className: string;
}> = ({ mv, className }) => {
  return (
    <ResponsiveImage
      alt=""
      className={cn("object-cover h-full absolute inset-0 m-auto opacity-40", className)}
      mob={formatCloudinaryAPI(mv["pc"].url, "f_auto,q_auto,w_1440")}
      mobSize={[mv["pc"].width, mv["pc"].height]}
      size={[mv["pc"].width, mv["pc"].height]}
      src={formatCloudinaryAPI(mv["pc"].url, "f_auto,q_auto,w_1440")}
    />
  );
};
