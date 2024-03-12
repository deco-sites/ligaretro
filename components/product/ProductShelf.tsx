import { SendEventOnView } from "$store/components/Analytics.tsx";
import {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import ProductCard from "$store/islands/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { FnContext, LoaderReturnType } from "$live/types.ts";
import { useDevice } from "$store/sdk/useDevice.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type {
  Product,
  ProductGroup,
  ProductLeaf,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

export interface Props {
  products: LoaderReturnType<Product[] | null>;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
  bottom?: boolean;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
  bottom,
}: ReturnType<typeof loader>) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      class={`w-full container py-8 flex flex-col gap-12 lg:gap-16 lg:py-10 ${
        bottom && "mb-24"
      }`}
    >
      {
        /* <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      /> */
      }

      <h3 class="text-xl font-semibold pl-6 sm:pl-0">{title || ""}</h3>

      <div
        id={id}
        class="relative mx-auto max-w-[100%] grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5 py-3 px-2">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[40vw] lg:w-[10vw] min-w-[290px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0 rounded-xl"
            >
              <ProductCard
                product={product as Product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        <div class="hidden lg:flex lg:flex-row mt-[-100px] ml-[230px]">
          <Slider.PrevButton class="btn btn-circle btn-outline bg-base-100 mr-3 hover:bg-[#252525]">
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>
          <Slider.NextButton class="btn btn-circle btn-outline bg-base-100 hover:bg-[#252525]">
            <Icon
              size={24}
              id="ChevronLeft"
              strokeWidth={3}
              class="transform rotate-180"
            />
          </Slider.NextButton>
        </div>

        {
          /* <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </> */
        }
        <SliderJS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product: product as Product,
                  ...(product.offers),
                  price: product.offers?.offers?.[0]?.price,
                  listPrice: product.offers?.offers?.[0]?.priceSpecification
                    .find(
                      (spec) =>
                        spec.priceType === "https://schema.org/ListPrice",
                    )?.price,
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export const loader = (props: Props, req: Request, ctx: FnContext) => {
  const { deviceSignal } = useDevice();
  deviceSignal.value = ctx.device || "desktop";
  const device = deviceSignal.value;
  const bestInstallment = (
    acc: UnitPriceSpecification | null,
    curr: UnitPriceSpecification,
  ) => {
    if (curr.priceComponentType !== "https://schema.org/Installment") {
      return acc;
    }

    if (!acc) {
      return curr;
    }

    if (acc.price > curr.price) {
      return curr;
    }

    if (acc.price < curr.price) {
      return acc;
    }

    if (
      acc.billingDuration && curr.billingDuration &&
      acc.billingDuration < curr.billingDuration
    ) {
      return curr;
    }

    return acc;
  };

  const installment = (specs: UnitPriceSpecification[]) =>
    specs.reduce(bestInstallment, null);

  const isVariantOfMap = (isVariantOf: Product["isVariantOf"]) => {
    const hasVariant = isVariantOf?.hasVariant?.map((variant: ProductLeaf) => {
      const { offers, url, productID, additionalProperty } = variant;
      return {
        offers: {
          ...offers,
          offers: offers?.offers.filter((offer) => offer.seller === "1").map(
            (offer) => {
              const best = installment(offer.priceSpecification);
              const specs = offer.priceSpecification.filter((spec) =>
                ["https://schema.org/ListPrice"].includes(spec.priceType)
              );

              if (best) {
                specs.push(best);
              }
              return ({
                seller: offer.seller,
                priceSpecification: specs.map((spec) => {
                  return {
                    ...spec,
                    price: spec.price,
                    priceComponentType: spec.priceComponentType,
                    priceType: spec.priceType,
                    billingIncrement: spec.billingIncrement,
                    billingDuration: spec.billingDuration,
                  };
                }),
                price: offer.price,
                availability: offer.availability,
                inventoryLevel: offer.inventoryLevel,
              });
            },
          ),
        },
        url,
        productID,
        additionalProperty: additionalProperty?.filter((property) =>
          property.valueReference === "SPECIFICATION"
        ),
      };
    });
    return {
      productGroupID: isVariantOf?.productGroupID,
      name: isVariantOf?.name,
      hasVariant,
    };
  };

  const products = props.products?.map((product) => {
    const isVariantOf = {
      productGroupID: product.isVariantOf?.productGroupID,
      name: product.isVariantOf?.name,
      hasVariant: ctx.device === "desktop"
        ? product.isVariantOf?.hasVariant
        : undefined,
    };

    return {
      productID: product.productID,
      inProductGroupWithID: product.inProductGroupWithID,
      isVariantOf: isVariantOfMap(isVariantOf as Product["isVariantOf"]),
      isSimilarTo: product.isSimilarTo?.map((similar) => {
        const { image, offers, productID, url } = similar;
        const isVariantOf = isVariantOfMap(similar.isVariantOf!);
        const colorImage = image?.find((img) =>
          img?.alternateName === "color-thumbnail"
        );
        return {
          image: [image?.[0], image?.[1], colorImage],
          offers: {
            ...offers,
            offers: offers?.offers.filter((offer) => offer.seller === "1").map(
              (offer) => {
                const best = installment(offer.priceSpecification);
                const specs = offer.priceSpecification.filter((spec) =>
                  ["https://schema.org/ListPrice"].includes(spec.priceType)
                );

                if (best) {
                  specs.push(best);
                }
                return ({
                  seller: offer.seller,
                  priceSpecification: specs.map((spec) => {
                    return {
                      ...spec,
                      price: spec.price,
                      priceComponentType: spec.priceComponentType,
                      priceType: spec.priceType,
                      billingIncrement: spec.billingIncrement,
                      billingDuration: spec.billingDuration,
                    };
                  }),
                  price: offer.price,
                  availability: offer.availability,
                  inventoryLevel: offer.inventoryLevel,
                });
              },
            ),
          },
          productID,
          url,
          isVariantOf,
        };
      }),
      url: product.url,
      offers: {
        ...product.offers,
        offers: product.offers?.offers.filter((offer) => offer.seller === "1")
          .map((offer) => {
            const best = installment(offer.priceSpecification);
            const specs = offer.priceSpecification.filter((spec) =>
              ["https://schema.org/ListPrice"].includes(spec.priceType)
            );
            if (best) {
              specs.push(best);
            }
            return ({
              seller: offer.seller,
              priceSpecification: specs.map((spec) => {
                return {
                  ...spec,
                  price: spec.price,
                  priceComponentType: spec.priceComponentType,
                  priceType: spec.priceType,
                  billingIncrement: spec.billingIncrement,
                  billingDuration: spec.billingDuration,
                };
              }),
              price: offer.price,
              availability: offer.availability,
              inventoryLevel: offer.inventoryLevel,
            });
          }),
      },
      image: [product.image?.[0]],
      category: product.category,
      sku: product.sku,
    };
  });

  return { ...props, products, device };
};

export default ProductShelf;
