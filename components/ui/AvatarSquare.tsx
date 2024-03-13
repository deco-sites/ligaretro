/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "bg-neutral-focus text-neutral-content ring-neutral-focus ",
  "disabled": "bg-base-100 text-primary",
  "default": "bg-base-100 text-primary",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
  size?: "large" | "small" | "tall";
  darkBackground?: boolean;
  darkBackgroundColor?: string;
}

function Avatar(
  { content, variant = "default", size, darkBackground, darkBackgroundColor }:
    Props,
) {
  const variants = {
    active: darkBackground
      ? ` bg-white !text-[${darkBackgroundColor}]`
      : `ring ring-1 ring-offset-base-100 ring-offset-2 bg-[#252525] text-white`,
    disabled:
      `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""] !text-[#252525]`,
    default: darkBackground
      ? "border border-white hover:border-primary !bg-transparent !text-white"
      : `border border-base-200 hover:border-primary !text-[#252525]`,
  };

  return (
    <div class="avatar placeholder text-xs">
      <div
        class={`rounded-sm ${size === "large" && "w-[91px] h-[50px]"} ${
          size === "tall" ? "w-10 h-12" : "w-10 h-8"
        } ${colors[content] ?? colors[variant]} ${variants[variant]}`}
      >
        <span class={`uppercase font-semibold`}>
          {colors[content] ? "" : content.substring(0, 3)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
