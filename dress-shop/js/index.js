import BurgerMenu from "./burger.js";

new BurgerMenu({
  BURGER: "burger",
  BURGER_OPEN: "burger--open",
  HEADER_MENU: "header__menu",
  HEADER_MENU_OPEN: "header__menu--open",
  lABEL: {
    OPEN: "Открыть меню",
    CLOSE: "Закрыть меню",
  },
  PAGE_BODY: "page__body",
  PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
  MENU_LINK: "menu__link",
  BREAKPOINT: 760,
});

const purchaseButton = document.querySelector(".hero__button");
const purchaseModal = document.querySelector(".purchase-modal");
const closeModalButton = document.querySelector(".purchase-modal__close");
const modalOverlay = document.querySelector(".purchase-modal__overlay");
const purchaseForm = document.querySelector(".purchase-modal__form");
const nameInput = document.querySelector("#purchase-name");
const emailInput = document.querySelector("#purchase-email");
const phoneInput = document.querySelector("#purchase-phone");
const successMessage = document.querySelector(".purchase-modal__success");

const openPurchaseModal = () => {
  purchaseForm.reset();
  successMessage.classList.remove("purchase-modal__success--visible");
  purchaseModal.classList.add("purchase-modal--open");
  document.body.classList.add("page__body--no-scroll");
};
const closePurchaseModal = () => {
  purchaseModal.classList.remove("purchase-modal--open");
  document.body.classList.remove("page__body--no-scroll");
};

purchaseButton.addEventListener("click", openPurchaseModal);
closeModalButton.addEventListener("click", closePurchaseModal);
modalOverlay.addEventListener("click", closePurchaseModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePurchaseModal();
  }
});

purchaseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) {
    return;
  }

  successMessage.textContent = `Спасибо, ${name}! Ваша заявка успешно заполнена.`;
  successMessage.classList.add("purchase-modal__success--visible");
  purchaseForm.reset();
});

const scrollTopButton = document.querySelector(".scroll-top");

const toggleScrollTopButton = () => {
  if (window.scrollY > 300) {
    scrollTopButton.classList.add("scroll-top--visible");
  } else {
    scrollTopButton.classList.remove("scroll-top--visible");
  }
};

window.addEventListener("scroll", toggleScrollTopButton);
toggleScrollTopButton();

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const favoriteButtons = document.querySelectorAll(".product-card__favorite");
const favoriteProducts = [];

favoriteButtons.forEach((favoriteButton) => {
  favoriteButton.addEventListener("click", () => {
    const productCard = favoriteButton.closest(".product-card");

    const productTitle = productCard
      .querySelector(".product-card__title")
      .textContent.trim();

    const favoriteIcon = favoriteButton.querySelector(
      ".product-card__favorite-icon",
    );

    const isFavorite = favoriteButton.classList.toggle(
      "product-card__favorite--active",
    );

    if (isFavorite) {
      favoriteProducts.push(productTitle);
      favoriteIcon.textContent = "♥";

      favoriteButton.setAttribute("aria-label", "Удалить из избранного");
      favoriteButton.setAttribute("aria-pressed", "true");
    } else {
      const productIndex = favoriteProducts.indexOf(productTitle);

      if (productIndex !== -1) {
        favoriteProducts.splice(productIndex, 1);
      }

      favoriteIcon.textContent = "♡";

      favoriteButton.setAttribute("aria-label", "Добавить в избранное");
      favoriteButton.setAttribute("aria-pressed", "false");
    }

    console.log(favoriteProducts);
  });
});
