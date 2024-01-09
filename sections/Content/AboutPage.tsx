import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  banner: {
    image: ImageWidget;
    alt: string;
  };
  bannerAlt: string;
  /** @format html */
  description: string;
}

export default function AboutPage({ title, banner, description }: Props) {
  return (
    <div class="container py-8 my-16 flex flex-col items-center justify-center gap-14">
      <h3 class="font-bold text-7xl text-center max-w-[900px]">{title}</h3>
      <Image
        width={1439}
        height={768}
        src={banner.image}
        alt={banner.alt}
      />
      <div
        class="max-w-[900px] flex flex-col gap-10"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
