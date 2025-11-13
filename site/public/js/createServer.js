document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createServerForm");
    if (!form) return; // evita erros se o form não estiver na página

    const servers = [];

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const serverName = document.getElementById("serverName").value;
        const ownerId = parseInt(document.getElementById("ownerId").value);
        const members = Array.from(document.getElementById("members").selectedOptions).map(opt => parseInt(opt.value));
        const channels = {
            texto: document.getElementById("texto").checked ? [] : null,
            grupos: document.getElementById("grupos").checked ? [] : null,
            tarefas: document.getElementById("tarefas").checked ? [] : null,
            calendario: document.getElementById("calendario").checked ? [] : null,
        };

        const newServer = {
            id: servers.length + 1,
            name: serverName,
            ownerId,
            members,
            channels,
        };

        servers.push(newServer);
        alert("Servidor criado: " + serverName);
        console.log("Servidores:", servers);

        this.reset();
        this.style.display = "none"; // opcional, se estiveres a esconder o form
    });
});
