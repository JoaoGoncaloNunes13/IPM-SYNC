document.addEventListener("DOMContentLoaded", () => {
    const taskModal = document.getElementById("create-task-modal");
    if (!taskModal) return;

    // Função global para abrir modal
    window.openCreateTaskModal = () => {
        taskModal.style.display = "block";
    };

    // Função global para fechar modal
    window.closeTaskModal = () => {
        taskModal.style.display = "none";
    };

    // Fechar clicando fora do modal
    window.addEventListener("click", (e) => {
        if (e.target === taskModal) {
            taskModal.style.display = "none";
        }
    });

    // Fechar clicando no botão X (se existir)
    const closeBtn = taskModal.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            taskModal.style.display = "none";
        });
    }
});
