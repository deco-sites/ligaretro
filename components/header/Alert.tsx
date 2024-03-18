import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  alerts?: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  links: {
    firstLink: {
      text: string;
      href: string;
    };
    secondLink: {
      text: string;
      href: string;
    };
    hideFirstLink?: boolean;
    hideSecondLink?: boolean;
  };
}

function Alert({ links }: Props) {
  // function Alert({links} :Props) {
  const id = useId();

  return (
    <div id={id}>
      <div class="h-[38px] w-screen bg-[#252525] flex items-center justify-end px-11">
        <div class="gap-6 flex justify-end text-white text-xs items-center mx-10 sm:mx-0">
          <a
            class={`${links.hideFirstLink && "hidden"}`}
            href={links.firstLink.href}
            target="_blank"
          >
            <span>{links.firstLink.text}</span>
          </a>
          <a
            class={`${links.hideSecondLink && "hidden"}`}
            href={links.secondLink.href}
            target="_blank"
          >
            <span>{links.secondLink.text}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Alert;
