import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "deco-sites/ligaretro/components/ui/Icon.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  gridColumns?: number;
  gridRows?: number;
  /**
   * @description Selo de camisa histórica
   */
  camisaHistorica?: {
    status: boolean;
    colorPreset: "black" | "brown";
  };
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2 | 4 | 6 | 8;
  };
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

const DEFAULT_PROPS: Props = {
  title: "Summer bags",
  banners: [
    {
      alt: "a",
      href: "a",
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/82727553-f670-4e7c-b9c2-9452aed1955f",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7b3a9d75-57a5-43cf-a3c5-f689a997f24e",
    },
    {
      alt: "a",
      href: "a",
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/c5c6bdf6-5555-488c-8b14-719e4158dea6",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/3e2b7824-d75c-4704-8d32-621bfc9b20cf",
    },
  ],
  borderRadius: {
    mobile: "3xl",
    desktop: "3xl",
  },
  itemsPerLine: {
    mobile: 2,
    desktop: 2,
  },
};

export default function BannnerGrid(props: Props) {
  const {
    title,
    itemsPerLine,
    borderRadius,
    banners = [],
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <section class="container w-full px-4 md:px-0 mx-auto mb-40">
      {title &&
        (
          <div class="py-6 md:py-0 md:pb-[40px] flex items-center mt-6">
            <h2 class="w-[20%] text-xl leading-5 font-semibold ">
              {title}
            </h2>

            <div class="bg-[#e5e5ea] h-[1px] w-full ml-4"></div>
          </div>
        )}
      <div
        class={`grid gap-2 ${MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]} ${
          DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 4]
        }`}
      >
        {banners.map((
          {
            href,
            srcMobile,
            srcDesktop,
            alt,
            gridColumns,
            gridRows,
            camisaHistorica,
          },
        ) => (
          <a
            href={href}
            class={`overflow-hidden grid-flow-row col-span-full row-span-1 ${
              RADIUS_MOBILE[borderRadius.mobile ?? "none"]
            } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} ${
              gridColumns && "sm:col-span-" + gridColumns
            } ${gridRows && "sm:row-span-" + gridRows}`}
          >
            <div class="w-full h-full relative">
              <div class="h-12 w-12 flex items-center justify-center rounded-full bg-white absolute left-0 right-0 top-0 bottom-0 m-auto">
                <div>
                  <Icon size={24} id="ShoppingBag" />
                </div>
              </div>
              {camisaHistorica?.status && (
                <div
                  class={`h-[55px] w-fit flex items-center justify-center rounded-lg border-2 border-white text-white  ${
                    camisaHistorica?.colorPreset === "black" && "bg-black"
                  } ${
                    camisaHistorica?.colorPreset === "brown" && "bg-[#673e2e]"
                  } absolute lg:left-[56%] xl:left-[66%] right-[12%] top-[70%] gap-4 px-3 bottom-0 m-auto`}
                >
                  <Icon size={36} id="Camisa10" />
                  <div class="flex flex-col align-top text-xs">
                    <span>Camisa</span>
                    <span class="font-bold">Histórica</span>
                  </div>
                </div>
              )}
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  src={srcMobile}
                  width={100}
                  height={65}
                />
                <Source
                  media="(min-width: 768px)"
                  src={srcDesktop ? srcDesktop : srcMobile}
                  width={250}
                  height={163}
                />
                <img
                  class="w-full h-full"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={srcMobile}
                  alt={alt}
                  decoding="async"
                  loading="lazy"
                />
              </Picture>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
