import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import type { SectionProps } from "deco/types.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  page: ProductDetailsPage | null;
}

export default function PDPBreadcrumb(
  { itemListElement }: SectionProps<ReturnType<typeof loader>>,
) {
  if (!itemListElement || !itemListElement.length) {
    throw new Error("Missing Product Details Page Info");
  }

  return (
    <div class="container mb-6 mt-20 text-xs font-semibold">
      <Breadcrumb
        itemListElement={itemListElement.slice(0, -1)}
      />
    </div>
  );
}

export const loader = (
  { page }: Props,
  req: Request,
) => {
  const itemListElement = page?.breadcrumbList.itemListElement;

  return { itemListElement };
};
