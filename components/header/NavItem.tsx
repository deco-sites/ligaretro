import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children, additionalType } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center">
      <a href={url} class="px-4 py-3">
        <span class={`group-hover:underline text-sm`}>
          {name}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex flex-row bg-base-100 z-50 items-center justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
            style={{ top: "0px", left: "0px", marginTop: "152px" }}
          >
            <ul
              class={`flex flex-row items-start ${
                name !== "Acessórios" ? "grow" : ""
              } justify-center`}
            >
              {children.map((node) => (
                <li
                  class={`flex flex-col ${
                    node.children!.length > 9 ? "grow-[0.1]" : ""
                  } p-6`}
                >
                  <a class="hover:underline" href={node.url}>
                    <span>{node.name}</span>
                  </a>

                  <ul
                    class="flex flex-col flex-wrap flex-grow gap-1 mt-4 columns-12 max-h-[270px]"
                    style={{ "column-gap": "34px" }}
                  >
                    {node.children?.map((leaf) => (
                      <li class={leaf.additionalType === 'show_all' ? 'font-bold' : ''}>
                        <a class="hover:underline" href={leaf.url}>
                          <span class="text-xs">{leaf.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            {(image?.url || image?.contentUrl)
              ? (
                <Image
                  class="p-6 flex"
                  src={image?.url || image?.contentUrl || ""}
                  alt={image.alternateName}
                  width={300}
                  height={332}
                  loading="lazy"
                />
              )
              : null}
          </div>
        )}
    </li>
  );
}

export default NavItem;
