(() => {
  const body = document.body;
  const intro = document.querySelector("[data-exory-intro]");
  const cards = Array.from(document.querySelectorAll("[data-exory-card]"));
  const characterSection = document.querySelector("[data-exory-characters]");
  const sensualImages = Array.from(document.querySelectorAll("[data-exory-sensual-image]"));
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const mapRange = (value, start, end) => {
    if (end <= start) {
      return value >= end ? 1 : 0;
    }

    return clamp((value - start) / (end - start), 0, 1);
  };

  const desktopLayout = [
    { x: 22, y: 55, size: "7.22rem", shiftX: "-220px", shiftY: "140px", tilt: "-14deg", flyX: "-36px", flyY: "-28px", exitTilt: "-8deg" },
    { x: 57, y: 25, size: "6.5rem", shiftX: "10px", shiftY: "-170px", tilt: "8deg", flyX: "0px", flyY: "-32px", exitTilt: "4deg" },
    { x: 82, y: 53, size: "7.08rem", shiftX: "220px", shiftY: "120px", tilt: "14deg", flyX: "34px", flyY: "-30px", exitTilt: "8deg" },
    { x: 73, y: 34, size: "6.28rem", shiftX: "170px", shiftY: "-24px", tilt: "10deg", flyX: "28px", flyY: "-22px", exitTilt: "5deg" },
    { x: 28, y: 45, size: "6.5rem", shiftX: "-180px", shiftY: "46px", tilt: "-10deg", flyX: "-22px", flyY: "-18px", exitTilt: "-6deg" },
    { x: 59, y: 23, size: "6.15rem", shiftX: "18px", shiftY: "-155px", tilt: "6deg", flyX: "4px", flyY: "-28px", exitTilt: "2deg" },
    { x: 77, y: 48, size: "6.36rem", shiftX: "180px", shiftY: "80px", tilt: "12deg", flyX: "20px", flyY: "-22px", exitTilt: "6deg" },
    { x: 31, y: 42, size: "5.92rem", shiftX: "-160px", shiftY: "28px", tilt: "-8deg", flyX: "-18px", flyY: "-20px", exitTilt: "-4deg" },
  ];

  const mobileLayout = [
    { x: 24, y: 59, size: "4.91rem", shiftX: "-84px", shiftY: "94px", tilt: "-12deg", flyX: "-18px", flyY: "-18px", exitTilt: "-6deg" },
    { x: 56, y: 32, size: "4.48rem", shiftX: "8px", shiftY: "-116px", tilt: "8deg", flyX: "0px", flyY: "-18px", exitTilt: "4deg" },
    { x: 80, y: 56, size: "4.7rem", shiftX: "102px", shiftY: "84px", tilt: "12deg", flyX: "20px", flyY: "-18px", exitTilt: "8deg" },
    { x: 72, y: 42, size: "4.19rem", shiftX: "80px", shiftY: "4px", tilt: "10deg", flyX: "16px", flyY: "-14px", exitTilt: "4deg" },
    { x: 27, y: 48, size: "4.34rem", shiftX: "-78px", shiftY: "32px", tilt: "-10deg", flyX: "-14px", flyY: "-12px", exitTilt: "-5deg" },
    { x: 55, y: 30, size: "4.27rem", shiftX: "10px", shiftY: "-110px", tilt: "6deg", flyX: "0px", flyY: "-16px", exitTilt: "2deg" },
    { x: 78, y: 53, size: "4.34rem", shiftX: "88px", shiftY: "52px", tilt: "10deg", flyX: "14px", flyY: "-12px", exitTilt: "6deg" },
    { x: 28, y: 46, size: "4.11rem", shiftX: "-72px", shiftY: "24px", tilt: "-8deg", flyX: "-12px", flyY: "-12px", exitTilt: "-4deg" },
  ];

  const applyCardLayout = () => {
    const layout = window.innerWidth <= 860 ? mobileLayout : desktopLayout;

    cards.forEach((card, index) => {
      const entry = layout[index % layout.length];
      card.style.setProperty("--card-x", `${entry.x}%`);
      card.style.setProperty("--card-y", `${entry.y}%`);
      card.style.setProperty("--card-size", entry.size);
      card.style.setProperty("--card-shift-x", entry.shiftX);
      card.style.setProperty("--card-shift-y", entry.shiftY);
      card.style.setProperty("--card-tilt", entry.tilt);
      card.style.setProperty("--card-fly-x", entry.flyX);
      card.style.setProperty("--card-fly-y", entry.flyY);
      card.style.setProperty("--card-exit-tilt", entry.exitTilt);
      card.style.zIndex = String(index + 1);
    });
  };

  const setCharacter = (key) => {
    if (!characterSection || !key) {
      return;
    }

    characterSection
      .querySelectorAll("[data-character]")
      .forEach((name) => name.classList.toggle("is-active", name.dataset.character === key));

    characterSection
      .querySelectorAll("[data-character-image]")
      .forEach((image) => image.classList.toggle("is-active", image.dataset.characterImage === key));
  };

  const setSensualImage = (index) => {
    if (!sensualImages.length) {
      return;
    }

    const normalizedIndex = ((index % sensualImages.length) + sensualImages.length) % sensualImages.length;
    sensualImages.forEach((image, imageIndex) => {
      image.classList.toggle("is-active", imageIndex === normalizedIndex);
    });
  };

  const syncCharactersByScroll = () => {
    if (!characterSection) {
      return;
    }

    const names = Array.from(characterSection.querySelectorAll("[data-character]"));
    if (!names.length) {
      return;
    }

    const viewportCenter = window.innerHeight * 0.52;
    const nearest = names.reduce((best, name) => {
      const rect = name.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
      return distance < best.distance ? { name, distance } : best;
    }, { name: names[0], distance: Number.POSITIVE_INFINITY }).name;

    setCharacter(nearest.dataset.character);
  };

  let ticking = false;

  const render = () => {
    ticking = false;

    if (!intro || reduceMotionQuery.matches) {
      if (intro) {
        intro.style.setProperty("--intro-progress", "1");
        intro.style.setProperty("--statement-visibility", "0");
        intro.style.setProperty("--copy-visibility", "1");
        intro.style.setProperty("--logo-visibility", "1");
      }

      cards.forEach((card) => {
        card.style.setProperty("--card-entry", "1");
        card.style.setProperty("--card-exit", "1");
        card.style.setProperty("--card-opacity", "0");
      });

      syncCharactersByScroll();
      return;
    }

    const maxScroll = Math.max(intro.offsetHeight - window.innerHeight, 1);
    const scrolled = clamp(-intro.getBoundingClientRect().top, 0, maxScroll);
    const progress = scrolled / maxScroll;

    intro.style.setProperty("--intro-progress", progress.toFixed(4));
    intro.style.setProperty("--copy-visibility", "1");
    intro.style.setProperty(
      "--statement-visibility",
      (
        mapRange(progress, 0.08, 0.16) *
        (1 - mapRange(progress, 0.37, 0.45))
      ).toFixed(4),
    );
    intro.style.setProperty("--logo-visibility", mapRange(progress, 0.44, 0.54).toFixed(4));

    cards.forEach((card, index) => {
      const start = 0.18 + index * 0.045;
      const peak = start + 0.08;
      const end = peak + 0.07;
      const entry = mapRange(progress, start, peak);
      const exit = mapRange(progress, peak, end);
      const opacity =
        progress < start || progress > end ? 0 : exit === 0 ? entry : 1 - exit;

      card.style.setProperty("--card-entry", entry.toFixed(4));
      card.style.setProperty("--card-exit", exit.toFixed(4));
      card.style.setProperty("--card-opacity", opacity.toFixed(4));
    });

    syncCharactersByScroll();
  };

  const requestRender = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(render);
  };

  applyCardLayout();
  body.classList.add("exory-ready");

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener(
    "resize",
    () => {
      applyCardLayout();
      requestRender();
    },
    { passive: true },
  );

  characterSection?.querySelectorAll("[data-character]").forEach((name) => {
    name.addEventListener("mouseenter", () => setCharacter(name.dataset.character));
    name.addEventListener("focus", () => setCharacter(name.dataset.character));
  });

  if (sensualImages.length > 1 && !reduceMotionQuery.matches) {
    let sensualIndex = 0;
    window.setInterval(() => {
      sensualIndex += 1;
      setSensualImage(sensualIndex);
    }, 2800);
  }

  if (typeof reduceMotionQuery.addEventListener === "function") {
    reduceMotionQuery.addEventListener("change", requestRender);
  }

  requestRender();
})();
