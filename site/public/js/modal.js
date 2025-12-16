document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("loginModal");
    const btn = document.getElementById("loginBtn");
    const close = modal.querySelector(".close");

    btn.addEventListener("click", () => modal.style.display = "block");
    close.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
    const plusBtn = document.querySelector(".new-project");
    if (plusBtn && form) {
        plusBtn.addEventListener("click", () => {
            form.style.display = form.style.display === "block" ? "none" : "block";
        });
    }

});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("registerModal");
    const btn = document.getElementById("RegisterBtn");
    const close = modal.querySelector(".close");

    btn.addEventListener("click", () => modal.style.display = "block");
    close.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
    const plusBtn = document.querySelector(".new-project");
    if (plusBtn && form) {
        plusBtn.addEventListener("click", () => {
            form.style.display = form.style.display === "block" ? "none" : "block";
        });
    }

});