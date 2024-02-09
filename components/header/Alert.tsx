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
  };
}

function Alert({ links }: Props) {
  // function Alert({links} :Props) {
  const id = useId();

  return (
    <div id={id}>
      <div class="h-[38px] w-screen bg-black flex items-center">
        <div class="container gap-6 flex justify-end text-white text-xs items-center mx-10 sm:mx-0">
          <a href={links.firstLink.href} target="_blank">
            <span>{links.firstLink.text}</span>
          </a>
          <a href={links.secondLink.href} target="_blank">
            <span>{links.secondLink.text}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Alert;
