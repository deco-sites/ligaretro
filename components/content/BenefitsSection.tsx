import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

interface Benefit {
  icon: AvailableIcons;
  /** @format html */
  text: string;
}

export interface Props {
  title: string;
  benefits: Benefit[];
  /** @format html */
  benefitsText: string;
}

export default function BenefitsSection(
  { title, benefits, benefitsText }: Props,
) {
  return (
    <div class="container flex flex-col gap-[70px] items-center my-14">
      <div class="max-w-[560px] flex justify-center">
        <span
          class={`text-xl lg:text-5xl text-center font-bold`}
          style={{ "text-shadow": "2px 2px 3px #BFB78D;" }}
        >
          {title}
        </span>
      </div>
      <div>
        <div class="grid-cols-3 flex flex-col sm:flex-row gap-10 sm:gap-0 justify-center">
          {benefits.map((b) => {
            return (
              <div class="col-span-1 flex justify-center">
                <div class="max-w-[80%]  flex flex-col items-center">
                  <Icon size={55} id={b.icon} />
                  <div
                    class="text-sm text-center"
                    dangerouslySetInnerHTML={{ __html: b.text || "" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div class="">
        <div
          class="text-sm text-center max-w-[430px] sm:max-w-[560px] px-5"
          dangerouslySetInnerHTML={{ __html: benefitsText || "" }}
        />
      </div>
    </div>
  );
}
