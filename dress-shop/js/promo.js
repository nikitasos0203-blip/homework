const promo = document.querySelector(".promo");
const promoCloseButton = document.querySelector(".promo__close");

promoCloseButton.addEventListener("click", () => {
  promo.classList.add("promo--hidden");
});
