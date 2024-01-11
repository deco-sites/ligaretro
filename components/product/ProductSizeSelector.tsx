import AvatarSquare from "$store/components/ui/AvatarSquare.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).includes("TAMANHO")
        ? (
          <li class="flex flex-col gap-6">
            <span class="text-lg font-semibold text-[#252525]">Tamanho</span>
            <button class="btn btn-outline w-fit rounded-full border-[#d9d9d9]">
              <Icon id="Ruler" size={24} class="mr-1" />
              <span class="text-sm font-normal">Tabela de Medidas</span>
            </button>
            <ul class="flex flex-row gap-2 flex-wrap">
              {Object.entries(possibilities["TAMANHO"]).map(([value, link]) => (
                <li>
                  <button f-partial={link} f-client-nav>
                    <AvatarSquare
                      size="large"
                      content={value}
                      variant={link === url
                        ? "active"
                        : link
                        ? "default"
                        : "disabled"}
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
