const commentViewport = document.querySelector(".comment-section__viewport");

const commentTrack = document.querySelector(".comment-section__group");

const commentCards = commentTrack.querySelectorAll(".comment-section__card");

const prevButton = document.querySelector(".comment-section__control--prev");

const nextButton = document.querySelector(".comment-section__control--next");

let currentIndex = 0;

function updateSlider() {
  const cardWidth = commentCards[0].getBoundingClientRect().width;
  const styles = getComputedStyle(commentTrack);
  const gap = parseFloat(styles.columnGap) || 0;
  const step = cardWidth + gap;

  const maxOffset = Math.max(
    0,
    commentTrack.scrollWidth - commentViewport.clientWidth,
  );

  const maxIndex = Math.ceil(maxOffset / step);

  currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

  const offset = Math.min(currentIndex * step, maxOffset);

  commentTrack.style.transform = `translateX(-${offset}px)`;

  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = offset >= maxOffset;
}

nextButton.addEventListener("click", () => {
  currentIndex++;
  updateSlider();
});

prevButton.addEventListener("click", () => {
  currentIndex--;
  updateSlider();
});

window.addEventListener("resize", updateSlider);

updateSlider();
