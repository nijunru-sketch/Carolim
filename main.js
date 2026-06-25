const body = document.body;
const loader = document.querySelector("[data-loader]");
const counter = document.querySelector("[data-counter]");
const loadingBody = document.querySelector(".loader__body");
const frame = document.querySelector(".loader__frame");
const careerSection = document.querySelector(".career");
const careerTitle = document.querySelector(".career__title");
const whyCorkSection = document.querySelector(".whyCorkPage");
const whyCorkTitle = document.querySelector(".whyCorkTitle");
const whyMeSection = document.querySelector(".whymePage");
const whyMeTitle = document.querySelector(".whymeTitle");
const whyCorkEmbed = document.querySelector("[data-why-cork-embed]");
const contactPage = document.querySelector(".contactPage");
const contactArt = document.querySelector(".contactArt");
const contactTitle = document.querySelector(".contactTitle");
const contactResume = document.querySelector(".contactResume");
const contactWordmark = document.querySelector(".contactWordmarkTitle");
const contactHotspot = document.querySelector(".contactYesHotspot");
const contactPointer = document.querySelector(".contactPointer");
const contactQrLayer = document.querySelector(".contactQrLayer");
const contactQrBackdrop = document.querySelector(".contactQrBackdrop");
const LOADER_SEEN_KEY = "junru-portfolio-loader-seen";
const CAREER_OVERVIEW_RETURN_Y_KEY = "junru-career-overview-return-y";
const WHY_ME_RETURN_Y_KEY = "junru-why-me-return-y";
const CHILD_PAGE_PRELOAD_TIMEOUT = 18000;
const CHILD_PAGE_PROGRESS_START = 0.8;
const CHILD_PAGE_PROGRESS_CAP = 0.97;
const CHILD_PAGE_PRELOAD_ASSETS = [
  "./assets/career-moody-stage/hemu/logo-transparent.png",
  "./assets/career-moody-stage/hemu/02.jpg",
  "./assets/career-moody-stage/hemu/01.jpg",
  "./assets/career-moody-stage/hemu/03.jpg",
  "./assets/career-moody-stage/hemu/05.jpg",
  "./assets/career-moody-stage/hemu/04.jpg",
  "./assets/career-moody-stage/hemu/06.jpg",
  "./assets/career-moody-stage/caifenglou/logo-transparent.png",
  "./assets/career-moody-stage/caifenglou/02.jpg",
  "./assets/career-moody-stage/caifenglou/01.jpg",
  "./assets/career-moody-stage/caifenglou/03.png",
  "./assets/career-moody-stage/caifenglou/05.png",
  "./assets/career-moody-stage/caifenglou/04.png",
  "./assets/career-moody-stage/caifenglou/06.png",
  "./assets/career-moody-stage/caifenglou/07.png",
  "./assets/career-moody-stage/yichuanzong/logo-transparent.png",
  "./assets/career-moody-stage/yichuanzong/02.jpg",
  "./assets/career-moody-stage/yichuanzong/01.png",
  "./assets/career-moody-stage/yichuanzong/03.jpeg",
  "./assets/career-moody-stage/yichuanzong/05.png",
  "./assets/career-moody-stage/yichuanzong/04.png",
  "./assets/career-moody/cailan-1.png",
  "./assets/career-moody/cailan-2.jpg",
  "./assets/career-moody/cailan-3.png",
  "./assets/career-moody/cailan-4.png",
  "./assets/career-moody/neobio-1.png",
  "./assets/career-moody/neobio-2.jpg",
  "./assets/career-moody/neobio-3.png",
  "./assets/career-moody/mimi-1.png",
  "./assets/career-moody/mimi-2.png",
  "./assets/career-moody/mimi-3.jpg",
  "./assets/career-moody/mimi-4.jpg",
  "./assets/career-moody/mimi-5.jpg",
  "./assets/career-moody/tree-1.png",
  "./assets/career-moody/tree-2.png",
  "./assets/career-moody/tree-3.png",
  "./assets/career-moody/tree-4.png",
  "./assets/career-moody/xmas-1.png",
  "./assets/career-moody/xmas-2.png",
  "./assets/career-moody/xmas-3.png",
  "./assets/career-moody/xmas-4.jpg",
  "./assets/career-moody/xmas-5.jpg",
  "./assets/career-moody/egg-yolk-1.JPG",
  "./assets/career-moody/egg-yolk-2.JPG",
  "./assets/career-moody/egg-yolk-3.JPG",
  "./assets/career-moody/egg-yolk-4.JPG",
  "./assets/career-moody/egg-yolk-5.JPG",
  "./assets/zuijiao-chefs/IMG_0445.JPG",
  "./assets/zuijiao-chefs/IMG_0774.JPG",
  "./assets/zuijiao-chefs/IMG_4573.png",
  "./assets/zuijiao-chefs/IMG_4578.png",
  "./assets/zuijiao-chefs/IMG_4583.png",
  "./assets/zuijiao-chefs/IMG_4624.png",
  "./assets/zuijiao-chefs/IMG_4631.png",
  "./assets/zuijiao-chefs/IMG_4633.png",
  "./assets/zuijiao-chefs/IMG_4636.png",
  "./assets/zuijiao-chefs/IMG_4642.png",
  "./assets/zuijiao-diners/IMG_0443.png",
  "./assets/zuijiao-diners/IMG_0467.png",
  "./assets/zuijiao-diners/IMG_4570.png",
  "./assets/zuijiao-diners/IMG_4574.png",
  "./assets/zuijiao-diners/IMG_4577.png",
  "./assets/zuijiao-diners/IMG_4580.png",
  "./assets/zuijiao-diners/IMG_4586.png",
  "./assets/zuijiao-diners/IMG_4594.png",
  "./assets/zuijiao-diners/IMG_4628.png",
  "./assets/zuijiao-diners/getimgdata-3.jpg",
  "./assets/exory/logo-exory.png",
  "./assets/exory/selene.jpg",
  "./assets/exory/aria.jpg",
  "./assets/exory/corrine.jpg",
  "./assets/exory/adara.jpg",
  "./assets/exory/canna.jpg",
  "./assets/exory/danica.jpg",
  "./assets/exory/iris.jpg",
  "./assets/exory/lilin.jpg",
  "./assets/exory/exory-02-sensual-products.png",
  "./assets/exory/exory-02-sensual-main.jpg",
  "./assets/exory/exory-02-sensual-rotate-02.jpg",
  "./assets/exory/exory-02-sensual-rotate-03.jpg",
  "./assets/exory/exory-03-rebuild-thread.png",
  "./assets/exory/exory-03-rebuild-seamless.png",
  "./assets/exory/exory-03-rebuild-hero.jpg",
  "./assets/exory/exory-04-package-hand.mp4",
  "./assets/exory/exory-04-package-socks.jpg",
  "./assets/exory/exory-05-character-canna.jpg",
  "./assets/exory/exory-05-character-selene.jpg",
  "./assets/exory/exory-05-character-corrine.jpg",
  "./assets/exory/exory-05-character-adara.jpg",
  "./assets/exory/exory-05-character-danica.jpg",
  "./assets/exory/exory-05-character-lilin.jpg",
  "./assets/exory/exory-05-character-iris.jpg",
  "./assets/exory/exory-05-character-aria.jpg",
  "./assets/whyme-detail/planning-a1.jpg",
  "./assets/whyme-detail/planning-b1.png",
  "./assets/whyme-detail/planning-a2.jpg",
  "./assets/whyme-detail/planning-b2.jpg",
  "./assets/whyme-detail/planning-a3.jpg",
  "./assets/whyme-detail/planning-b3.png",
  "./assets/whyme-detail/planning-a4.png",
  "./assets/whyme-detail/planning-b4.jpg",
  "./assets/whyme-detail/planning-a5.jpg",
  "./assets/whyme-detail/planning-b5.jpg",
  "./assets/whyme-detail/planning-a6.png",
  "./assets/whyme-detail/planning-b6.jpg",
  "./assets/whyme-detail/planning-a7.jpg",
  "./assets/whyme-detail/planning-b7.jpg",
  "./assets/whyme-detail/planning-a8.jpg",
  "./assets/whyme-detail/planning-b8.jpg",
  "./assets/whyme-detail/planning-a9.jpg",
  "./assets/whyme-detail/planning-b9.jpg",
  "./assets/whyme-detail/shoot-1.JPG",
  "./assets/whyme-detail/shoot-3.JPG",
  "./assets/whyme-detail/shoot-2.JPG",
  "./assets/whyme-detail/shoot-4.JPG",
  "./assets/whyme-detail/shoot-5.JPG",
  "./assets/whyme-detail/shoot-6.JPG",
  "./assets/whyme-detail/shoot-7.JPG",
  "./assets/whyme-detail/shoot-8.JPG",
  "./assets/whyme-detail/space-waitan-1.jpg",
  "./assets/whyme-detail/space-waitan-2.jpg",
  "./assets/whyme-detail/space-waitan-3.jpg",
  "./assets/whyme-detail/space-lianyi-2.jpg",
  "./assets/whyme-detail/space-lianyi-1.jpg",
  "./assets/whyme-detail/space-lianyi-3.jpg",
  "./assets/whyme-detail/space-lianyi-4.jpg",
];
const urlParams = new URLSearchParams(window.location.search);
const isCareerOverviewReturn =
  urlParams.get("returnTo") === "career-overview" &&
  window.location.hash === "#career-overview";
const isWhyMeReturn =
  urlParams.get("returnTo") === "why-me" && window.location.hash === "#why-me";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function hasSeenLoader() {
  try {
    return window.sessionStorage.getItem(LOADER_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markLoaderSeen() {
  try {
    window.sessionStorage.setItem(LOADER_SEEN_KEY, "1");
  } catch {
    // Ignore storage failures and fall back to per-load behavior.
  }
}

const skipLoader = hasSeenLoader() || isCareerOverviewReturn || isWhyMeReturn;

if (skipLoader) {
  body.classList.add("is-ready");
  loader?.classList.add("is-hidden");
} else {
  body.classList.add("is-loading");
  markLoaderSeen();
}

const loaderState = {
  progress: 0,
  target: 0,
  ready: false,
  frameId: 0,
};

const childAssetPreloadState = {
  started: false,
  settled: false,
  completed: 0,
  total: CHILD_PAGE_PRELOAD_ASSETS.length,
  startedAt: 0,
  promise: Promise.resolve(),
};

const careerState = {
  frameId: 0,
};

const whyCorkState = {
  frameId: 0,
};

const whyMeState = {
  frameId: 0,
};

const contactState = {
  played: false,
};

const loaderInsets = {
  left: 0,
  bottom: 0,
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isVideoAsset(url) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

function waitForImageLoad(image) {
  return new Promise((resolve, reject) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", reject, { once: true });
  });
}

async function preloadImageAsset(url) {
  const image = new Image();
  image.decoding = "async";
  image.src = url;

  if (!image.complete) {
    await waitForImageLoad(image);
  }

  if (typeof image.decode === "function") {
    try {
      await image.decode();
    } catch {
      // Some browsers reject decode() for cached or already-decoded images.
    }
  }
}

async function preloadBinaryAsset(url) {
  const response = await fetch(url, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error(`Failed to preload ${url}`);
  }

  await response.blob();
}

function updateChildAssetProgress() {
  if (!childAssetPreloadState.total || skipLoader) {
    return;
  }

  const assetRatio =
    childAssetPreloadState.completed / childAssetPreloadState.total;
  const elapsed = childAssetPreloadState.startedAt
    ? performance.now() - childAssetPreloadState.startedAt
    : 0;
  const timeRatio = clamp(elapsed / CHILD_PAGE_PRELOAD_TIMEOUT, 0, 1);
  const visualRatio = Math.max(assetRatio, timeRatio * 0.94);

  setLoaderTarget(
    CHILD_PAGE_PROGRESS_START +
      visualRatio * (CHILD_PAGE_PROGRESS_CAP - CHILD_PAGE_PROGRESS_START),
  );
}

function preloadChildPageAssets() {
  if (skipLoader || childAssetPreloadState.started) {
    return childAssetPreloadState.promise;
  }

  childAssetPreloadState.started = true;
  childAssetPreloadState.startedAt = performance.now();

  const preloadTasks = CHILD_PAGE_PRELOAD_ASSETS.map((url) => {
    const task = isVideoAsset(url)
      ? preloadBinaryAsset(url)
      : preloadImageAsset(url);

    return task.catch(() => null).finally(() => {
      childAssetPreloadState.completed += 1;
      updateChildAssetProgress();
    });
  });

  const timeoutTask = new Promise((resolve) => {
    window.setTimeout(resolve, CHILD_PAGE_PRELOAD_TIMEOUT);
  });

  childAssetPreloadState.promise = Promise.race([
    Promise.allSettled(preloadTasks),
    timeoutTask,
  ]).finally(() => {
    childAssetPreloadState.settled = true;
  });

  return childAssetPreloadState.promise;
}

function restoreCareerOverviewPosition() {
  if (!isCareerOverviewReturn) {
    return;
  }

  const target = document.getElementById("career-overview");
  let savedY = null;

  try {
    const raw = window.sessionStorage.getItem(CAREER_OVERVIEW_RETURN_Y_KEY);
    if (raw !== null) {
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) {
        savedY = parsed;
      }
      window.sessionStorage.removeItem(CAREER_OVERVIEW_RETURN_Y_KEY);
    }
  } catch {
    savedY = null;
  }

  if (!target) {
    document.documentElement.classList.remove("is-restoring-overview");
    return;
  }

  const jump = () => {
    if (savedY !== null) {
      window.scrollTo(0, savedY);
      return;
    }

    target.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "auto",
    });
  };

  jump();
  window.requestAnimationFrame(jump);
  window.setTimeout(jump, 60);
  window.setTimeout(jump, 140);
  window.setTimeout(() => {
    jump();
    document.documentElement.classList.remove("is-restoring-overview");
  }, 220);
}

function restoreWhyMePosition() {
  if (!isWhyMeReturn) {
    return;
  }

  const target = document.getElementById("why-me");
  let savedY = null;

  try {
    const raw = window.sessionStorage.getItem(WHY_ME_RETURN_Y_KEY);
    if (raw !== null) {
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) {
        savedY = parsed;
      }
      window.sessionStorage.removeItem(WHY_ME_RETURN_Y_KEY);
    }
  } catch {
    savedY = null;
  }

  if (!target) {
    document.documentElement.classList.remove("is-restoring-overview");
    return;
  }

  const jump = () => {
    if (savedY !== null) {
      window.scrollTo(0, savedY);
      return;
    }

    target.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "auto",
    });
  };

  jump();
  window.requestAnimationFrame(jump);
  window.setTimeout(jump, 60);
  window.setTimeout(jump, 140);
  window.setTimeout(() => {
    jump();
    document.documentElement.classList.remove("is-restoring-overview");
  }, 220);
}

function persistCareerOverviewReturnPosition() {
  try {
    window.sessionStorage.setItem(
      CAREER_OVERVIEW_RETURN_Y_KEY,
      String(window.scrollY || window.pageYOffset || 0),
    );
  } catch {
    // Ignore storage failures and fall back to hash-based return.
  }
}

function persistWhyMeReturnPosition() {
  try {
    window.sessionStorage.setItem(
      WHY_ME_RETURN_Y_KEY,
      String(window.scrollY || window.pageYOffset || 0),
    );
  } catch {
    // Ignore storage failures and fall back to hash-based return.
  }
}

function measureInsets() {
  if (!loadingBody) {
    return;
  }

  const styles = window.getComputedStyle(loadingBody);
  loaderInsets.left = Number.parseFloat(styles.left) || 0;
  loaderInsets.bottom = Number.parseFloat(styles.bottom) || 0;
}

function measureTravel() {
  if (!loadingBody || !frame) {
    return 0;
  }

  const bodyWidth = loadingBody.getBoundingClientRect().width;
  const frameWidth = frame.getBoundingClientRect().width;
  const maxX = frameWidth - bodyWidth - loaderInsets.left - 16;

  return Math.max(0, maxX);
}

function renderLoader(progress) {
  const value = Math.round(progress * 100);

  if (counter) {
    counter.textContent = String(value).padStart(2, "0");
  }

  if (loadingBody) {
    const x = measureTravel() * progress;
    loadingBody.style.transform = `translate3d(${x}px, 0, 0)`;
  }
}

function finishLoader() {
  if (!loader || loader.classList.contains("is-hidden")) {
    return;
  }

  if (loaderState.frameId) {
    window.cancelAnimationFrame(loaderState.frameId);
    loaderState.frameId = 0;
  }

  window.setTimeout(() => {
    body.classList.add("is-ready");
    body.classList.remove("is-loading");
    loader.classList.add("is-hidden");
  }, prefersReducedMotion ? 40 : 180);
}

function tickLoader() {
  loaderState.progress +=
    (loaderState.target - loaderState.progress) *
    (prefersReducedMotion ? 1 : 0.16);
  loaderState.progress = clamp(loaderState.progress, 0, 1);

  renderLoader(loaderState.progress);

  if (loaderState.ready && loaderState.progress >= 0.995) {
    loaderState.progress = 1;
    renderLoader(1);
    finishLoader();
    return;
  }

  loaderState.frameId = window.requestAnimationFrame(tickLoader);
}

function setLoaderTarget(nextTarget) {
  loaderState.target = Math.max(loaderState.target, nextTarget);

  if (!loaderState.frameId) {
    loaderState.frameId = window.requestAnimationFrame(tickLoader);
  }
}

function updateCareerTitleScale() {
  if (!careerSection || !careerTitle) {
    return;
  }

  if (prefersReducedMotion) {
    careerTitle.style.setProperty("--career-title-scale", "1");
    return;
  }

  const rect = careerSection.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const progress = clamp((viewportHeight - rect.top) / viewportHeight, 0, 1);
  const scale = 2 - progress;

  careerTitle.style.setProperty("--career-title-scale", scale.toFixed(3));
}

function updateWhyCorkTitleScale() {
  if (!whyCorkSection || !whyCorkTitle) {
    return;
  }

  if (prefersReducedMotion) {
    whyCorkTitle.style.setProperty("--why-cork-title-scale", "1");
    return;
  }

  const rect = whyCorkSection.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const progress = clamp((viewportHeight - rect.top) / viewportHeight, 0, 1);
  const scale = 2 - progress;

  whyCorkTitle.style.setProperty("--why-cork-title-scale", scale.toFixed(3));
}

function updateWhyMeTitleScale() {
  if (!whyMeSection || !whyMeTitle) {
    return;
  }

  if (prefersReducedMotion) {
    whyMeTitle.style.setProperty("--why-me-title-scale", "1");
    return;
  }

  const rect = whyMeSection.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const progress = clamp((viewportHeight - rect.top) / viewportHeight, 0, 1);
  const scale = 2 - progress;

  whyMeTitle.style.setProperty("--why-me-title-scale", scale.toFixed(3));
}

function tickCareerTitle() {
  careerState.frameId = 0;
  updateCareerTitleScale();
}

function scheduleCareerTitleUpdate() {
  if (careerState.frameId) {
    return;
  }

  careerState.frameId = window.requestAnimationFrame(tickCareerTitle);
}

function tickWhyCorkTitle() {
  whyCorkState.frameId = 0;
  updateWhyCorkTitleScale();
}

function scheduleWhyCorkTitleUpdate() {
  if (whyCorkState.frameId) {
    return;
  }

  whyCorkState.frameId = window.requestAnimationFrame(tickWhyCorkTitle);
}

function tickWhyMeTitle() {
  whyMeState.frameId = 0;
  updateWhyMeTitleScale();
}

function scheduleWhyMeTitleUpdate() {
  if (whyMeState.frameId) {
    return;
  }

  whyMeState.frameId = window.requestAnimationFrame(tickWhyMeTitle);
}

function syncWhyCorkEmbedHeight() {
  if (!whyCorkEmbed) {
    return;
  }

  const height = Math.ceil(whyCorkEmbed.getBoundingClientRect().height);
  if (height > 0) {
    whyCorkEmbed.style.height = `${height}px`;
  }
}

function applyWhyCorkEmbedHeight(height) {
  if (!whyCorkEmbed || !Number.isFinite(height) || height <= 0) {
    return;
  }

  whyCorkEmbed.style.height = `${Math.ceil(height)}px`;
}

window.addEventListener("message", (event) => {
  if (!whyCorkEmbed || event.source !== whyCorkEmbed.contentWindow) {
    return;
  }

  const data = event.data;
  if (!data || data.type !== "why-cork:height") {
    return;
  }

  applyWhyCorkEmbedHeight(Number(data.height));
});

function lockStyles(element, styles) {
  if (!element) {
    return;
  }

  for (const [property, value] of Object.entries(styles)) {
    element.style[property] = value;
  }
}

function settleAnimation(animation, element, styles) {
  if (!animation) {
    lockStyles(element, styles);
    return Promise.resolve();
  }

  return animation.finished
    .then(() => {
      lockStyles(element, styles);
      animation.cancel();
    })
    .catch(() => {
      lockStyles(element, styles);
    });
}

function setContactFinalState() {
  if (contactPage) {
    contactPage.classList.add("is-ready");
  }

  lockStyles(contactArt, {
    opacity: "1",
    transform: "translate3d(-50%, 0, 0) scale(1)",
  });

  lockStyles(contactTitle, {
    opacity: "1",
    transform: "translate3d(0, 0, 0) scale(1)",
  });

  lockStyles(contactWordmark, {
    opacity: "1",
    transform: "translate3d(0, 0, 0) scale(1)",
  });

  lockStyles(contactResume, {
    opacity: "1",
    transform: "translate3d(0.4rem, 0, 0)",
  });
}

function revealContactPointer() {
  if (!contactPointer) {
    return;
  }

  contactPointer.classList.add("is-visible");
}

function openContactQr() {
  if (!contactQrLayer) {
    return;
  }

  contactQrLayer.hidden = false;
  window.requestAnimationFrame(() => {
    contactQrLayer.classList.add("is-open");
  });
}

function closeContactQr() {
  if (!contactQrLayer) {
    return;
  }

  contactQrLayer.classList.remove("is-open");

  window.setTimeout(() => {
    if (!contactQrLayer.classList.contains("is-open")) {
      contactQrLayer.hidden = true;
    }
  }, 220);
}

function playContactIntro() {
  if (contactState.played) {
    return;
  }

  contactState.played = true;

  if (!contactArt || !contactTitle || !contactResume || !contactWordmark) {
    setContactFinalState();
    return;
  }

  if (
    prefersReducedMotion ||
    !contactArt.animate ||
    !contactTitle.animate ||
    !contactResume.animate ||
    !contactWordmark.animate
  ) {
    setContactFinalState();
    revealContactPointer();
    return;
  }

  if (contactPage) {
    contactPage.classList.add("is-ready");
  }

  const flyDistance = Math.max(window.innerWidth * 1.6, 1600);
  const artIntro = contactArt.animate(
    [
      {
        opacity: 0,
        transform: "translate3d(-50%, 0.3rem, 0) scale(3)",
      },
      {
        opacity: 1,
        transform: "translate3d(-50%, 0, 0) scale(1)",
      },
    ],
    {
      duration: prefersReducedMotion ? 0 : 1000,
      easing: "linear",
      fill: "forwards",
    },
  );

  const titleIntro = contactTitle.animate(
    [
      {
        opacity: 0,
        transform: `translate3d(-${flyDistance * 1.55}px, 0, 0)`,
      },
      {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
      },
    ],
    {
      duration: prefersReducedMotion ? 0 : 1300,
      easing: "cubic-bezier(0.14, 0.84, 0.18, 1)",
      fill: "forwards",
    },
  );

  const wordmarkIntro = contactWordmark.animate(
    [
      {
        opacity: 0,
        transform: `translate3d(${flyDistance * 1.55}px, 0, 0)`,
      },
      {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
      },
    ],
    {
      duration: prefersReducedMotion ? 0 : 1300,
      easing: "cubic-bezier(0.14, 0.84, 0.18, 1)",
      fill: "forwards",
    },
  );

  Promise.all([
    settleAnimation(artIntro, contactArt, {
      opacity: "1",
      transform: "translate3d(-50%, 0, 0) scale(1)",
    }),
    settleAnimation(titleIntro, contactTitle, {
      opacity: "1",
      transform: "translate3d(0, 0, 0) scale(1)",
    }),
    settleAnimation(wordmarkIntro, contactWordmark, {
      opacity: "1",
      transform: "translate3d(0, 0, 0) scale(1)",
    }),
  ]).then(() => {
    const resumeIntro = contactResume.animate(
      [
        {
          opacity: 0,
          transform: "translate3d(0.4rem, 0, 0)",
        },
        {
          opacity: 1,
          transform: "translate3d(0.4rem, 0, 0)",
        },
      ],
      {
        duration: prefersReducedMotion ? 0 : 500,
        easing: "ease-out",
        fill: "forwards",
      },
    );

    settleAnimation(resumeIntro, contactResume, {
      opacity: "1",
      transform: "translate3d(0.4rem, 0, 0)",
    }).then(() => {
      window.setTimeout(() => {
        revealContactPointer();
      }, prefersReducedMotion ? 0 : 500);
    });
  });
}

measureInsets();

if (!skipLoader) {
  renderLoader(0);
}

window.addEventListener("resize", () => {
  measureInsets();
  renderLoader(loaderState.progress);
  scheduleCareerTitleUpdate();
  scheduleWhyCorkTitleUpdate();
  scheduleWhyMeTitleUpdate();
});

document.addEventListener(
  "DOMContentLoaded",
  () => {
    if (isCareerOverviewReturn) {
      restoreCareerOverviewPosition();
    }

    if (skipLoader) {
      return;
    }
    setLoaderTarget(0.35);
    preloadChildPageAssets();
    scheduleCareerTitleUpdate();
    scheduleWhyCorkTitleUpdate();
    scheduleWhyMeTitleUpdate();
  },
  { once: true },
);

if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    if (skipLoader) {
      return;
    }
    setLoaderTarget(CHILD_PAGE_PROGRESS_START);
    scheduleCareerTitleUpdate();
    scheduleWhyCorkTitleUpdate();
    scheduleWhyMeTitleUpdate();
  });
}

window.addEventListener(
  "load",
  () => {
    if (skipLoader) {
      scheduleCareerTitleUpdate();
      scheduleWhyCorkTitleUpdate();
      scheduleWhyMeTitleUpdate();
      syncWhyCorkEmbedHeight();
      restoreCareerOverviewPosition();
      restoreWhyMePosition();
      return;
    }
    setLoaderTarget(0.9);
    scheduleCareerTitleUpdate();
    scheduleWhyCorkTitleUpdate();
    scheduleWhyMeTitleUpdate();
    syncWhyCorkEmbedHeight();

    preloadChildPageAssets().finally(() => {
      loaderState.ready = true;
      setLoaderTarget(1);

      if (!loaderState.frameId) {
        loaderState.frameId = window.requestAnimationFrame(tickLoader);
      }
    });
  },
  { once: true },
);

if (contactHotspot) {
  contactHotspot.addEventListener("click", openContactQr);
}

if (contactQrBackdrop) {
  contactQrBackdrop.addEventListener("click", closeContactQr);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeContactQr();
  }
});

if (contactPage) {
  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    setContactFinalState();
    revealContactPointer();
  } else {
    const contactObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            playContactIntro();
            contactObserver.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.45,
      },
    );

    contactObserver.observe(contactPage);
  }
}

if (!skipLoader && document.readyState !== "loading") {
  setLoaderTarget(0.35);
  preloadChildPageAssets();
  scheduleCareerTitleUpdate();
  scheduleWhyCorkTitleUpdate();
  scheduleWhyMeTitleUpdate();
}

document.querySelectorAll('a[href="./career-zuijiao.html"], a[href="./career-moody.html"], a[href="./career-exory.html"]').forEach((link) => {
  link.addEventListener("click", () => {
    persistCareerOverviewReturnPosition();
  });
});

document.querySelectorAll('a[href="./whyme-detail.html?returnTo=why-me#why-me"]').forEach((link) => {
  link.addEventListener("click", () => {
    persistWhyMeReturnPosition();
  });
});

if (whyCorkEmbed) {
  whyCorkEmbed.addEventListener("load", () => {
    syncWhyCorkEmbedHeight();
  });
}

window.addEventListener("scroll", scheduleCareerTitleUpdate, {
  passive: true,
});

window.addEventListener("scroll", scheduleWhyCorkTitleUpdate, {
  passive: true,
});

window.addEventListener("scroll", scheduleWhyMeTitleUpdate, {
  passive: true,
});

if (isCareerOverviewReturn && document.readyState === "complete") {
  restoreCareerOverviewPosition();
}

if (isWhyMeReturn && document.readyState === "complete") {
  restoreWhyMePosition();
}
