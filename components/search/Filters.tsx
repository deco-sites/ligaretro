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
import MultiRangeSlider from "$store/components/ui/PriceSlider.tsx";

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
    //parsing range values for price filter
    const valuesArray = Object.entries(values);

    const url = valuesArray[0][1].url;

    const urlPrice = url.split("&").slice(0, -1).filter((r) =>
      r.includes("filter.price")
    )[0]?.split("=")[1]?.split("%3A");
    const urlBrowser = url.split("&").slice(0, -1).filter((r) =>
      !r.includes("filter.price")
    ).join("&");
    const rangeArray: number[] = [];

    valuesArray.map((value) => {
      const aux = value[1].value.split(":");
      const auxArr = aux.map((r) => parseInt(r));
      rangeArray.push(...auxArr);
    });
    rangeArray.sort((a, b) => a - b);
    const minRange = rangeArray[0];
    const maxRange = rangeArray[rangeArray.length - 1];

    const [currentMaxMin, setCurrentMaxMin] = useState({
      max: urlPrice ? parseInt(urlPrice[1]) : maxRange,
      min: urlPrice ? parseInt(urlPrice[0]) : minRange,
    });

    let timeOutId = 0;
    let firstTime = 0;

    return (
      <div class={`h-16 mt-4`}>
        <MultiRangeSlider
          darkBackground={darkBackground}
          min={minRange}
          max={maxRange}
          currentMin={currentMaxMin.min}
          currentMax={currentMaxMin.max}
          onChange={(query: { min: number; max: number }) => {
            if (
              currentMaxMin.max != query.max || currentMaxMin.min != query.min
            ) {
              if (firstTime > 0) {
                clearTimeout(timeOutId);
                timeOutId = setTimeout(() => {
                  setCurrentMaxMin({ max: query.max, min: query.min });
                  window.location.href = urlBrowser + "&filter.price=" +
                    query.min + "%3A" + query.max;
                }, 500);
              }
              firstTime++;
            }
          }}
        />
      </div>
    );
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
        class={`flex flex-col gap-6 p-4 ${darkBackground && "md:text-white"}`}
      >
        {filters
          .filter(isToggle)
          .filter((filter: Filter) => filter.key !== "category-1")
          .filter((filter: Filter) => filter.key !== "category-2")
          .filter((filter: Filter) => filter.key !== "brand")
          .map((filter) => (
            <li class="flex flex-col gap-4 border-b border-white last:border-b-0 pb-4">
              <div
                tabIndex={0}
                className="collapse collapse-arrow collapse-open"
              >
                <div class="collapse-title">
                  {filter.key !== "category-3" && <span>{filter.label}</span>}
                </div>
                <div class="collapse-content">
                  <FilterValues
                    filter={{ ...filter }}
                    darkBackground={darkBackground!}
                    darkBackgroundColor={darkBackgroundColor!}
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Filters;
