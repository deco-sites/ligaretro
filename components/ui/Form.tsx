import { invoke } from "$store/runtime.ts";
import { useState } from "preact/hooks";

export interface Props {
  formTitle: string;
  apiKey: string;
}

function TextForm({ formTitle, apiKey }: Props) {
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await invoke["deco-sites/ligaretro"].actions
        .sendEmail(
          {
            name,
            company,
            email,
            apiKey: apiKey || "",
          },
        );
      console.log({ data });
      alert(
        "Sua mensagem foi enviada! Em breve, entraremos em contato",
      );
      setLoading(false);
      setEmail("");
      setCompany("");
      setName("");
    } catch (e) {
      alert(
        "Sentimos muito! Houve um erro no envio do formulário. Por favor, tente outro método de contato",
      );
      console.log({ e });
      setLoading(false);
    }
  };

  return (
    <div class="max-w-[480px]">
      <form
        class="form-control justify-start gap-2 py-8 px-10 bg-[#931C31] rounded-xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <span class="text-sm text-white font-semibold w-[80%] mb-4">
          {formTitle}
        </span>
        <input
          placeholder="Nome completo"
          class="input input-bordered"
          name="name"
          value={name}
          onChange={(e) => e.target && setName(e.currentTarget.value)}
        />
        <input
          type="email"
          placeholder="Email da empresa"
          class="input input-bordered"
          value={email}
          onChange={(e) => e.target && setEmail(e.currentTarget.value)}
          name="email"
        />
        <input
          placeholder="Nome da Empresa"
          class="input input-bordered"
          name="company"
          value={company}
          onChange={(e) => e.target && setCompany(e.currentTarget.value)}
        />
        <button
          type={"submit"}
          class="btn bg-[#2B2B30] text-white mt-5 disabled:loading border-none"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default TextForm;
