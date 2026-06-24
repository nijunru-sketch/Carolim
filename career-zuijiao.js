const zuijiaoPage = document.querySelector(".career-child--zuijiao");

if (zuijiaoPage) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const activateZuijiaoPage = () => {
    document.body.classList.add("zuijiao-ready");
  };

  if (prefersReducedMotion) {
    activateZuijiaoPage();
  } else {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(activateZuijiaoPage);
    });
  }
}
