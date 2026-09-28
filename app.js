const gate = document.querySelector("#gate");
const profilePicker = document.querySelector("#profile-picker");
const app = document.querySelector("#app");
const playerDialog = document.querySelector("#player-dialog");
const video = document.querySelector("#birthday-video");
const messageDialog = document.querySelector("#message-dialog");
const toast = document.querySelector("#toast");

document.querySelectorAll(".thumbnail-card img").forEach((image) => {
  image.addEventListener("error", () => image.remove(), { once: true });
});

const loginForm = document.querySelector("#login-form");
const loginFeedback = document.querySelector("#login-feedback");
const wrongLoginMessages = [
  "Arre password toh tumhe hi pata hona chahiye, cutie 😜",
  "Galat combo! Lagta hai keyboard ko birthday cake chahiye 🎂",
  "Oopsie! Netplix bol raha hai: thoda aur pyaar se try karo 💖",
  "Username ya password naraz ho gaye kya? Ek baar phir try karo 😄",
  "No entry yet, birthday star! Apni secret identity prove karo ✨",
  "Yeh password hai ya secret recipe? Try again, jaanu 😋",
  "Netplix ka bouncer pooch raha hai: birthday girl kaun? 😂"
];

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = loginForm.elements.username.value.trim();
  const password = loginForm.elements.password.value;
  if (username === "cutiepie" && password === "12345") {
    loginFeedback.textContent = "Sahi jawab, birthday girl! Welcome to Netplix ♡";
    loginFeedback.classList.remove("is-error");
    window.setTimeout(() => {
      gate.classList.add("is-leaving");
      window.setTimeout(() => {
        gate.classList.add("is-hidden");
        profilePicker.classList.remove("is-hidden");
        profilePicker.classList.add("is-entering");
      }, 380);
    }, 450);
    return;
  }
  loginFeedback.textContent = wrongLoginMessages[Math.floor(Math.random() * wrongLoginMessages.length)];
  loginFeedback.classList.add("is-error");
  loginForm.elements.password.value = "";
  loginForm.elements.password.focus();
});

document.querySelector("#children-profile").addEventListener("click", () => {
  showToast("You are also my baby, so click on your profile 💖");
});

document.querySelector("#rishu-profile").addEventListener("click", () => {
  if (profilePicker.classList.contains("is-leaving")) return;
  profilePicker.classList.add("is-leaving");
  document.querySelector("#rishu-profile").classList.add("is-selected");
  window.setTimeout(() => {
    profilePicker.classList.add("is-hidden");
    app.classList.remove("is-hidden");
    app.classList.add("is-entering");
    window.scrollTo(0, 0);
  }, 750);
});

document.querySelectorAll('[data-play="episode"]').forEach((button) => {
  button.addEventListener("click", () => {
    playerDialog.showModal();
    video.play().catch(() => {});
  });
});

playerDialog.addEventListener("close", () => video.pause());
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

const extras = {
  note: {
    symbol: "✉", kicker: "A NOTE FOR YOU", title: "Happy birthday, Rishita.",
    body: "The best stories are better because you're in them. I hope this year brings you all the little things that make you smile—and a few big surprises too. You deserve to feel celebrated today and every day. ♡"
  },
  credits: {
    symbol: "♡", kicker: "THE END CREDITS", title: "The star of the show: you.",
    body: "Written by the universe. Directed by your own excellent self. Featuring all the people who are lucky enough to know you. And produced with a whole lot of love, just for today. ♡"
  }
};

document.querySelectorAll("[data-extra]").forEach((button) => {
  button.addEventListener("click", () => {
    const feature = button.dataset.extra;
    if (feature === "wish") {
      makeConfetti();
      showToast("Make a wish, birthday girl ✨");
      return;
    }
    const content = extras[feature];
    document.querySelector("#message-symbol").textContent = content.symbol;
    document.querySelector("#message-kicker").textContent = content.kicker;
    document.querySelector("#message-title").textContent = content.title;
    document.querySelector("#message-body").textContent = content.body;
    messageDialog.showModal();
  });
});

document.querySelector("#profile-chip").addEventListener("click", () => {
  showToast("The birthday girl has the remote today ♡");
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function makeConfetti() {
  const colors = ["#f06a9b", "#ffdce8", "#f3c87a", "#b892d8", "#fff"];
  for (let i = 0; i < 72; i += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--drift", `${Math.round(Math.random() * 200 - 100)}px`);
    piece.style.animationDelay = `${Math.random() * 0.7}s`;
    document.body.append(piece);
    window.setTimeout(() => piece.remove(), 3300);
  }
}
