import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import {
  default as TabbedContent,
  QuestionAndAnswer,
} from "$store/components/content/TabbedContent.tsx";

export interface Props {
  pageTitle: string;
  terms: {
    title: string;
    /** @format html */
    text: string;
  };
  /** @titleBy title */
  faq: {
    title: string;
    content: QuestionAndAnswer[];
  };
}

export default function ExchangesAndReturns({ pageTitle, terms, faq }: Props) {
  return (
    <div class="container py-8 my-16 flex flex-col items-center justify-center gap-14">
      <div class="w-full flex justify-start">
        <span>{pageTitle}</span>
      </div>
      <TabbedContent tabs={[terms, faq]} />
    </div>
  );
}
