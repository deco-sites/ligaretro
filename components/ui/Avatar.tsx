import Icon from "$store/components/ui/Icon.tsx";

/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-claro": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "branco": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "grena": "bg-[#800000] ring-[#800000]",
  "azul": "bg-blue-600 ring-blue-600",
  "verde": "bg-green-500 ring-green-500",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "amarelo": "bg-[#FFFF00] ring-[#FFFF00]",
  "verde-escuro": "bg-[#006400] ring-[#006400]",
  "vermelho": "bg-[#FF0000] ring-[#FF0000]",
  "azul-royal": "bg-[#4169E1] ring-[#4169E1]",
  "azul-celeste": "bg-[#87CEEB] ring-[#87CEEB]",
  "verde-limao": "bg-[#32CD32] ring-[#32CD32]",
  "vermelho-bordeaux": "bg-[#800020] ring-[#800020]",
  "rosa": "bg-[#FFC0CB] ring-[#FFC0CB]",
  "roxo": "bg-[#800080] ring-[#800080]",
  "preta": "bg-[#161616] ring-[#161616]",
  "preto": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",
  "verde---preto":
    "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-black via-transparent to-green-600",
  "preto---vermelho":
    "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-black via-transparent to-red-600",
  "verde---amarelo":
    "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-green-600 via-transparent to-yellow-600",
  "tricolor":
    "bg-gradient-to-r from-[#ad0505_0%] via-[#FFFFFF_33%] to-[#000000_100%] ring-[#32CD32]",
  "bege": "bg-[#F5F5DC] ring-[#F5F5DC]",
  "branco-vermelho":
    "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-transparent to-red-600",
  "branco---azul-claro":
    "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-transparent to-blue-200",
  "amarelo---verde":
    "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-yellow-600 via-transparent to-green-600",
  "bco-pto":
    "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-black via-transparent to-white",
  "verde---vermelho---amarel":
    "bg-gradient-to-r from-[#32CD32] via-[#FF0000] to-[#FFFF00] ring-[#32CD32]",
  // Color variants - only applied when no color as content is passed
  "active": "bg-neutral-focus text-neutral-content ring-neutral-focus ",
  "disabled": "bg-neutral-content text-neutral",
  "default": "bg-base-100 text-primary",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "ring ring-1 ring-offset-base-100 ring-offset-2",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-base-200 hover:border-primary",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder text-xs">
      <div
        class={`rounded-full w-6 h-6 ${colors[content] ?? colors[variant]} ${
          variants[variant]
        }`}
      >
        <span class="hidden">{content}</span>
        {content === "listrado"
          ? <Icon id="Stripped" size={32} />
          : (
            <span class="uppercase">
              {colors[content] ? "" : content.substring(0, 2)}
            </span>
          )}
      </div>
    </div>
  );
}

export default Avatar;
