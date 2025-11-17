function openCreateServerModal() {
    const modal = document.getElementById("createServerModal");
    if (modal) modal.style.display = "flex";
}

function closeCreateServerModal() {
    const modal = document.getElementById("createServerModal");
    if (modal) modal.style.display = "none";
}

window.openCreateServerModal = openCreateServerModal;
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("sidebarToggle");

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("closed");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (!window.serverFormLoaded) {
        window.serverFormLoaded = true;
    } else {
        return; // impede duplicação
    }

    const form = document.getElementById("createServerForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const serverName = document.getElementById("serverName").value;
        const channels = {
            grupos: document.getElementById("grupos").checked ? {
                id: randomUUID(),
                name: "Grupos",
                grupos: []
            } : null,
            tarefas: document.getElementById("tarefas").checked ? {
                id: randomUUID(),
                name: "Tarefas",
                tasks: []
            } : null,
            calendario: document.getElementById("calendario").checked ? {
                id: randomUUID(),
                name: "Calendário",
                events: []
            } : null,
        };

        const response = await fetch("/servers", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( { name: serverName,channels })
        });
        if (!response.ok) {
            alert("Erro ao criar servidor: " + (await response.text()));
        }
        if (response.ok) {
            alert("Servidor criado com sucesso!");
        }


        form.reset();
        closeCreateServerModal();
        window.location.reload();
    });

    // Fecha modal ao clicar fora do conteúdo
    const modal = document.getElementById("createServerModal");
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeCreateServerModal();
    });
});

hbs.registerHelper("initial", function(name) {
    return name.charAt(0).toUpperCase();
});

