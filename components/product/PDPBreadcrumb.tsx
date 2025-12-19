import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { type SectionProps } from "@deco/deco";
interface Props {
    page: ProductDetailsPage | null;
}
export default function PDPBreadcrumb({ itemListElement }: SectionProps<ReturnType<typeof loader>>) {
    if (!itemListElement || !itemListElement.length) {
        throw new Error("Missing Product Details Page Info");
    }
    return (<div class="container mb-6 sm:mt-20 text-xs font-semibold" style={{ maxWidth: "90vw" }}>
      <Breadcrumb itemListElement={itemListElement.slice(0, -1)}/>
    </div>);
}
export const loader = ({ page }: Props, req: Request) => {
    const itemListElement = page?.breadcrumbList.itemListElement;
    return { itemListElement };
};
