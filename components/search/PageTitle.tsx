import type { BreadcrumbList } from "apps/commerce/types.ts";

export interface Props {
  breadCrumbs?: BreadcrumbList["itemListElement"];
  pageTitle?: string;
}

function PageTitle({ breadCrumbs, pageTitle }: Props) {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const searchTerm = urlParams.get("q");
  const title = breadCrumbs ? breadCrumbs[breadCrumbs.length - 1]?.name : "";

  return (
    <div>
      {pageTitle
        ? (
          <span
            class={`text-xl font-medium sm:text-2xl ${
              !searchTerm && "capitalize"
            }`}
          >
            {pageTitle}
          </span>
        )
        : (
          <span
            class={`text-xl font-medium sm:text-2xl ${
              !searchTerm && "capitalize"
            }`}
          >
            {searchTerm ? `Busca: "${searchTerm}"` : title}
          </span>
        )}
    </div>
  );
}

export default PageTitle;
