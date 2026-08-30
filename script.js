document.body.classList.add("is-loading");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const progress = document.querySelector("[data-scroll-progress]");

// Intro: breve, grafica e abbastanza rapida da non intralciare chi torna sul sito.
const loader = document.querySelector("[data-loader]");
const loaderCount = document.querySelector("[data-loader-count]");
const loaderBar = document.querySelector("[data-loader-bar]");
const loaderDuration = reduceMotion ? 120 : 650;
const loaderStart = performance.now();

const runLoader = (now) => {
  const elapsed = Math.min((now - loaderStart) / loaderDuration, 1);
  const eased = 1 - Math.pow(1 - elapsed, 3);
  const value = Math.round(eased * 100);
  loaderCount.textContent = String(value).padStart(3, "0");
  loaderBar.style.width = `${value}%`;

  if (elapsed < 1) {
    requestAnimationFrame(runLoader);
  } else {
    loader.classList.add("done");
    document.body.classList.remove("is-loading");
  }
};
requestAnimationFrame(runLoader);

let scrollableRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
let headerIsScrolled = null;

const measurePage = () => {
  scrollableRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
};

const setPageState = () => {
  const nextHeaderState = window.scrollY > 24;
  if (nextHeaderState !== headerIsScrolled) {
    headerIsScrolled = nextHeaderState;
    header.classList.toggle("scrolled", nextHeaderState);
  }
  const amount = scrollableRange > 0 ? window.scrollY / scrollableRange : 0;
  progress.style.transform = `scaleX(${Math.min(Math.max(amount, 0), 1)})`;
};

setPageState();
let pageStateFrame = 0;
window.addEventListener("scroll", () => {
  if (pageStateFrame) return;
  pageStateFrame = requestAnimationFrame(() => {
    pageStateFrame = 0;
    setPageState();
  });
}, { passive: true });
window.addEventListener("resize", () => {
  measurePage();
  setPageState();
}, { passive: true });
window.addEventListener("load", measurePage, { once: true });
document.fonts?.ready.then(measurePage);

const closeMenu = () => {
  menuButton.classList.remove("open");
  mobileMenu.classList.remove("open");
  header.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Apri menu");
  document.body.style.overflow = "";
};

menuButton.addEventListener("click", () => {
  const willOpen = !mobileMenu.classList.contains("open");
  menuButton.classList.toggle("open", willOpen);
  mobileMenu.classList.toggle("open", willOpen);
  header.classList.toggle("menu-open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  menuButton.setAttribute("aria-label", willOpen ? "Chiudi menu" : "Apri menu");
  document.body.style.overflow = willOpen ? "hidden" : "";
});

mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" },
);
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// Le animazioni cicliche lavorano solo quando sono davvero visibili.
const loopObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-running", entry.isIntersecting)),
  { rootMargin: "120px 0px" },
);
document.querySelectorAll(".circle-link svg, .marquee-track").forEach((element) => loopObserver.observe(element));

// Ora locale: un piccolo segnale che lo studio è vivo, non una brochure congelata.
const timeElement = document.querySelector("[data-live-time]");
const updateTime = () => {
  timeElement.textContent = new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
};
updateTime();
setInterval(updateTime, 1000);
document.querySelector("[data-year]").textContent = new Date().getFullYear();

// Cursore contestuale: racconta cosa succederà prima del click.
if (finePointer && !reduceMotion) {
  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorRing = document.querySelector("[data-cursor-ring]");
  const cursorLabel = cursorRing.querySelector("span");
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let ringX = pointerX;
  let ringY = pointerY;
  let cursorFrame = 0;

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursorDot.style.transform = `translate3d(${pointerX}px,${pointerY}px,0) translate(-50%,-50%)`;
    if (!cursorFrame) cursorFrame = requestAnimationFrame(drawCursor);
  });

  const drawCursor = () => {
    const deltaX = pointerX - ringX;
    const deltaY = pointerY - ringY;
    ringX += deltaX * 0.16;
    ringY += deltaY * 0.16;
    cursorRing.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 0.2) {
      cursorFrame = requestAnimationFrame(drawCursor);
    } else {
      ringX = pointerX;
      ringY = pointerY;
      cursorRing.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
      cursorFrame = 0;
    }
  };

  document.querySelectorAll("[data-cursor]").forEach((element) => {
    element.addEventListener("pointerenter", () => {
      cursorLabel.textContent = element.dataset.cursor;
      cursorRing.classList.add("active");
    });
    element.addEventListener("pointerleave", () => cursorRing.classList.remove("active"));
  });

  document.querySelectorAll("a, button, input, textarea").forEach((element) => {
    element.addEventListener("pointerenter", () => cursorRing.classList.add("link"));
    element.addEventListener("pointerleave", () => cursorRing.classList.remove("link"));
  });
}

// I micro-movimenti seguono il puntatore senza interferire con touch e tastiera.
if (finePointer && !reduceMotion) {
  document.querySelectorAll("[data-magnetic]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
      element.style.transform = `translate3d(${x}px,${y}px,0)`;
    });
    element.addEventListener("pointerleave", () => { element.style.transform = ""; });
  });

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
      const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });

  const hero = document.querySelector("[data-parallax-scene]").parentElement;
  const floatingChips = [...document.querySelectorAll("[data-depth]")];
  hero.addEventListener("pointermove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    floatingChips.forEach((chip) => {
      const depth = Number(chip.dataset.depth);
      chip.style.marginLeft = `${x * 35 * depth}px`;
      chip.style.marginTop = `${y * 26 * depth}px`;
    });
  });

  document.querySelectorAll("[data-project]").forEach((project) => {
    const visual = project.querySelector(".project-visual");
    project.addEventListener("pointermove", (event) => {
      const rect = project.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      visual.style.transform = `translate3d(${x}px,${y}px,0) scale(1.025)`;
    });
    project.addEventListener("pointerleave", () => { visual.style.transform = ""; });
  });
}

// Scramble tipografico: cambia messaggio, mantenendo l'identità della headline.
const scrambleElement = document.querySelector("[data-scramble]");
const scrambleMessages = ["che conta.", "che resta.", "che converte."];
const scrambleChars = "#%&*+/<=>?@{}";
let scrambleIndex = 0;
let scrambleTimer;

const scrambleTo = (message) => {
  clearInterval(scrambleTimer);
  let frame = 0;
  const maxFrames = message.length * 3;
  scrambleTimer = setInterval(() => {
    scrambleElement.textContent = [...message].map((char, index) => {
      if (char === " " || index * 3 < frame) return char;
      return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    }).join("");
    frame += 1;
    if (frame > maxFrames) {
      clearInterval(scrambleTimer);
      scrambleElement.textContent = message;
    }
  }, 30);
};

scrambleElement.addEventListener("pointerenter", () => {
  scrambleIndex = (scrambleIndex + 1) % scrambleMessages.length;
  scrambleTo(scrambleMessages[scrambleIndex]);
});

// Sound design sintetico, attivabile esplicitamente: nessun file o autoplay invasivo.
const soundToggle = document.querySelector("[data-sound-toggle]");
const soundLabel = document.querySelector("[data-sound-label]");
let soundEnabled = false;
let audioContext;

const playTone = (frequency = 480, duration = 0.045, volume = 0.025) => {
  if (!soundEnabled) return;
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return;
  audioContext ||= new AudioEngine();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
};

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  soundToggle.setAttribute("aria-label", soundEnabled ? "Disattiva suoni interfaccia" : "Attiva suoni interfaccia");
  soundLabel.textContent = soundEnabled ? "Sound on" : "Sound off";
  playTone(660, 0.09, 0.04);
});

document.querySelectorAll("a, button").forEach((element) => {
  if (element !== soundToggle) element.addEventListener("pointerenter", () => playTone(420, 0.025, 0.012));
  element.addEventListener("click", () => playTone(690, 0.06, 0.02));
});

// Easter egg: premi T (o clicca tre volte il marchio) per sbloccare il lato B.
const secretToast = document.querySelector("[data-secret-toast]");
const toastMessage = secretToast.querySelector("[data-toast-message]");
const secretTrigger = document.querySelector("[data-secret-trigger]");
let logoClicks = 0;
let logoClickTimer;
let toastTimer;

const showToast = (message) => {
  clearTimeout(toastTimer);
  toastMessage.textContent = message;
  secretToast.classList.remove("show");
  requestAnimationFrame(() => secretToast.classList.add("show"));
  toastTimer = setTimeout(() => secretToast.classList.remove("show"), 3000);
};

const launchConfetti = () => {
  const colors = ["#d7ef3f", "#52e4ff", "#ff4b24", "#ec43a8", "#f1eee6"];
  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.top = `${-10 - Math.random() * 25}px`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2100);
  }
};

const triggerSurprise = () => {
  document.body.classList.toggle("secret-mode");
  showToast("Hai trovato il lato B di TRIA.");
  scrambleTo(document.body.classList.contains("secret-mode") ? "che spacca." : "che conta.");
  launchConfetti();
  playTone(880, 0.16, 0.04);
};

document.querySelectorAll("[data-coming-soon]").forEach((link) => {
  link.addEventListener("click", () => {
    showToast(`${link.dataset.comingSoon} / Work in progress — stiamo preparando il profilo.`);
  });
});

secretTrigger.addEventListener("click", () => {
  logoClicks += 1;
  clearTimeout(logoClickTimer);
  logoClickTimer = setTimeout(() => { logoClicks = 0; }, 900);
  if (logoClicks === 3) {
    logoClicks = 0;
    triggerSurprise();
  }
});

window.addEventListener("keydown", (event) => {
  const typing = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
  if (!typing && event.key.toLowerCase() === "t") triggerSurprise();
});

// Modulo: valida nel browser e prepara una mail già completa.
const form = document.querySelector("[data-contact-form]");
const status = form.querySelector(".form-status");
const budgetInput = document.querySelector("#budget");

form.querySelectorAll("[data-budget]").forEach((button) => {
  button.addEventListener("click", () => {
    form.querySelectorAll("[data-budget]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    budgetInput.value = button.dataset.budget;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const requiredFields = [...form.querySelectorAll("[required]")];
  let valid = true;

  requiredFields.forEach((field) => {
    const fieldValid = field.checkValidity();
    field.closest(".form-row").classList.toggle("invalid", !fieldValid);
    valid = valid && fieldValid;
  });

  if (!valid) {
    status.textContent = "Controlla i campi evidenziati e riprova.";
    requiredFields.find((field) => !field.checkValidity())?.focus();
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(`Nuovo progetto da ${data.get("name")}`);
  const body = encodeURIComponent(
    `Ciao TRIA,\n\n${data.get("project")}\n\nBudget indicativo: ${data.get("budget") || "Non specificato"}\nEmail: ${data.get("email")}`,
  );
  status.textContent = "Perfetto — stiamo aprendo la tua email.";
  window.location.href = `mailto:ciao@tria.studio?subject=${subject}&body=${body}`;
});
