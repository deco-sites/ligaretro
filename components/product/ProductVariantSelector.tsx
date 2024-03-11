import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-sm">{name}</span>
          <ul class="flex flex-row gap-3">
            {Object.entries(possibilities[name]).map(([value, possibility]) => (
                <li>
                  <button f-partial={possibility?.url} f-client-nav>
                    <Avatar
                      content={value}
                      variant={possibility?.url === url
                        ? "active"
                        : possibility?.url
                        ? "default"
                        : "disabled"}
                    />
                  </button>
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
