import type { BreadcrumbList } from "apps/commerce/types.ts";

export interface Props {
  breadCrumbs?: BreadcrumbList["itemListElement"];
}

function PageTitle({ breadCrumbs }: Props) {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const searchTerm = urlParams.get("q");
  const pageTitle = breadCrumbs
    ? breadCrumbs[breadCrumbs.length - 1]?.name
    : "";

  return (
    <div>
      <span
        class={`text-xl font-medium sm:text-2xl ${!searchTerm && "capitalize"}`}
      >
        {searchTerm ? `Busca: "${searchTerm}"` : pageTitle}
      </span>
    </div>
  );
}

export default PageTitle;
