import Icon from "$store/components/ui/Icon.tsx";

interface BenefitText {
  /** @format html */
  text: string;
}

interface Plan {
  title: string;
  price: number;
  recurrencyPeriod: string;
  benefits: BenefitText[];
  bestOption?: boolean;
}

export interface Props {
  /** @format html */
  title: string;
  oneShirtPlans: Plan[];
  twoShirtsPlans: Plan[];
  termsConditionsLink?: string;
}

export default function TopicsSection(
  { title, oneShirtPlans, twoShirtsPlans, termsConditionsLink }: Props,
) {
  return (
    <div class="bg-[#292929] py-20">
      <div class="container flex flex-col gap-[80px]">
        <div class="flex justify-center">
          <span
            class="w-[50%] text-2xl font-semibold text-white text-center"
            dangerouslySetInnerHTML={{ __html: title || "" }}
          >
          </span>
        </div>
        <div class="flex gap-3 justify-center">
          <div class="w-fit px-5 py-2 rounded-full bg-[#BFB78D]">
            <span class="font-semibold text-lg">01 camisa por mês</span>
          </div>
          <div class="w-fit px-5 py-2 rounded-full bg-[#BFB78D]">
            <span class="font-semibold text-lg">02 camisa por mês</span>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="grid-cols-4 flex flex-col md:flex-row gap-2 w-[1200px]">
            {oneShirtPlans.map((p) => {
              return (
                <div
                  class={`${
                    p.bestOption && "bg-[#BFB78D]"
                  } rounded-3xl flex flex-col justify-end`}
                >
                  {p.bestOption && (
                    <span class="uppercase text-xl font-bold text-center py-3 text-white">
                      Melhor Custo
                    </span>
                  )}
                  <div class="col-span-1 flex justify-center">
                    <div class="rounded-3xl border-[3px] border-[#BFB78D] bg-[#292929] p-5 flex flex-col text-white gap-6">
                      <div>
                        <span class="font-semibold text-lg">
                          {p.title}
                        </span>
                      </div>
                      <div>
                        <span class="text-[40px] font-semibold">
                          R$ {p.price.toFixed(2)}
                          <span class="text-sm">/{p.recurrencyPeriod}</span>
                        </span>
                      </div>
                      {p.benefits.map((b) => {
                        return (
                          <div class="flex items-start gap-2 text-white">
                            <div>
                              <Icon size={22} id="checkIcon" />
                            </div>
                            <div
                              class=""
                              dangerouslySetInnerHTML={{ __html: b.text || "" }}
                            />
                          </div>
                        );
                      })}
                      <div class="mt-5">
                        <button class="btn p-5 bg-white text-[#292929] rounded-full w-full">
                          Assinar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div class="flex justify-center">
          <span class="text-white">
            <a
              target="_blank"
              class="text-[#BFB78D] underline"
              href={termsConditionsLink ? termsConditionsLink : "#"}
            >
              Ler os temos e condições
            </a>{" "}
            do Liga Retrô Royal Club
          </span>
        </div>
      </div>
    </div>
  );
}
