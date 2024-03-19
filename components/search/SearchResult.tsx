import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

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
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
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
      <div class="container px-4 sm:py-10 lg:mt-16">
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
            <aside class="hidden md:block w-min min-w-[250px] z-10">
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
        <div class="container mb-20">
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

  return { page, layout, cardLayout, startingPage, style, pageTitle: title };
};

export default SearchResult;
