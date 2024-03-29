import Button from "$store/components/ui/Button.tsx";
import { useCallback, useState } from "preact/hooks";
import { invoke } from "$store/runtime.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";

export interface Props {
  productId: string;
  userHasReviewed: boolean;
}

const Form = ({ productId }: { productId: string }) => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [reviewerName, setReviewerName] = useState<string | undefined>(
    undefined,
  );
  const [text, setText] = useState<string | undefined>(undefined);
  const [rating, setRating] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);

  const createReview = useCallback(async (body: {
    productId: string;
    rating: number;
    title: string;
    text: string;
    reviewerName: string;
  }) => {
    setIsLoading(true);
    const data = await invoke["deco-sites/ligaretro"].actions.createReview(
      body,
    );
    setFormSent(true);
    setText(undefined);
    setReviewerName(undefined);
    setTitle(undefined);
    setIsLoading(false);
    // console.log({ createReturn: data });
  }, []);

  return (
    <form
      className="form-control w-full  mt-8"
      onSubmit={(e) => {
        e.preventDefault();
        createReview({
          text: text!,
          title: title!,
          rating,
          reviewerName: reviewerName!,
          productId,
        });
      }}
    >
      <h2 class="font-bold uppercase">Adicionar avaliação</h2>
      <label className="label mt-4">
        <span className="text-xl font-normal">
          Título
        </span>
      </label>
      <input
        type="text"
        value={title}
        className="input input-bordered w-full font-normal border-[#808080]"
        onClick={() => {
          if (!title) setTitle("");
        }}
        onChange={(e) => e.target && setTitle(e.currentTarget.value)}
        required
      />
      {title?.length == 0 && (
        <p class="text-red-500 text-sm">
          Escreva um título para a sua avaliação
        </p>
      )}
      <div class="mt-4">
        <label className="label mt-4">
          <span className="font-normal pb-0">
            Avalie o produto de 1 a 5 estrelas
          </span>
        </label>
        <div className="rating mt-2">
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(1)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(2)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(3)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(4)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star cursor-default"
            onClick={() => setRating(5)}
          />
        </div>

        <label className="label mt-4">
          <span className="font-normal">Seu nome</span>
        </label>
        <input
          type="text"
          value={reviewerName}
          className="input input-bordered w-full font-normal text-lg border-[#808080]"
          onClick={() => {
            if (!reviewerName) setReviewerName("");
          }}
          onChange={(e) => e.target && setReviewerName(e.currentTarget.value)}
          required
        />
        {reviewerName?.length == 0 && (
          <p class="text-red-500 text-sm">Informe seu nome</p>
        )}
        <label className="label mt-4">
          <span className="font-normal">Escreva uma avaliação</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full font-normal text-lg border-[#808080] h-36"
          value={text}
          onClick={() => {
            if (!text) setText("");
          }}
          onChange={(e) => e.target && setText(e.currentTarget.value)}
          required
        >
        </textarea>
        {text?.length == 0 && (
          <p class="text-red-500 text-sm">
            Escreva um comentário para a sua avaliação
          </p>
        )}
      </div>
      <div class="text-left">
        {formSent
          ? <span class="text-green-600">Sua avaliação foi enviada!</span>
          : (
            <Button
              class="btn btn-primary bg-[#008000] w-fit mt-6"
              type={"submit"}
              aria-label={"Enviar avaliação"}
            >
              {isLoading
                ? <span class="loading loading-spinner loading-sm"></span>
                : ("Enviar avaliação")}
            </Button>
          )}
      </div>
    </form>
  );
};

const NewReviewForm = ({ productId, userHasReviewed }: Props) => {
  const { user } = useUser();
  // const isLogged = true;
  const isLogged = Boolean(user.value?.email);

  return (
    <div>
      {isLogged && (
        <div class="text-left mt-4">
          <div
            tabIndex={0}
            className="collapse collapse-arrow bg-white rounded-none shadow-none font-semibold text-base p-0 text-black"
          >
            <input type="checkbox" className="peer" />
            <div className="collapse-title font-medium w-60 bg-black text-white peer-checked:bg-white peer-checked:text-black peer-checked:border peer-checked:border-black">
              Escreva uma avaliação
            </div>
            <div className="collapse-content transition duration-[800ms]">
              {userHasReviewed
                ? (
                  <div>
                    <span>
                      Você já enviou uma avaliação para este produto
                    </span>
                  </div>
                )
                : <Form productId={productId} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewReviewForm;
