import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
}

export default function FooterLogo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col gap-3 h-0 justify-end pt-5">
          <div class="w-28 max-h-16">
            <img
              loading="lazy"
              src={logo?.image}
              alt={"Logo liga retro"}
              width={200}
              height={200}
              decoding={"async"}
            />
          </div>
          <div class="">
            {logo?.description}
          </div>
        </div>
      )}
    </>
  );
}
