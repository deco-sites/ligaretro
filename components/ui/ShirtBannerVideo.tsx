import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useState } from "preact/hooks";

export interface Props {
  banner: {
    image: string;
    alt: string;
  };
  videoUrl: string;
}

function ShirtBannerVideo({ banner, videoUrl }: Props) {
  const [hideBanner, setHideBanner] = useState(false);
  const [url, setUrl] = useState(videoUrl);

  const handleClick = () => {
    setHideBanner(true);
    setUrl(videoUrl + "&autoplay=1");
  };

  return (
    <>
      <div
        onClick={handleClick}
        class={`relative text-white cursor-pointer hover:brightness-110 ${
          hideBanner && "hidden"
        }`}
      >
        <Icon id="Play" size={48} class="absolute right-6 bottom-6" />
        <Image
          width={1360}
          height={678}
          src={banner.image}
          alt={banner.alt}
        />
      </div>
      <div
        class={`flex justify-center ${
          !hideBanner && "hidden"
        } aspect-w-16 aspect-h-8 h-[678px] w-[1360px] max-w-[90vw]`}
      >
        <iframe
          class="w-full h-full"
          src={url}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        >
        </iframe>
      </div>
    </>
  );
}

export default ShirtBannerVideo;
