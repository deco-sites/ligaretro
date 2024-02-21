import { useState } from "preact/hooks";
import type { FilterToggleValue } from "apps/commerce/types.ts";
import MultiRangeSlider from "$store/components/ui/PriceSlider.tsx";

const PriceFilter = (
  { values, darkBackground }: {
    values: FilterToggleValue[];
    darkBackground: boolean;
  },
) => {
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
};

export default PriceFilter;
