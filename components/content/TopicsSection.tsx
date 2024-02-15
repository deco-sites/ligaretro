import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

interface Topic {
  icon: AvailableIcons;
  /** @format html */
  text: string;
}

export interface Props {
  title: string;
  topicsText?: string;
  topics: Topic[];
  noBackground?: boolean;
  styles?: string;
}

export default function TopicsSection(
  { title, topics, topicsText, noBackground, styles }: Props,
) {
  return (
    <div
      class={`container flex flex-col gap-[70px] items-center my-14`}
      style={`${styles ? styles : ""}`}
    >
      <div class="flex flex-col items-center gap-10 justify-center">
        <span class="text-lg text-center font-semibold">
          {title}
        </span>
        {topicsText && (
          <span class="text-lg text-center max-w-[70%]">
            {topicsText}
          </span>
        )}
      </div>
      <div>
        <div class="grid-cols-4 flex flex-col md:flex-row gap-10 sm:gap-5 justify-center">
          {topics.map((b) => {
            return (
              <div class="col-span-1 w-full flex justify-center">
                <div
                  class={`flex flex-col justify-center items-center ${
                    noBackground
                      ? "p-3"
                      : "bg-[#292929] border border-[#BFB78D]  p-10 md:p-5 lg:p-10"
                  } max-w-[80%] rounded-3xl relative h-44`}
                >
                  <div
                    class={`${
                      noBackground
                        ? "text-[#BFB78D]"
                        : "bg-[#D8AE70] text-[#292929]"
                    } rounded-full p-3 absolute top-[-28px]`}
                  >
                    <Icon size={noBackground ? 46 : 32} id={b.icon} />
                  </div>
                  <div
                    class={`text-sm text-center ${
                      noBackground ? "text-[#292929] font-medium" : "text-white"
                    }`}
                    dangerouslySetInnerHTML={{ __html: b.text || "" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
