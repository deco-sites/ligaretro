import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CardText(
  { tag, label, description, alignment }: {
    tag?: string;
    label?: string;
    description?: string;
    alignment?: "center" | "left";
  },
) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-primary">{tag}</div>}
      {label && <h3 class="text-lg text-base-content">{label}</h3>}
      {description && <div class="text-sm text-neutral">{description}</div>}
    </div>
  );
}

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = [
      {
        tag: "10% off",
        label: "Feminino",
        description: "Moda feminina direto de Milão",
        href: "/feminino",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
      },
    ],
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="container py-8 flex flex-col gap-8 lg:gap-0 text-base-content  lg:py-10"
    >
      {
        /* <Header
        title={header.title}
        description={header.description || ""}
        alignment={layout.headerAlignment || "center"}
      /> */
      }
      <h3 class="text-xl font-semibold mb-8 pl-6 sm:pl-0 ">
        {header.title}
      </h3>

      <div class={`flex sm:flex-row flex-col px-2 gap-4 lg:gap-8 `}>
        {list.map((
          { tag, label, description, href, image, buttonText },
          index,
        ) => (
          <div class="flex gap-4">
            <a
              href={href}
              class="flex flex-col gap-4 max-w-[450px] lg:h-auto"
            >
              {image &&
                (
                  <div class="relative">
                    <div class="absolute bg-white z-10 top-3/4 py-3 px-8 left-0 right-0 w-fit mx-auto rounded-full">
                      <h3 class="capitalize text-center text-xs sm:text-base font-semibold">
                        {label}
                      </h3>
                    </div>
                    <Picture preload={false} class="card w-full">
                      <Source
                        src={image}
                        width={360}
                        height={159}
                        media="(max-width: 767px)"
                      />
                      <Source
                        src={image}
                        width={450}
                        height={550}
                        media="(min-width: 767px)"
                      />
                      <img
                        class="w-full rounded-2xl"
                        src={image}
                        alt={image}
                      />
                    </Picture>
                  </div>
                )}
            </a>
            {buttonText &&
              <a href={href} class="btn">{buttonText}</a>}
          </div>
        ))}
      </div>

      <SliderJS rootId={id} />
    </div>
  );
}

export default CategoryList;
