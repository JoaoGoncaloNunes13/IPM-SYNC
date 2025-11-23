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

        const name = document.getElementById("serverName").value;

        /*const grupos = document.getElementById("grupos").checked;
        const tarefas = document.getElementById("tarefas").checked;
        const calendario = document.getElementById("calendario").checked;*/

        const response = await fetch("/createServer", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ 
                name
            })
        });

        if (!response.ok) {
            alert("Erro ao criar servidor: " + (await response.text()));
            return;
        }

        const newServer = await response.json();

        closeCreateServerModal();

        window.location.href = `/servers/${newServer.id}`;
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

