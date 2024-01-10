import QuestionAndAnswer from "apps/website/components/Image.tsx";
import { useState } from "preact/hooks";

/**@titleby question */
export interface QuestionAndAnswer {
  question: string;
  /** @format html */
  answer: string;
}

export interface Content {
  title: string;
  accordion?: QuestionAndAnswer[];
  text?: string;
}

export interface Props {
  tabs: Content[];
}

export default function TabbedContent({ tabs }: Props) {
  const [tabOpen, setTabOpen] = useState(0);

  return (
    <div class="flex flex-col sm:flex-row w-full gap-16">
      <div class=" w-full sm:w-min sm:min-w-[250px] flex flex-col">
        {tabs.map((t, i) => (
          <div class="w-full py-2">
            <button
              onClick={() => setTabOpen(i)}
              class={`btn w-full ${
                i === tabOpen ? "btn-primary" : "btn-outline"
              }`}
            >
              {t.title}
            </button>
          </div>
        ))}
      </div>
      <div class="w-full">
        <div class="mb-11">
          <span class="font-semibold text-2xl">{tabs[tabOpen].title}</span>
        </div>
        {tabs[tabOpen].text && (
          <div
            class="text-sm"
            dangerouslySetInnerHTML={{ __html: tabs[tabOpen].text || "" }}
          />
        )}
        {tabs[tabOpen].accordion && (
          <div class="flex flex-col gap-3">
            {tabs[tabOpen].accordion?.map((qna, i) => (
              <div class="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" checked={i === 0} />
                <div class="collapse-title text-lg font-semibold">
                  {qna.question}
                </div>
                <div class="collapse-content border-t border-[#cecece]">
                  <div
                    class="text-sm mt-4"
                    dangerouslySetInnerHTML={{ __html: qna.answer }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
