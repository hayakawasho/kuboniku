import { ResponsiveImage } from "~/_components/ui/responsive-image";
import profileNameImg from "~/assets/profile.png";
import profileNameSpImg from "~/assets/profile_sp.png";

export const ProfileLogo: React.FC = () => {
  return (
    <>
      <img
        alt=""
        className={`absolute top-[50%] left-[50%] h-[1em]
        | text-[31rem] w-[116rem] translate-x-[calc(-50%+7rem)] translate-y-[calc(-100%+0.1em)] opacity-0
        | sp:hidden`}
        data-height={profileNameImg.height}
        data-ref="profileLogo"
        data-src={profileNameImg.src}
        data-width={profileNameImg.width}
        height={profileNameImg.height}
        width={profileNameImg.width}
      />
      <ResponsiveImage
        alt=""
        className={`absolute top-[50%] left-[50%] h-[1em]
        | w-[34.5rem] text-[17rem] translate-x-[calc(-50%+2rem)] translate-y-[calc(-100%-7.5rem)]
        | pc:hidden`}
        mob={profileNameSpImg.src}
        mobSize={[profileNameSpImg.width, profileNameSpImg.height]}
        size={[1, 1]}
        src="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
      />
    </>
  );
};
