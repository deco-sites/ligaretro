import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import AvatarSquare from "$store/components/ui/AvatarSquare.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import { useSignal } from "@preact/signals";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

export interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
  darkBackground?: boolean;
  hideHoverCTA?: boolean;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

// const WIDTH = 200;
const WIDTH = 279;
const HEIGHT = 279;

function ProductCard(
  {
    product,
    preload,
    itemListName,
    layout,
    platform,
    index,
    darkBackground,
    hideHoverCTA,
  }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    additionalProperty,
    isVariantOf,
  } = product;
  const skuSelected = useSignal(productID);

  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments, seller = "1" } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const categoryArray = additionalProperty?.filter((p) => p.name === "category")
    .map((obj) => obj.value);
  const category = categoryArray?.join(" | ");
  const getSkuByUrl = (url: string) => {
    const sku = url.split("skuId=")[1];
    return sku;
  };

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants.map(([value, link]) => (
    <li>
      <div
        class="cursor-pointer"
        onClick={() => {
          skuSelected.value = getSkuByUrl(link!);
        }}
      >
        <AvatarSquare
          variant={getSkuByUrl(link!) === skuSelected.value
            ? "active"
            : link
            ? "default"
            : "disabled"}
          content={value}
          size="tall"
        />
      </div>
    </li>
  ));

  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  const cta = (
    <AddToCartButtonVTEX
      eventParams={{ items: [eventItem] }}
      productID={skuSelected.value}
      seller={seller}
      styles="!rounded !bg-[#D56B09] !border-none !w-full"
    />
  );

  const splittedPrice =
    formatPrice(price, offers?.priceCurrency)?.split("\u00a0") ||
    ["Price", "undefined"];
  const formattedPrice = (
    <div>
      <span
        class={`${
          darkBackground
            ? "text-white lg:group-hover:text-[#bcbcbc]"
            : "text-[#bcbcbc]"
        } text-base mr-2`}
      >
        {splittedPrice[0]}
      </span>
      <span
        class={`${
          darkBackground
            ? "text-white lg:group-hover:text-[#252525]"
            : "text-[#252525]"
        } text-base font-semibold`}
      >
        {splittedPrice[1]}
      </span>
    </div>
  );

  const discount = price && listPrice ? listPrice - price : 0;
  const percentageDiscount = listPrice
    ? Math.round((discount / listPrice) * 100)
    : 0;

  return (
    <div
      id={id}
      class={`card card-compact group w-full ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:bg-white" : ""}
        ${
        l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
      } rounded
      `}
      style={{"box-shadow": "2px 4px 10px #bfbfbf"}}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}
        <div
          class={`absolute top-2 z-10
          ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
        `}
        >
          {platform === "vtex" && (
            <WishlistButton
              productGroupID={productGroupID}
              productID={productID}
            />
          )}
        </div>
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="relative grid grid-cols-1 grid-rows-1 w-full"
        >
          {listPrice !== price && (
            <div class="absolute top-6 left-2 m-auto text-[#252525]">
              <span class="text-base font-semibold mt-7">
                {percentageDiscount}% OFF
              </span>
            </div>
          )}
          <Image
            src={front.url!}
            alt={isVariantOf?.name ?? "foto produto"}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full rounded w-full ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={isVariantOf?.name ?? "Foto Produto"}
              width={WIDTH}
              height={HEIGHT}
              class="hidden md:block bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity lg:opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden flex"
          }`}
        >
          {/* SKU Selector */}

          <ul class={`flex justify-center items-center gap-2 w-full`}>
            {skuSelector}
          </ul>

          {/* {l?.onMouseOver?.showCta && cta} */}
        </figcaption>
      </figure>
      {/* Prices & Name & cta */}
      <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-4">
        {/* SKU Selector */}
        {
          /* {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`hidden sm:flex items-center gap-2 w-full overflow-auto p-3 ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )} */
        }

        {l?.hide?.productName && l?.hide?.productDescription
          ? ""
          : (
            <div class="flex flex-col gap-0 items-start">
              {l?.hide?.productName ? "" : (
                <h2
                  class={`text-base lg:text-base font-semibold h-12 ${
                    darkBackground
                      ? "text-white lg:group-hover:text-[#252525]"
                      : "text-base-content"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: isVariantOf?.name ?? "",
                  }}
                />
              )}
              <span class="mt-4 text-sm text-[#bcbcbc]">{category}</span>
            </div>
          )}
        <div class="flex h-12 justify-between items-center">
          {l?.hide?.allPrices ? "" : (
            <div class="flex flex-col gap-2">
              <div
                class={`flex flex-col gap-0 ${
                  l?.basics?.oldPriceSize === "Normal"
                    ? "lg:flex-row lg:gap-2"
                    : ""
                } ${align === "center" ? "justify-center" : "justify-start"}`}
              >
                {listPrice !== price && (
                  <div
                    class={`line-through  ${
                      darkBackground
                        ? "text-white lg:group-hover:text-[#252525]"
                        : "text-base-300"
                    }  text-xs ${
                      l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                    }`}
                  >
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </div>
                )}
                <div class={`text-base`}>
                  {formattedPrice}
                </div>
              </div>
              {l?.hide?.installments || installments === "" || !installments
                ? ""
                : (
                  <div
                    class={`${
                      darkBackground
                        ? "text-white lg:group-hover:text-[#252525]"
                        : "text-[#252525]"
                    } text-[11px] truncate`}
                  >
                    até {installments}
                  </div>
                )}
            </div>
          )}
          <div
            class={`hidden ${
              hideHoverCTA ? "" : "group-hover:lg:flex"
            } items-end p-3`}
          >
            {cta}
          </div>
        </div>

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {!l?.hide?.cta
          ? (
            <div
              class={`flex-auto flex items-end ${
                l?.onMouseOver?.showCta ? "lg:hidden" : ""
              }`}
            >
              {cta}
            </div>
          )
          : ""}
      </div>
    </div>
  );
}

export default ProductCard;
