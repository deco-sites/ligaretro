import { Secret } from "apps/website/loaders/secret.ts";
import Form from "$store/islands/Form.tsx";
import type { SectionProps } from "deco/types.ts";

export interface Props {
  textSection: {
    title: string;
    /** @format html */
    text: string;
  };
  formTitle: string;
  sendGridApiKey: Secret;
}

export const loader = (props: Props) => {
  const { textSection, formTitle, sendGridApiKey } = props;
  const apiKey = sendGridApiKey.get();

  return { textSection, formTitle, apiKey };
};

function TextForm(
  { textSection, formTitle, apiKey }: SectionProps<ReturnType<typeof loader>>,
) {
  return (
    <div
      id="formFranchise"
      class="container grid-cols-1 md:grid-cols-2 flex flex-col a md:flex-row my-24 px-5"
    >
      <div class="justify-center col-span-1 w-full md:w-[50%] flex md:justify-end">
        <div class="max-w-[480px] flex flex-col gap-4">
          <span class="font-semibold">{textSection.title}</span>
          <div
            class="text-sm text-left"
            dangerouslySetInnerHTML={{ __html: textSection.text || "" }}
          />
        </div>
      </div>
      <div class="flex col-span-1 w-full md:w-[50%] justify-center md:flex md:justify-start md:px-24 mt-8 md:mt-0">
        <Form formTitle={formTitle} apiKey={apiKey || ""} />
      </div>
    </div>
  );
}

export default TextForm;
