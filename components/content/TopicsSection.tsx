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
}

export default function TopicsSection(
  { title, topics, topicsText }: Props,
) {
  return (
    <div class="container flex flex-col gap-[70px] items-center my-14">
      <div class="flex flex-col gap-10 justify-center">
        <span class="text-lg text-center font-semibold">
          {title}
        </span>
        {topicsText && (
          <span class="text-lg text-center">
            {topicsText}
          </span>
        )}
      </div>
      <div>
        <div class="grid-cols-4 flex flex-col sm:flex-row gap-10 sm:gap-5 justify-center">
          {topics.map((b) => {
            return (
              <div class="col-span-1 flex justify-center">
                <div class="flex flex-col justify-center items-center bg-[#292929] p-10 rounded-3xl border border-[#BFB78D] max-w-[80%] relative h-44">
                  <div class="bg-[#D8AE70] rounded-full p-3 text-[#292929] absolute top-[-40px]">
                    <Icon size={32} id={b.icon} />
                  </div>
                  <div
                    class="text-sm text-center text-white"
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
