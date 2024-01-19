import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import PageTitle from "$store/components/search/PageTitle.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import type { Style } from "$store/components/search/SearchResult.tsx";
import Image from "apps/website/components/Image.tsx";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    records?: number;
    style?: Style;
    pageTitle?: string;
  };

function SearchControls(
  {
    filters,
    breadcrumb,
    displayFilter,
    sortOptions,
    records = 0,
    style,
    pageTitle,
  }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="w-full text-xs text-[#bcbcbc]">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>
      <div
        class={`flex flex-col justify-between md:mb-20 md:gap-4 md:flex-row md:items-center md:h-[53px]  rounded-xl p-5 ${
          style?.titleStyle?.logo ? "mb-20 relative" : "mb-4"
        }`}
        style={{
          "background": style?.titleStyle?.titleBgColor &&
              style?.titleStyle?.titleBgColor !== ""
            ? `${style?.titleStyle?.titleBgColor}`
            : "#f5f5f5",
          "color": style?.titleStyle?.titleTextColor &&
              style?.titleStyle?.titleTextColor !== ""
            ? `${style?.titleStyle?.titleTextColor}`
            : "#252525",
        }}
      >
        {style?.titleStyle?.logo && (
          <div class="absolute left-1/2 transform -translate-x-1/2 top-[90%] md:top-[20%]">
            <Image
              src={style?.titleStyle?.logo}
              alt="logomarca"
              width={89}
              height={89}
            />
          </div>
        )}
        <div class="flex flex-row items-center sm:p-0 mb-2">
          <PageTitle
            breadCrumbs={breadcrumb?.itemListElement}
            pageTitle={pageTitle}
          />
          <span class="text-sm ml-2">({records} produtos)</span>
        </div>

        <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 md:border-none">
          <Button
            class={displayFilter ? "btn-ghost" : "btn-ghost md:hidden"}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
            <Icon id="FilterList" width={16} height={16} />
          </Button>
          {sortOptions.length > 0 && (
            <Sort
              sortOptions={sortOptions}
              textColor={style?.titleStyle?.titleTextColor}
            />
          )}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
