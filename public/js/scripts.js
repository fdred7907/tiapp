console.log("inside js");

const hamburger = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".nav-links-container");

hamburger.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
});

