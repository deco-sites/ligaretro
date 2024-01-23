import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "deco-sites/ligaretro/components/ui/Button.tsx";

export interface Props {
  productName?: string;
  skuID?: string;
}

function CustomizeModal() {
  const { displayCustomizePopup } = useUI();

  return (
    <Modal
      loading="lazy"
      open={displayCustomizePopup.value}
      onClose={() => displayCustomizePopup.value = false}
    >
      <div class="container flex bg-white p-5 w-fit gap-6 rounded-lg">
        <div class="p-10 bg-[#e7e7e7] rounded-lg">
          <Image
            src="https://ligaretro.vtexassets.com/assets/vtex.file-manager-graphql/images/96e3da9c-7ed8-4a6f-9f20-bfca9d58579c___fd8ee451f36ce4e437487da7af1dbb68.webp"
            alt="shirt template"
            width={335}
            height={400}
          />
        </div>
        <div class="flex flex-col justify-between">
          <span>Personalize do seu jeito</span>
          <div class="flex flex-col">
            <span class="font-bold">Cruzeiro 1966 Dirceu Lopes</span>
            <span class="text-xs">SKU: FLU754G</span>
          </div>
          <div class="flex flex-col gap-10">
            <div class="flex flex-col gap-4">
              <span class="text-xs">Adicione seu nome (R$ 10,00)</span>
              <div class="join">
                <input
                  name="nameShi"
                  class="input focus:border-[#A1A1A1] focus:outline-none  bg-none border border-[#A1A1A1] border-r-0 text-xs w-[230px] join-item rounded-l-lg"
                  type="text"
                  value={""}
                  maxLength={10}
                  placeholder={"Máximo 10 caracteres"}
                />
                <Button
                  class="  bg-transparent border border-[#A1A1A1] border-l-0 rounded-r-lg px-2 lg:px-0  w-[120px] h-[25px] rounded-md uppercase text-xs font-bold join-item"
                  type="submit"
                  htmlFor="nameShi"
                >
                  Aplicar
                </Button>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <span class="text-xs">Adicione seu número (R$ 10,00)</span>
              <div class="join">
                <input
                  name="nameShi"
                  class="input focus:border-[#A1A1A1] focus:outline-none  bg-none border border-[#A1A1A1] border-r-0 text-xs w-[230px] join-item rounded-l-lg"
                  type="number"
                  maxLength={2}
                  value={""}
                  placeholder={"Máximo 2 caracteres"}
                />
                <Button
                  class="  bg-transparent border border-[#A1A1A1] border-l-0 rounded-r-lg px-2 lg:px-0  w-[120px] h-[25px] rounded-md uppercase text-xs font-bold join-item"
                  type="submit"
                  htmlFor="nameShi"
                >
                  Aplicar
                </Button>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="flex flex-col font-semibold">
              <span class="text-xs">Valor Parcial</span>
              <span class="text-xl">R$ 0,00</span>
            </div>
            <Button class="bg-black text-white font-normal rounded-lg">
              Finalizar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function CustomizeShirt({ productName, skuID }: Props) {
  const { displayCustomizePopup } = useUI();

  return (
    <>
      <button
        class="btn btn-outline rounded-2xl"
        onClick={() => displayCustomizePopup.value = true}
      >
        Personalize
      </button>
      <CustomizeModal />
    </>
  );
}

export default CustomizeShirt;
