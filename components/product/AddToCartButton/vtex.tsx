import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  styles?: string;
}

function AddToCartButton({ seller, productID, eventParams, styles }: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: 1,
      }],
    });

  return (
    <Button
      classes={`${styles} rounded-2xl bg-[#252525] text-white font-normal`}
      onAddItem={onAddItem}
      eventParams={eventParams}
    />
  );
}

export default AddToCartButton;
