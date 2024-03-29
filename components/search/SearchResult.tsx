import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type {
  Product,
  ProductLeaf,
  ProductListingPage,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { FnContext, SectionProps } from "deco/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useDevice } from "deco-sites/ligaretro/sdk/useDevice.ts";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

/** @titleBy matcher.mathName */
export interface Style {
  matcher: {
    pathName: string;
    search?: string;
  };
  titleStyle?: {
    titleBgColor: string;
    titleTextColor: string;
    /**
     * @title Logo (89 x 89)
     */
    logo?: ImageWidget;
  };
  coverImage?: {
    /** @description Image for big screens */
    desktop?: ImageWidget;
    /** @description Image for small screens */
    mobile?: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
  topBanner?: {
    /** @description Image for big screens */
    desktop?: ImageWidget;
    /** @description Image for small screens */
    mobile?: ImageWidget;
    link?: string;
    /** @description image alt text */
    alt?: string;
  };
  bottomBanner?: {
    /** @description Image for big screens */
    desktop?: ImageWidget;
    /** @description Image for small screens */
    mobile?: ImageWidget;
    link?: string;
    /** @description image alt text */
    alt?: string;
  };
  backgroundColor?: string;
  darkBackground?: boolean;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  styles?: Style[];
  pageTitle?: string;
}

function NotFound() {
  return (
    <div
      class="w-full flex flex-col my-28 justify-center items-center py-10 gap-6"
      style={{ "margin": "100px 0" }}
    >
      <h2 class="text-4xl">Ops, esta página não existe.</h2>
      <span>
        Clique aqui para acessar a{" "}
        <a class="text-red-600 underline" href="/">Página Inicial</a>{" "}
        da nossa loja!
      </span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  style,
  pageTitle,
  startingPage = 0,
}: Omit<Props, "page styles"> & { page: ProductListingPage } & {
  style: Style;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  return (
    <>
      {style?.coverImage?.desktop && style?.coverImage?.mobile && (
        <div class="relative w-full h-60 flex justify-center z-0">
          <Picture
            preload
            class="absolute"
          >
            <Source
              src={style?.coverImage.mobile}
              width={360}
              height={159}
              media="(max-width: 767px)"
            />
            <Source
              src={style?.coverImage.desktop}
              width={1728}
              height={489}
              media="(min-width: 767px)"
            />
            {/* p/imagem limitada max-h-[470px] */}
            <img
              class="w-full rounded-xl mx-auto"
              src={style?.coverImage.desktop}
              alt={style?.coverImage.alt}
            />
          </Picture>
        </div>
      )}
      <div class="mx-auto w-full max-w[90%] px-4 sm:py-10 lg:mt-16">
        {style?.topBanner?.desktop && style?.topBanner?.mobile && (
          <a
            href={style?.topBanner.link || "#"}
            class="grid grid-cols-1 grid-rows-1"
          >
            <Picture
              preload
              class="col-start-1 col-span-1 row-start-1 row-span-1"
            >
              <Source
                src={style?.topBanner.mobile}
                width={360}
                height={159}
                media="(max-width: 767px)"
              />
              <Source
                src={style?.topBanner.desktop}
                width={1508}
                height={264}
                media="(min-width: 767px)"
              />
              <img
                class="w-full rounded-xl"
                src={style?.topBanner.desktop}
                alt={style?.topBanner.alt}
              />
            </Picture>
          </a>
        )}
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
          records={pageInfo.records}
          style={style}
          pageTitle={pageTitle}
        />

        <div class="flex flex-row gap-20">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden lg:block w-min min-w-[250px] z-10">
              <Filters
                darkBackground={style?.darkBackground}
                darkBackgroundColor={style?.backgroundColor}
                filters={filters}
              />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns }}
              darkBackground={style?.darkBackground}
            />

            <div
              class={`flex justify-center my-4 ${
                style?.darkBackground && "text-white"
              }`}
            >
              <div class="join">
                <a
                  aria-label="previous page link"
                  rel="prev"
                  href={pageInfo.previousPage ?? "#"}
                  class="btn btn-ghost join-item"
                  disabled={!pageInfo.previousPage}
                >
                  <Icon id="ChevronLeft" size={24} strokeWidth={2} />
                </a>
                <span class="btn btn-ghost join-item">
                  Página {zeroIndexedOffsetPage + 1}
                </span>
                <a
                  aria-label="next page link"
                  rel="next"
                  href={pageInfo.nextPage ?? "#"}
                  class="btn btn-ghost join-item"
                  disabled={!pageInfo.nextPage}
                >
                  <Icon id="ChevronRight" size={24} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {style?.bottomBanner?.desktop && style?.bottomBanner?.mobile && (
        <div class="mx-auto w-full max-w[90%] mb-20">
          <a
            href={style?.bottomBanner.link || "#"}
            class="grid grid-cols-1 grid-rows-1"
          >
            <Picture
              preload
              class="col-start-1 col-span-1 row-start-1 row-span-1"
            >
              <Source
                src={style?.bottomBanner?.mobile}
                width={360}
                height={159}
                media="(max-width: 767px)"
              />
              <Source
                src={style?.bottomBanner?.desktop}
                width={1508}
                height={264}
                media="(min-width: 767px)"
              />
              <img
                class="w-full rounded-xl"
                src={style?.bottomBanner.desktop}
                alt={style?.bottomBanner.alt}
              />
            </Picture>
          </a>
        </div>
      )}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            item_list_name: pageTitle ||
              breadcrumb.itemListElement?.at(-1)?.name,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult(
  { page, ...props }: SectionProps<ReturnType<typeof loader>>,
) {
  if (!page) {
    return <NotFound />;
  }

  const style = props.style;
  delete props.style;

  return (
    <section style={{ background: style?.backgroundColor }}>
      <Result {...props} page={page} style={style!} />;
    </section>
  );
}

export const loader = (
  { page, layout, cardLayout, startingPage, styles, pageTitle }: Props,
  req: Request,
  ctx: FnContext,
) => {
  const newURL = new URL(req.url);

  let title = pageTitle || "";

  const style = styles?.find(({ matcher }) => {
    let newSearch = "";
    const path = matcher.pathName.slice(1);
    const urlPath = newURL.pathname.slice(1);
    if (matcher.search?.includes("map=")) {
      const value = matcher.search.split("map=")[1];
      newSearch = `filter.${value}=${path}`;
      title = urlPath[0].toUpperCase() + urlPath.slice(1);
    }
    return (
      new URLPattern({ pathname: matcher.pathName }).test(req.url) &&
      (newURL.search && matcher.search
        ? newURL.search.includes(matcher.search) ||
          newURL.search.includes(newSearch)
        : true)
    );
  });
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
              });
            },
          ),
        },
        url,
        productID,
        additionalProperty: additionalProperty?.filter((
          property,
        ) => (property.valueReference === "SPECIFICATION" &&
          property.name === "Tamanho")
        ),
      };
    });
    return {
      productGroupID: isVariantOf?.productGroupID,
      name: isVariantOf?.name,
      hasVariant,
    };
  };

  const products = page?.products?.map((product) => {
    const isVariantOf = {
      productGroupID: product.isVariantOf?.productGroupID,
      name: product.isVariantOf?.name,
      hasVariant: ctx.device === "desktop"
        ? product.isVariantOf?.hasVariant
        : undefined,
    };

    return {
      productID: product.productID,
      isVariantOf: isVariantOfMap(isVariantOf as Product["isVariantOf"]),
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
      additionalProperty: product.additionalProperty?.filter((property) =>
        property.name === "category" ||
        (property.valueReference === "SPECIFICATION" &&
          property.name === "Tamanho")
      ),
      image: [product.image?.[0], product.image?.[1]],
      category: product.category,
      sku: product.sku,
    };
  });

  return {
    page: page ? { ...page, products } as ProductListingPage : null,
    layout,
    cardLayout,
    startingPage,
    style,
    pageTitle,
    device,
  };
};

export default SearchResult;
