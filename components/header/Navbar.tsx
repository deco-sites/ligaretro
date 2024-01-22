import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "$store/islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { Buttons, Logo } from "$store/components/header/Header.tsx";

function Navbar({ items, searchbar, logo, buttons }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: Logo;
  buttons: Buttons;
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: "73px" }}
        class="lg:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={83}
              height={60}
            />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6">
        <div class="flex-none w-44">
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block px-4 py-3 w-[160px]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 126}
                height={logo.height || 16}
              />
            </a>
          )}
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          {!buttons?.hideSearchButton && <SearchButton />}

          <Searchbar searchbar={searchbar} />
          {!buttons?.hideAccountButton && (
            <div class="dropdown dropdown-end">
              {/* <div role="button" class="btn btn-ghost rounded-btn">Dropdown</div> */}
              <button
                tabindex={0}
                role="button"
                class="btn btn-circle btn-sm btn-ghost"
                aria-label="Account"
              >
                <Icon id="User" size={24} strokeWidth={0.4} />
              </button>
              <ul
                tabindex={0}
                class="menu dropdown-content z-[1] p-4 shadow-sm shadow-[#9c9c9c] bg-base-100 rounded-box w-52 mt-4 gap-3"
              >
                <li>
                  <a
                    href="/login"
                    class="btn btn-primary bg-[#252525] text-xs font-normal items-center flex-col justify-center pt-[15px]"
                  >
                    Acessar minha conta
                  </a>
                </li>
                <li>
                  <a href="/login" class="inline text-[9px] no-underline">
                    Não tem cadastro? <span class="underline">Criar conta</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
          {!buttons?.hideWishlistButton && (
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/favoritos"
              aria-label="Favoritos"
            >
              <Icon id="Heart" size={24} strokeWidth={1.4} fill="none" />
            </a>
          )}
          {!buttons?.hideCartButton && (
            <>
              {platform === "vtex" && <CartButtonVTEX />}
              {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "linx" && <CartButtonLinx />}
              {platform === "shopify" && <CartButtonShopify />}
              {platform === "nuvemshop" && <CartButtonNuvemshop />}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
