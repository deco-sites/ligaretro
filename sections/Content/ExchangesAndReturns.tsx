import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { default as TabbedContent } from "$store/islands/TabbedContent.tsx";
import { QuestionAndAnswer } from "$store/components/content/TabbedContent.tsx";

export interface Terms {
  title: string;
  /** @format html */
  text: string;
}

export interface Props {
  pageTitle: string;
  terms: Terms;
  /** @titleBy title */
  faq: {
    title: string;
    accordion: QuestionAndAnswer[];
  };
}

export default function ExchangesAndReturns({ pageTitle, terms, faq }: Props) {
  return (
    <div class="container py-8 mb-16 flex flex-col items-center justify-center gap-14">
      <div class="w-full flex justify-start">
        <span class="font-semibold text-2xl">{pageTitle}</span>
      </div>
      <TabbedContent tabs={[terms, faq]} />
    </div>
  );
}
