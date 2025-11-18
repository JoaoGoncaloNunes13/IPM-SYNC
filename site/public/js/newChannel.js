document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("newChannelModal");
    if (!modal) return; // evita erro se modal não existir

    const close = modal.querySelector(".close");

    // Função para abrir o modal
    window.createChannel = function() {
        modal.style.display = "block";
    };

    // Fechar modal clicando no X
    if (close) {
        close.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Fechar modal clicando fora
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
