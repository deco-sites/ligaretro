import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface Props {
  /** @title Logo */
  logo: Logo;

  link: {
    text: string;
    url: string;
  };
}

function CleanHeader({
  logo,
  link,
}: Props) {
  return (
    <header class="border-b border-[#cecece]" style={{ height: 91 }}>
      <div class="h-full container flex justify-between items-center ">
        <a
          href="/"
          class="inline-flex items-center"
          aria-label="Store logo"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 80}
            height={logo.height}
          />
        </a>
        <a
          href={link.url}
        >
          <span class="text-xs underline">{link.text}</span>
        </a>
      </div>
    </header>
  );
}

export default CleanHeader;
