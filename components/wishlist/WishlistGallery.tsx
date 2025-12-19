import SearchResult, {
  loader as searchLoader,
  Props as SearchResultProps,
} from "$store/components/search/SearchResult.tsx";
import { AppContext } from "site/apps/site.ts";

export type Props = SearchResultProps;

function WishlistGallery(props: Props) {
  const isEmpty = !props.page || props.page.products.length === 0;

  if (isEmpty) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">
            Sua Lista de Favoritos está vazia
          </span>
          <span>
            Faça login e favorite itens. Eles aparecerão aqui.
          </span>
        </div>
      </div>
    );
  }

  //necessary fix after implementing loader in SearchResult, because SearchResults receives a loader return as props...
  const returnArgs = { ...props } as ReturnType<typeof searchLoader>;

  return <SearchResult {...returnArgs} />;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const productIds = props.page?.products.map((product) => product.sku);
  if (!productIds || productIds.length === 0) {
    return props;
  }

  const response = await ctx.invoke.vtex.loaders.intelligentSearch.productList({
    props: {
      ids: productIds,
    },
  });

  if (!props.page || !response) {
    return props;
  }

  props.page.products = response;
  props.pageTitle = "Favoritos";

  return props;
};

export default WishlistGallery;
