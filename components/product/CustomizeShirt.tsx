import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "deco-sites/ligaretro/components/ui/Button.tsx";
import { useState } from "preact/hooks";
import { invoke } from "$store/runtime.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";

export interface Props {
  productName: string;
  skuID: string;
}

function CustomizeModal({ productName, skuID }: Props) {
  const {
    displayCustomizePopup,
    productNameAttachment,
    productNumberAttachment,
    displayCart,
  } = useUI();

  const { addItems, addItemAttachment, cart } = useCart();

  const {
    items = [],
  } = cart.value ?? {};

  const [shirtName, setShirtName] = useState("");
  const [shirtNumber, setShirtNumber] = useState("");
  const [partialValue, setPartialValue] = useState(0);
  const [loadingFinish, setLoadingFinish] = useState(false);

  const handleApplyName = () => {
    let partialCount = partialValue;

    const nameInput = document.getElementById("nameShirt") as HTMLInputElement;

    if (shirtName === "" && nameInput.value !== "") {
      partialCount += (productNameAttachment.value.price) / 100;
    }
    if (shirtName !== "" && nameInput.value === "") {
      partialCount -= (productNameAttachment.value.price) / 100;
    }

    setShirtName(nameInput.value);
    setPartialValue(partialCount);
  };

  const handleApplyNumber = () => {
    let partialCount = partialValue;

    const numberInput = document.getElementById(
      "numberShirt",
    ) as HTMLInputElement;

    if (shirtNumber === "" && numberInput.value !== "") {
      partialCount += (productNumberAttachment.value.price) / 100;
    }
    if (shirtNumber !== "" && numberInput.value === "") {
      partialCount -= (productNumberAttachment.value.price) / 100;
    }

    setShirtNumber(numberInput.value);
    setPartialValue(partialCount);
  };

  const handleCancel = () => {
    setShirtNumber("");
    setShirtName("");
    setPartialValue(0);
    displayCustomizePopup.value = false;
  };

  const handleFinish = () => {
    setLoadingFinish(true);
    if (shirtName !== "" || shirtNumber !== "") {
      const index = items.findIndex((obj) => obj.id === skuID);

      console.log({ index });

/*    const options = {
        method: 'POST',
        body: JSON.stringify({
          id: "1408" // offerings.id
        }),
      }

      fetch( 
      `/api/checkout/pub/orderForm/${orderFormId}/items/${index}/offerings`,
        options
      ) */

/*  const options = {
        method: 'POST',
        body: JSON.stringify({
          content: {
            Nome: 'Guilherme',
          },
        }),
      }
      
      fetch( 
      `/api/checkout/pub/orderForm/${orderFormId}/items/${index}/bundles/${offerings.id}/attachments/${attachmentName}`,
        options
      ) */



      displayCustomizePopup.value = false;
      displayCart.value = true;
    } else {
      displayCustomizePopup.value = false;
    }
  };

  return (
    <Modal
      loading="lazy"
      open={displayCustomizePopup.value}
      onClose={() => displayCustomizePopup.value = false}
    >
      <div class="absolute container flex flex-col lg:flex-row bg-white p-5 w-fit gap-6 rounded-lg">
        <div class="p-10 bg-[#e7e7e7] rounded-lg relative">
          <span class="absolute left-1/2 transform -translate-x-1/2 bottom-[1%] text-xs w-full text-center">
            Imagem Ilustrativa - Aplicação será no modelo escolhido
          </span>
          {shirtName !== "" && (
            <span class="absolute left-1/2 transform -translate-x-1/2 uppercase top-[23%] font-bold text-xl sm:text-2xl">
              {shirtName}
            </span>
          )}
          {shirtNumber && (
            <span class="absolute text-6xl left-1/2 transform -translate-x-1/2 uppercase top-[29%] font-bold text-[100px] sm:text-[120px]">
              {shirtNumber}
            </span>
          )}
          <Image
            src="https://ligaretro.vtexassets.com/assets/vtex.file-manager-graphql/images/96e3da9c-7ed8-4a6f-9f20-bfca9d58579c___fd8ee451f36ce4e437487da7af1dbb68.webp"
            alt="shirt template"
            width={335}
            height={400}
          />
        </div>
        <div class="flex flex-col justify-between">
          <span>Personalize do seu jeito</span>
          <div class="flex flex-col mb-5 lg:mb-0">
            <span class="font-bold">{productName}</span>
            <span class="text-xs">SKU: {skuID}</span>
          </div>
          <div class="flex flex-col gap-5 lg:gap-10">
            {productNameAttachment.value &&
              productNameAttachment.value.name != "" && (
              <div class="flex flex-col gap-4">
                <span class="text-xs">
                  Adicione um nome (R${" "}
                  {(productNameAttachment.value.price / 100).toFixed(2)})
                </span>
                <div class="join">
                  <input
                    name="nameShirt"
                    id="nameShirt"
                    class="input focus:border-[#A1A1A1] focus:outline-none  bg-none border border-[#A1A1A1] border-r-0 text-xs join-item rounded-l-lg w-full"
                    type="text"
                    value={shirtName}
                    maxLength={10}
                    placeholder={"Máximo 10 caracteres"}
                  />
                  <Button
                    class="  bg-transparent border border-[#A1A1A1] border-l-0 rounded-r-lg px-2 lg:px-0  w-[120px] h-[25px] rounded-md uppercase text-xs font-bold join-item"
                    type="submit"
                    htmlFor="nameShirt"
                    onClick={handleApplyName}
                  >
                    Aplicar
                  </Button>
                </div>
              </div>
            )}
            {productNumberAttachment.value &&
              productNumberAttachment.value.name != "" && (
              <div class="flex flex-col gap-4">
                <span class="text-xs">
                  Adicione um número (R${" "}
                  {(productNumberAttachment.value.price / 100).toFixed(2)})
                </span>
                <div class="join">
                  <input
                    name="numberShirt"
                    id="numberShirt"
                    class="input focus:border-[#A1A1A1] focus:outline-none  bg-none border border-[#A1A1A1] border-r-0 text-xs join-item rounded-l-lg w-full"
                    type="text"
                    min={0}
                    max={99}
                    maxLength={2}
                    pattern="[0-99]*"
                    value={shirtNumber}
                    placeholder={"Máximo 2 caracteres"}
                  />
                  <Button
                    class="  bg-transparent border border-[#A1A1A1] border-l-0 rounded-r-lg px-2 lg:px-0  w-[120px] h-[25px] rounded-md uppercase text-xs font-bold join-item"
                    type="submit"
                    htmlFor="numberShirt"
                    onClick={handleApplyNumber}
                  >
                    Aplicar
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div class="flex justify-between mt-5 lg:mt-0">
            <div class="flex flex-col font-semibold">
              <span class="text-xs">Valor Parcial</span>
              <span class="text-xl">R$ {partialValue.toFixed(2)}</span>
            </div>
            <div class="flex">
              <Button
                class="btn btn-ghost underline text-xs"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                class="bg-black text-white font-normal rounded-lg"
                onClick={handleFinish}
              >
                {loadingFinish ? "Carregando..." : "Finalizar"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function CustomizeShirt({ productName, skuID }: Props) {
  const {
    displayCustomizePopup,
    productNameAttachment,
    productNumberAttachment,
  } = useUI();
  const [modalFirstTime, setModalFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attachmentOfferings, setAttachmentOfferings] = useState([]);

  const openModal = async () => {
    setIsLoading(true);
    const { addItems } = useCart();

    if (!modalFirstTime) {
      const r: unknown = await invoke["deco-sites/ligaretro"].actions
        .getProductAttachments({ id: skuID });
      setModalFirstTime(true);

      const offerings = r.items[0].offerings.map((o: unknown) => {
        return {
          name: o.name,
          price: o.price,
        };
      });

      console.log({ offerings });

      productNameAttachment.value = offerings.find((o: unknown) =>
        o.name === "Nome"
      );
      productNumberAttachment.value = offerings.find((o: unknown) =>
        o.name === "Número"
      );

      //add product to cart
      addItems({
        orderItems: [{
          id: skuID,
          seller: "1",
          quantity: 1,
        }],
      });

      setAttachmentOfferings(offerings);
      setIsLoading(false);
    }
    displayCustomizePopup.value = true;
  };

  return (
    <>
      <button
        class="btn btn-outline rounded-2xl"
        onClick={openModal}
      >
        {isLoading ? "Carregando..." : "Personalize"}
      </button>
      <CustomizeModal
        productName={productName}
        skuID={skuID}
      />
    </>
  );
}

export default CustomizeShirt;
