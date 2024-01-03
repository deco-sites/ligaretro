import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

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
      <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5">
        {list.map((
          { tag, label, description, href, image, buttonText },
          index,
        ) => (
          <Slider.Item
            index={index}
            class="flex gap-4 carousel-item w-[260px] sm:w-1/3 first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
          >
            <a
              href={href}
              class="flex flex-col gap-4 lg:w-[450px] w-80 lg:h-auto"
            >
              {image &&
                (
                  <figure class="relative">
                    <div class="absolute bg-white z-10 top-3/4 py-3 px-8 left-0 right-0 w-fit mx-auto rounded-full">
                      <h3 class="capitalize text-center text-xs sm:text-base font-semibold">
                        {label}
                      </h3>
                    </div>
                    <Image
                      class="card w-full"
                      src={image}
                      alt={description || label || tag}
                      width={160}
                      height={195}
                      loading="lazy"
                    />
                  </figure>
                )}
            </a>
            {buttonText &&
              <a href={href} class="btn">{buttonText}</a>}
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} />
    </div>
  );
}

export default CategoryList;
