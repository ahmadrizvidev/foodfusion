var toggleOpen = document.getElementById('toggleOpen');
var toggleClose = document.getElementById('toggleClose');
var collapseMenu = document.getElementById('collapseMenu');

function handleClick() {
  if (collapseMenu.style.display === 'block') {
    collapseMenu.style.display = 'none';
  } else {
    collapseMenu.style.display = 'block';
  }
}

toggleOpen.addEventListener('click', handleClick);
toggleClose.addEventListener('click', handleClick);

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("#controls-carousel");
    const items = carousel.querySelectorAll("[data-carousel-item]");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    let currentIndex = 0;

    const showItem = (index) => {
        items.forEach((item, i) => {
            item.classList.toggle("hidden", i !== index);
        });
    };

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });

    // Initial display
    showItem(currentIndex);
});
