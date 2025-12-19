import { SendEventOnView } from "$store/components/Analytics.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { BreadcrumbList, Product, ProductDetailsPage, ProductLeaf, UnitPriceSpecification, } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductSizeSelector.tsx";
import RatingStars from "$store/components/ui/RatingStars.tsx";
import PDPShareButtons from "$store/islands/PDPShareButtons.tsx";
import CustomizeShirt from "$store/islands/CustomizeShirt.tsx";
import { AverageResponse, ratingLoader, } from "$store/loaders/Reviews/reviewsandratings.ts";
import { type SectionProps } from "@deco/deco";
interface Props {
    page: ProductDetailsPage | null;
    layout: {
        /**
         * @title Product Name
         * @description How product title will be displayed. Concat to concatenate product and sku names.
         * @default product
         */
        name?: "concat" | "productGroup" | "product";
    };
    customizeShirtText?: string;
}
export async function loader({ page, layout, customizeShirtText }: Props) {
    let rating = { average: 4, totalCount: 3 } as AverageResponse;
    let debug = {};
    try {
        rating = (await ratingLoader({
            productId: page!.product!.productID,
        })) as AverageResponse;
        // console.log({ ratinggg: rating });
    }
    catch (e) {
        debug = { ...debug, reviewsError: e };
        console.log({ e });
    }
    const bestInstallment = (acc: UnitPriceSpecification | null, curr: UnitPriceSpecification) => {
        if (curr.priceComponentType !== "https://schema.org/Installment") {
            return acc;
        }
        if (!acc) {
            return curr;
        }
        if (acc.price > curr.price) {
            return curr;
        }
        if (acc.price < curr.price) {
            return acc;
        }
        if (acc.billingDuration && curr.billingDuration &&
            acc.billingDuration < curr.billingDuration) {
            return curr;
        }
        return acc;
    };
    const installment = (specs: UnitPriceSpecification[]) => specs.reduce(bestInstallment, null);
    const isVariantOfMap = (isVariantOf: Product["isVariantOf"]) => {
        const hasVariant = isVariantOf?.hasVariant?.map((variant: ProductLeaf) => {
            const { offers, url, productID, additionalProperty } = variant;
            return {
                offers: {
                    ...offers,
                    offers: offers?.offers.filter((offer) => offer.seller === "1").map((offer) => {
                        const best = installment(offer.priceSpecification);
                        const specs = offer.priceSpecification.filter((spec) => ["https://schema.org/ListPrice"].includes(spec.priceType));
                        if (best) {
                            specs.push(best);
                        }
                        return ({
                            seller: offer.seller,
                            priceSpecification: specs.map((spec) => {
                                return {
                                    ...spec,
                                    price: spec.price,
                                    priceComponentType: spec.priceComponentType,
                                    priceType: spec.priceType,
                                    billingIncrement: spec.billingIncrement,
                                    billingDuration: spec.billingDuration,
                                };
                            }),
                            price: offer.price,
                            availability: offer.availability,
                        });
                    }),
                },
                url,
                productID,
                additionalProperty: additionalProperty?.filter((property) => (property.valueReference === "SPECIFICATION" &&
                    property.name === "Tamanho")),
            };
        });
        return {
            productGroupID: isVariantOf?.productGroupID,
            name: isVariantOf?.name,
            hasVariant,
        };
    };
    const product = {
        description: page?.product?.description,
        productID: page?.product?.productID,
        offers: page?.product?.offers,
        name: page?.product?.name,
        gtin: page?.product?.gtin,
        image: page?.product?.image?.filter((i) => i.name === "tabelaMedida"),
        sku: page?.product?.sku,
        additionalProperty: page?.product?.additionalProperty,
        isVariantOf: isVariantOfMap(page?.product?.isVariantOf),
        url: page?.product?.url,
    } as Product;
    return ({
        page: { ...page, product },
        layout,
        rating,
        debug,
        customizeShirtText,
    });
}
function ProductInfo({ page, layout, rating, debug, customizeShirtText }: SectionProps<typeof loader>) {
    const platform = usePlatform();
    const id = useId();
    if (page === null) {
        throw new Error("Missing Product Details Page Info");
    }
    const { breadcrumbList, product, } = page;
    const { productID, offers, name = "", gtin, sku, isVariantOf, additionalProperty = [], } = product;
    const description = product.description || isVariantOf?.description;
    const { price = 0, listPrice, seller = "1", installments, availability, } = useOffer(offers);
    const productGroupID = isVariantOf?.productGroupID ?? "";
    const discount = price && listPrice ? listPrice - price : 0;
    const percentageDiscount = listPrice
        ? Math.round((discount / listPrice) * 100)
        : 0;
    const breadcrumb = {
        ...breadcrumbList,
        itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
        numberOfItems: breadcrumbList!.numberOfItems - 1,
    } as BreadcrumbList;
    const eventItem = mapProductToAnalyticsItem({
        product,
        breadcrumbList: breadcrumb,
        price,
        listPrice,
    });
    const measureTable = product.image?.find((i) => i.name === "tabelaMedida")
        ? product.image?.find((i) => i.name === "tabelaMedida")
        : ({
            url: "https://ligaretro.vtexassets.com/assets/vtex.file-manager-graphql/images/5b092411-5da9-448c-8ea3-40a5e55b7331___dbfde0d71b47ed07f56c8a4152b88b3a.jpeg",
            alternateName: "Tabela de Medidas",
        });
    return (<div class="flex flex-col" style={{ maxWidth: "90vw" }} id={id}>
      {/* Share */}
      <PDPShareButtons />
      {/* Code and name */}
      <div class="mt-4 sm:mt-0">
        <h1>
          <span class="font-bold text-2xl capitalize">
            {layout?.name === "concat"
            ? `${isVariantOf?.name} ${name}`
            : layout?.name === "productGroup"
                ? isVariantOf?.name
                : name}
          </span>
        </h1>
        <div>
          {product.sku && (<span class="text-sm">
              SKU: {sku}
            </span>)}
        </div>
      </div>
      {/* Rating */}
      <div class="my-4">
        <RatingStars productId={"productInfo-" + productID} display="detailsPage" size="xs" average={rating.average} count={rating.totalCount}/>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-col">
          {(listPrice ?? 0) > price && (<span class="line-through text-base-300 text-xs">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>)}
          <div class="flex gap-2 items-center">
            <span class="font-semibold text-xl text-[#252525]">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
            {(listPrice ?? 0) > price && (<span class="text-xs text-green-700">
                ({percentageDiscount}% OFF)
              </span>)}
          </div>
        </div>
        {installments && installments !== "" && (<span class="text-sm text-[#252525]">
            <span class="font-bold">ou{" "}</span>
            {installments}
          </span>)}
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} sizeTableImg={{
            src: measureTable!.url!,
            alt: measureTable!.alternateName!,
        }}/>
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
            ? (<>
              {platform === "vtex" && (<>
                  <CustomizeShirt productName={`${isVariantOf?.name} ${name}`} skuID={sku} text={customizeShirtText}/>
                  <AddToCartButtonVTEX eventParams={{ items: [eventItem] }} productID={productID} seller={seller}/>
                  <WishlistButton classes="rounded-2xl" variant="full" productID={productID} productGroupID={productGroupID}/>
                </>)}
              {platform === "wake" && (<AddToCartButtonWake eventParams={{ items: [eventItem] }} productID={productID}/>)}
              {platform === "linx" && (<AddToCartButtonLinx eventParams={{ items: [eventItem] }} productID={productID} productGroupID={productGroupID}/>)}
              {platform === "vnda" && (<AddToCartButtonVNDA eventParams={{ items: [eventItem] }} productID={productID} additionalProperty={additionalProperty}/>)}
              {platform === "shopify" && (<AddToCartButtonShopify eventParams={{ items: [eventItem] }} productID={productID}/>)}
              {platform === "nuvemshop" && (<AddToCartButtonNuvemshop productGroupID={productGroupID} eventParams={{ items: [eventItem] }} additionalProperty={additionalProperty}/>)}
            </>)
            : <OutOfStock productID={productID}/>}
      </div>
      {/* Description card */}
      {description && (<div class="my-8 flex flex-col gap-3">
          <span class="text-sm font-semibold">Detalhes do Produto</span>
          <div class="text-sm ml-2 mt-2" dangerouslySetInnerHTML={{ __html: description }}/>
        </div>)}
      {/* Shipping Simulation */}
      <div class="mt-8">
        {platform === "vtex" && (<ShippingSimulation items={[{
                    id: Number(product.sku),
                    quantity: 1,
                    seller: seller,
                }]}/>)}
      </div>
      {/* Analytics Event */}
      <SendEventOnView id={id} event={{
            name: "view_item",
            params: {
                item_list_id: "product",
                item_list_name: "Product",
                items: [eventItem],
            },
        }}/>
    </div>);
}
export default ProductInfo;
