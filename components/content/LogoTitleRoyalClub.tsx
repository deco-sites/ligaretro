import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  logo: {
    src: ImageWidget;
    alt: string;
  };
}

export default function LogoTitleRoyalClub(
  { title, logo }: Props,
) {
  return (
    <div class="container flex flex-col gap-[70px] items-center my-[120px]">
      <div class="w-full flex justify-center">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={176}
          height={214}
        />
      </div>
      <div class="max-w-[690px] flex justify-center">
        <span
          class="text-2xl leading-[24px] sm:text-5xl text-center font-bold sm:leading-[54px]"
          style={{ "text-shadow": "2px 2px 3px #BFB78D;" }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
