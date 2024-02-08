/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from '@preact/signals';

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchPopup = signal(false);
const displayCustomizePopup = signal(false);
const displaySizeTablePopup = signal(false);
const displaySearchDrawer = signal(false);
const productNameAttachment = signal({ name: '', price: 0, id: '' });
const productNumberAttachment = signal({ name: '', price: 0, id: '' });

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displayCustomizePopup,
  displaySizeTablePopup,
  displaySearchDrawer,
  productNameAttachment,
  productNumberAttachment,
};

// Keyboard event listeners
addEventListener('keydown', (e: KeyboardEvent) => {
  const isK = e.key === 'k' || e.key === 'K' || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
