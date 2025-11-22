document.addEventListener("DOMContentLoaded", () => {
    const groupsModal = document.getElementById("create-groups-modal");
    if (!groupsModal) return;

    // Função global para abrir modal
    window.openCreateGroupsModal = () => {
        groupsModal.style.display = "block";
    };

    // Função global para fechar modal
    window.closeGroupsModal = () => {
        groupsModal.style.display = "none";
    };

    // Fechar clicando fora do modal
    window.addEventListener("click", (e) => {
        if (e.target === groupsModal) {
            groupsModal.style.display = "none";
        }
    });

    // Fechar clicando no botão X (se existir)
    const closeBtn = groupsModal.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            groupsModal.style.display = "none";
        });
    }
});
