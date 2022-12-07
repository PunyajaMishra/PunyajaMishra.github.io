// SCROLL ANIMATION //
const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }
  });
};

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

// NAVIGATION TOGGLE //
const elem = document.querySelector("#nav-bg"),
  toggleBtn = document.querySelector("#toggle-btn"),
  elemH = elem.getBoundingClientRect().height,
  elemW = elem.getBoundingClientRect().width;

let open = false;
let scale, offsetX, offsetY;

const calculateValues = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  //const cssStyles = getComputedStyle(elem);
  //const offsetValue = Number(cssStyles.getPropertyValue('--offset-value'));
  const offsetValue = Number(
    getComputedStyle(elem).getPropertyValue("--offset-value")
  );

  //  Offsets to center the circle
  offsetX = w / 2 - elemW / 2 - offsetValue;
  offsetY = h / 2 - elemH / 2 - offsetValue;

  // Good old pythagoras
  const radius = Math.sqrt(h ** 2 + w ** 2);
  scale = radius / (elemW / 2) / 2 + 0.1; // Add '.1' to compensate for Safari sub pixel blur issue
  return scale;
};

const openMenu = () => {
  elem.style.setProperty("--translate-x", `${offsetX}px`);
  elem.style.setProperty("--translate-y", `-${offsetY}px`);
  elem.style.setProperty("--scale", scale);
};
const closeMenu = () => {
  elem.style.setProperty("--scale", 1);
  elem.style.setProperty("--translate-x", 0);
  elem.style.setProperty("--translate-y", 0);
};
const animateMenu = () => {
  open ? openMenu() : closeMenu();
};

const toggleMenu = () => {
  open = !open;
  animateMenu();
  toggleBtn.classList.toggle("shown");
};

const resizeHandler = () => {
  window.requestAnimationFrame(() => {
    calculateValues();
    animateMenu();
  });
};

calculateValues();

//toggleBtn.onclick = toggleMenu;
toggleBtn.addEventListener("click", toggleMenu, false);
window.addEventListener("resize", resizeHandler, false);
