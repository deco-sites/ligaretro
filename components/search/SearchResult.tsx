import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/islands/Filters.tsx";
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

/** @titleBy matcher */
export interface Style {
  matcher: string;
  titleStyle?: {
    titleBgColor: string;
    titleTextColor: string;
    /**
     * @title Logo (89 x 89)
     */
    logo?: ImageWidget;
  };
  topBanner?: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    link: string;
    /** @description image alt text */
    alt: string;
  };
  bottomBanner?: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    link: string;
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
      <div class="container px-4 sm:py-10 mt-16">
        {style?.topBanner && (
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
        />

        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden md:block w-min min-w-[250px]">
              <Filters
                darkBackground={style?.darkBackground}
                filters={filters}
              />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns }}
            />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost join-item"
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
            >
              <Icon id="ChevronRight" size={24} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
      {style?.bottomBanner && (
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
                src={style?.bottomBanner.mobile}
                width={360}
                height={159}
                media="(max-width: 767px)"
              />
              <Source
                src={style?.bottomBanner.desktop}
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
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
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
  { page, layout, cardLayout, startingPage, styles }: Props,
  req: Request,
) => {
  const style = styles?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { page, layout, cardLayout, startingPage, style };
};

export default SearchResult;
