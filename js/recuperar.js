import settings from "./settings.js";

const section = document.getElementById("modalNovo"),
  overlay = document.querySelector(".overlay"),
  closeBtn = document.querySelector(".close-btn");
const email = document.getElementById("input1");
const recuperar = document.getElementById("login");
document.addEventListener("DOMContentLoaded", async function () {
  if (overlay) {
    overlay.addEventListener("click", () => section.classList.remove("active"));
    if (closeBtn) {
      closeBtn.addEventListener("click", () =>
        section.classList.remove("active")
      );
    }
  }
  recuperar.addEventListener("click", async function () {
    const email2 = email.value;

    if (email2 === "") {
      section.classList.add("active");
      setTimeout(() => {
        section.classList.remove("active");
        }, 3000);
      return;
    } else {
        const response = await fetch(`${settings.ApiUrl}/users/recuperar`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email2 }),
        });
        const data = await response.json();
        if (data.status === "success") {
            section.classList.add("active");
            setTimeout(() => {
            section.classList.remove("active");
            }, 3000);
        } else {
            section.classList.add("active");
            setTimeout(() => {
            section.classList.remove("active");
            }, 3000);
        }
    }
  });
});
