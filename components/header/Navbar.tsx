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
import User from "$store/islands/User.tsx";
import LogOut from "$store/islands/LogOut.tsx";
import { Device } from "deco/utils/userAgent.ts";

function Navbar({ items, searchbar, logo, buttons, device }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: Logo;
  buttons: Buttons;
  device: Device;
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: "83px" }}
        class="lg:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-2 gap-2"
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
              class={"object-cover "}
              style={"margin-left:1.5rem"}
              src={logo.mobileSrc || logo.src}
              alt={logo.alt}
              width={logo.mobilewidth || 127}
              height={logo.mobileheight || 91}
              loading={"lazy"}
              decoding={"async"}
              preload={false}
              fetchPriority={"low"}
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
      {device == "desktop" && (
        <div class="hidden lg:flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 h-[115px]">
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
                  loading={"lazy"}
                  decoding={"async"}
                />
              </a>
            )}
          </div>
          <div class="flex-auto flex justify-center lg:h-[115px]">
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
                    <User />
                  </li>
                  <li>
                    <LogOut />
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
      )}
    </>
  );
}

export default Navbar;
