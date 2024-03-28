import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  img: {
    src: string;
    alt: string;
  };
}

const SizeTableModal = ({ img }: Props) => {
  const { displaySizeTablePopup } = useUI();
  return (
    <Modal
      loading="lazy"
      open={displaySizeTablePopup.value}
      onClose={() => displaySizeTablePopup.value = false}
    >
      <div
        class="absolute top-0 bg-base-100 container w-fit px-10 pb-10 pt-5 rounded-lg"
        style={{ marginTop: 60 }}
      >
        <div class="flex justify-end mb-2">
          <Icon
            id="XMark"
            size={24}
            strokeWidth={2}
            onClick={() => displaySizeTablePopup.value = false}
          />
        </div>
        <Image
          class=""
          sizes="(max-width: 920px) 100vw, 40vw"
          style={{ aspectRatio: "858/622" }}
          src={img.src}
          alt={img.alt}
          width={920}
          height={671}
          // Preload LCP image for better web vitals
          // preload={index === 0}
          loading="lazy"
        />
      </div>
    </Modal>
  );
};

const SizeTableButton = ({ img }: Props) => {
  const { displaySizeTablePopup } = useUI();

  return (
    <>
      <button
        class="btn btn-outline w-fit rounded-full border-[#d9d9d9] hover:bg-[#252525]"
        aria-label={"Ruler"}
        onClick={() => displaySizeTablePopup.value = true}
      >
        <Icon id="Ruler" size={24} class="mr-1" />
        <span class="text-sm font-normal">Tabela de Medidas</span>
      </button>
      <SizeTableModal img={img} />
    </>
  );
};

export default SizeTableButton;
