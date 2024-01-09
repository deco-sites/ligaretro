import type { ImageWidget } from "apps/admin/widgets.ts";
import QuestionAndAnswer from "apps/website/components/Image.tsx";

export interface QuestionAndAnswer {
  question: string;
  /** @format html */
  answer: string;
}

export interface Content {
  title: string;
  content?: QuestionAndAnswer[];
  text?: string;
}

export interface Props {
  tabs: Content[];
}

export default function TabbedContent({ tabs }: Props) {
  return (
    <div class="flex flex-row">
      <div class=" w-full sm:w-min sm:min-w-[250px] flex flex-row sm:flex-col">
        {tabs.map((t, i) => (
          <div class="w-full py-2">
            <span>{t.title}</span>
          </div>
        ))}
      </div>
      <div class="">
        <span>Content aqui</span>
      </div>
      <div>
        Content
      </div>
    </div>
  );
}
