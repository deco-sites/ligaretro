export interface Props {
  id: string;
}

export const getProductAttachments = async (
  props: Props,
  _req: Request,
): Promise<unknown | null> => {
  try {
    const response = await fetch(
      "http://ligaretro.vtexcommercestable.com.br/api/checkout/pub/orderForms/simulation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: props.id,
              quantity: 1,
              seller: "1",
            },
          ],
          country: "BRA",
        }),
      },
    );

    return response.json();
  } catch (e) {
    // console.log({ e });
    return e;
  }
};

export default getProductAttachments;
