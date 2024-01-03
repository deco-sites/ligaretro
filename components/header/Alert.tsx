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
}

// function Alert({ alerts = [], interval = 5 }: Props) {
function Alert() {
  const id = useId();

  return (
    <div id={id}>
      <div class="h-[38px] w-screen bg-black flex items-center">
        <div class="container gap-6 flex justify-end text-white text-xs items-center">
          <a href="#" target="_blank">
            <span>Clube de Assinatura</span>
          </a>
          <a href="#" target="_blank">
            <span>Revendas</span>
          </a>
        </div>
      </div>
      {
        /* <Slider class="carousel carousel-center w-screen bg-black gap-6">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-sm text-white flex justify-center items-center w-screen h-[38px]">
              {alert}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} /> */
      }
    </div>
  );
}

export default Alert;
