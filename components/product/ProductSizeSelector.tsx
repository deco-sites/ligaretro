import AvatarSquare from "$store/components/ui/AvatarSquare.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import SizeTableButton from "$store/islands/SizeTableButton.tsx";

interface Props {
  product: Product;
  sizeTableImg: {
    src: string;
    alt: string;
  };
}

function VariantSelector({ product, sizeTableImg }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).includes("Tamanho")
        ? (
          <li class="flex flex-col gap-6">
            <span class="text-lg font-semibold text-[#252525]">Tamanho</span>
            <SizeTableButton img={sizeTableImg} />
            <ul class="flex flex-row gap-2 flex-wrap">
              {Object.entries(possibilities["Tamanho"]).sort(([a], [b]) => {
                const order = [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "8",
                  "10",
                  "12",
                  "14",
                  "16",
                  "36",
                  "38",
                  "40",
                  "42",
                  "44",
                  "46",
                  "48",
                  "50",
                  "PPP",
                  "PP",
                  "P",
                  "M",
                  "G",
                  "GG",
                  "GGG",
                  "4G",
                  "UNICO",
                ];
                return order.indexOf(a) - order.indexOf(b);
              }).map((
                [value, possibility],
              ) => (
                <li>
                  <button f-partial={possibility?.url} f-client-nav>
                    <AvatarSquare
                      size="large"
                      content={value}
                      variant={possibility?.url === url
                        ? "active"
                        : possibility?.availability ===
                            "https://schema.org/OutOfStock"
                        ? "disabled"
                        : "default"}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </li>
        )
        : <span>Produto sem tamanho</span>}
    </ul>
  );
}

export default VariantSelector;
