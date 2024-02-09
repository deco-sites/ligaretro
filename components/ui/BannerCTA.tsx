import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  image: Banner;
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

const DEFAULT_PROPS = {
  image: {
    alt: "/feminino",
    action: {
      href: "https://www.deco.cx/",
      label: "deco.cx",
      title: "Demo Store",
    },
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/24278f9e-412d-4a8a-b2d3-57353bb1b368",
    desktop:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/afa2c07c-74f4-496d-8647-5cc58f48117b",
  },
  preload: true,
};

function BannerItem(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <div class="relative w-full sm:mt-8 mb-8">
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={360}
          height={600}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={480}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
      {action && (
        <div class="absolute h-min top-0 bottom-0 m-auto left-0 right-0 max-h-min max-w-[560px] flex flex-col gap-4 p-4 items-center">
          <span class="text-3xl font-medium text-base-100 text-center">
            {action.title}
          </span>
          <Button class="btn rounded-full bg-white w-fit px-10">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}

function BannerCTA(props: Props) {
  const id = useId();
  const { image, preload } = { ...DEFAULT_PROPS, ...props };

  return (
    <div
      id={id}
      class="container"
    >
      <BannerItem
        image={image}
        lcp={preload}
        id={`${id}`}
      />
    </div>
  );
}

export default BannerCTA;
