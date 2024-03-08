import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
  mobilewidth?: number;
  mobileheight?: number;
}
export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface Props {
  // alerts: string[];
  freeShippingTarget: number;

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: Logo;

  buttons: Buttons;
  alertLinks: {
    firstLink: {
      text: string;
      href: string;
    };
    secondLink: {
      text: string;
      href: string;
    };
    hideFirstLink: boolean;
    hideSecondLink: boolean;
  };
  hideAlert?: boolean;
}

function Header({
  // alerts,
  searchbar,
  navItems,
  logo,
  freeShippingTarget,
  buttons,
  alertLinks,
  hideAlert,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <header class="h-[73px] lg:h-[111px]">
      <Drawers
        menu={{ items }}
        searchbar={searchbar}
        platform={platform}
        freeShippingTarget={freeShippingTarget}
      >
        <div class="bg-base-100 fixed w-full z-50">
          {/* {alerts.length > 0 && <Alert alerts={alerts} />} */}
          {!hideAlert && <Alert links={alertLinks} />}

          <Navbar
            items={items}
            searchbar={searchbar && { ...searchbar, platform }}
            logo={logo}
            buttons={buttons}
          />
        </div>
      </Drawers>
    </header>
  );
}

export default Header;
