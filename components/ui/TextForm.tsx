export interface Props {
  textSection: {
    title: string;
    /** @format html */
    text: string;
  };
  formTitle: string;
}

function TextForm({ textSection, formTitle }: Props) {
  return (
    <div
      id="formFranchise"
      class="container grid-cols-1 md:grid-cols-2 flex flex-col a md:flex-row my-24"
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
        <div class="max-w-[480px]">
          <form
            class="form-control justify-start gap-2 py-8 px-10 bg-[#931C31] rounded-xl text-white"
            onSubmit={() => alert("submitou")}
          >
            <span class="text-sm font-semibold w-[80%] mb-4">
              {formTitle}
            </span>

            <input
              placeholder="Nome completo"
              class="input input-bordered"
              name="name"
            />
            <input
              type="email"
              placeholder="Email da empresa"
              class="input input-bordered"
              name="email"
            />
            <input
              type="tel"
              placeholder="Nome completo"
              class="input input-bordered"
              name="name"
            />

            <button class="btn bg-[#2B2B30] text-white mt-5 disabled:loading border-none">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TextForm;
