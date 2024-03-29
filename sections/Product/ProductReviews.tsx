import RatingStars from "$store/components/ui/RatingStars.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import {
  ResponseReviews,
  Reviews,
} from "$store/loaders/Reviews/reviewsandratings.ts";
import { default as reviewsLoader } from "$store/loaders/Reviews/reviewsandratings.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/mod.ts";
import NewReviewForm from "$store/islands/NewReviewForm.tsx";
import LoginToReview from "$store/islands/LoginToReview.tsx";

export interface Props {
  borderRoundedBot?: boolean;
  page: ProductDetailsPage | null;
}

export async function loader(
  { page, borderRoundedBot }: Props,
  _req: Request,
) {
  let reviews = {} as ResponseReviews;
  let debug = {};

  try {
    reviews = (await reviewsLoader({
      productId: page!.product!.productID,
    })) as ResponseReviews;
    // console.log({ reviewsss: reviews });
  } catch (e) {
    debug = { ...debug, reviewsError: e };
  }

  return {
    page,
    borderRoundedBot,
    reviews,
    debug,
  };
}

const formatDate = (date: Date) => {
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
};

const ReviewsList = (
  { productId, reviews }: {
    productId: string;
    reviews: Reviews[];
  },
) => {
  return (
    <div>
      {reviews.map((r, i) => (
        <div class="grid grid-cols-5 border-t border-[#dadada] py-8">
          <div class="flex flex-col col-span-1 mt-1">
            <span class="font-semibold">{r.reviewerName}</span>
            <div class="text-blue-500 flex items-center gap-1">
              <Icon id="SecureCircle" height={12} width={12} />
              <span class="text-xs">Compra Verificada</span>
            </div>
          </div>
          <div class="col-span-4 flex flex-col">
            <div class="flex justify-between mb-3">
              <div class="flex items-center gap-3">
                <span class="font-bold italic">"{r.title}"</span>
                <RatingStars
                  productId={`${i}-${productId}`}
                  average={r.rating}
                  display="reviews"
                />
              </div>
              <span class="text-[#828282] text-xs">
                {formatDate(new Date(r.reviewDateTime))}
              </span>
            </div>
            <span class="text-[#828282] italic">{r.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const NoReviews = () => {
  return (
    <div class="flex p-5 sm:p-0 justify-center items-center bg-[#e5e5e5] mb-4 h-28">
      <h3>Este produto ainda não possui avaliações.</h3>
    </div>
  );
};

function ProductReviews(
  { page, reviews, debug, borderRoundedBot }: SectionProps<typeof loader>,
) {
  const productId = page!.product.productID;
  const userHasReviewed = false;
  // const rreviews: Reviews = [
  //   {
  //     reviewerName: "Sônia Soares",
  //     verifiedPurchase: true,
  //     reviewTitle: "Satisfeira com a compra!",
  //     reviewText:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nibh dui, tempor vel elementum at, suscipit quis tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris pulvinar commodo dictum. In accumsan vitae velit sit amet consequat. Nullam pellentesque malesuada erat nec rutrum.",
  //     reviewDate: new Date(),
  //     rating: 4,
  //   },
  //   {
  //     reviewerName: "Sônia Soares",
  //     verifiedPurchase: true,
  //     reviewTitle: "Satisfeira com a compra!",
  //     reviewText:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nibh dui, tempor vel elementum at, suscipit quis tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris pulvinar commodo dictum. In accumsan vitae velit sit amet consequat. Nullam pellentesque malesuada erat nec rutrum.",
  //     reviewDate: new Date(),
  //     rating: 4,
  //   },
  // ];

  return (
    <section class="container my-14">
      <div
        class={`bg-white max-w-[90%] lg:max-w-[100%] p-5 lg:pb-5 pt-[2px] lg:p-12  border border-[#cecece]`}
      >
        <h3 class="uppercase my-5">
          Avaliações do produto
        </h3>
        {Boolean(reviews.data?.length) && (
          <div class="flex justify-start mb-6">
            <RatingStars
              productId={"averageReviews-" + productId}
              display="detailsPage"
              average={reviews.averageRating!.average}
              count={reviews.averageRating!.totalCount}
            />
            {
              /* <div class="flex gap-2">
              <select class="select select-bordered w-full max-w-xs">
                <option disabled selected>Ordenar</option>
                <option>Mais Recente</option>
                <option>Mais Antiga</option>
                <option>Mais Estrelas</option>
                <option>Menos Estrelas</option>
              </select>
              <select class="select select-bordered w-full max-w-xs">
                <option disabled selected>Qualificação</option>
                <option>1 estrela</option>
                <option>2 estrelas</option>
                <option>3 estrelas</option>
                <option>4 estrelas</option>
                <option>5 estrelas</option>
              </select>
            </div> */
            }
          </div>
        )}
        <div>
          {reviews.data?.length
            ? <ReviewsList productId={productId} reviews={reviews.data} />
            : <NoReviews />}
        </div>
        <div class="flex flex-col gap-2">
          {
            /* <span class="text-[#006299] cursor-pointer">
              Mostrar todas avaliações
            </span> */
          }
          <LoginToReview />
          <NewReviewForm
            productId={productId}
            userHasReviewed={reviews.userHasReviewed || false}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductReviews;
