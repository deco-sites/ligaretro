import Avatar from "$store/components/ui/Avatar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import AvatarSquare from "$store/components/ui/AvatarSquare.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { useEffect, useState } from "preact/hooks";
import PriceFilter from "$store/islands/PriceFilter.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  darkBackground?: boolean;
  darkBackgroundColor?: string;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

const isPrice = (filter: Filter) => !["price"].includes(filter.key);

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues(
  { filter, darkBackground, darkBackgroundColor }: {
    filter: FilterToggle;
    darkBackground: boolean;
    darkBackgroundColor: string;
  },
) {
  const { values, key } = filter;
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  if (key === "price") {
    return <PriceFilter values={values} darkBackground={darkBackground} />;
  }

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor") {
          return (
            <a href={url} rel="nofollow" class="flex items-center">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <AvatarSquare
                content={value}
                variant={selected ? "active" : "default"}
                darkBackground={darkBackground}
                darkBackgroundColor={darkBackgroundColor}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters, darkBackground, darkBackgroundColor }: Props) {
  return (
    <>
      <div class={`flex gap-3 p-4 mb-5 ${darkBackground && "md:text-white"}`}>
        <Icon id="FilterIcon" size={16} />
        <span class="font-semibold">Filtros</span>
      </div>
      <ul
        class={`flex flex-col gap-1 p-4 ${darkBackground && "md:text-white"}`}
      >
        {filters
          .filter(isToggle)
          .filter((filter: Filter) => filter.key !== "category-1")
          .filter((filter: Filter) => filter.key !== "category-2")
          .filter((filter: Filter) => filter.key !== "brand")
          .filter((filter: Filter) => filter.key !== "cores-geral---sku")
          .map((filter) => (
            <li class="flex flex-col gap-4 border-b border-white last:border-b-0">
              <details className="collapse collapse-arrow">
                {
                  /* <div class="collapse-title w-[225px]">
                  {filter.key !== "category-3" && <span>{filter.label}</span>}
                </div> */
                }
                <summary class="collapse-title  w-[225px]">
                  {filter.label}
                </summary>
                <div class="collapse-content  pl-0">
                  <FilterValues
                    filter={{ ...filter }}
                    darkBackground={darkBackground!}
                    darkBackgroundColor={darkBackgroundColor!}
                  />
                </div>
              </details>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Filters;
