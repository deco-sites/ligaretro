import { default as TabbedContent } from "$store/islands/TabbedContent.tsx";

export interface Terms {
  title: string;
  /** @format html */
  text: string;
}

export interface Props {
  pageTitle: string;
  terms: Terms[];
}

export default function Support({ pageTitle, terms }: Props) {
  return (
    <div class="container px-4 sm:px-0 py-8 mb-16 flex flex-col items-center justify-center gap-14">
      <div class="w-full flex justify-start">
        <span class="font-semibold text-2xl">{pageTitle}</span>
      </div>
      <TabbedContent tabs={[...terms]} />
    </div>
  );
}
