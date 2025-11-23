document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const form = document.getElementById('studySessionForm');

    if (!calendarEl || !form) return;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt',
        events: '/getStudySessions',
        dateClick: async function (info) {

            // Buscar as sessões daquele dia
            const res = await fetch(`/getStudySessionsByDate?date=${info.dateStr}`);
            const sessions = await res.json();

            // Referências ao popup e lista
            const popup = document.getElementById('dayPopup');
            const list = document.getElementById('sessionList');

            list.innerHTML = "";

            if (sessions.length === 0) {
                list.innerHTML = "<li>Sem sessões neste dia.</li>";
            } else {
                sessions.forEach(s => {
                    const li = document.createElement('li');
                    li.classList.add('session-item');
                    const hora = s.date.includes("T") ? s.date.split("T")[1] : (s.time || "Sem hora");
                    li.innerHTML = `
            <div style="display:flex; justify-content: space-between; align-items:center;">
                <strong>${s.title}</strong>
                <button class="delete-btn" style="
                    background: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    padding: 4px 8px;
                    cursor: pointer;
                    font-size: 0.85rem;
                ">Apagar</button>
            </div>
            <div>Data: ${s.date.split("T")[0]}</div>
            <div>Hora: ${hora}</div>
            <div>Duração: ${s.duration ? s.duration + " min" : "Não definido"}</div>
        `;
                    list.appendChild(li);
                    li.querySelector('.delete-btn').addEventListener('click', async () => {
                        if (!confirm(`Deseja realmente apagar a sessão "${s.title}"?`)) return;

                        try {
                            const res = await fetch(`/deleteStudySession/${s.id}`, { method: 'DELETE' });
                            if (res.ok) {
                                li.remove(); // remove o li do DOM
                                alert('Sessão apagada!');
                                window.location.reload();
                            } else {
                                alert('Erro ao apagar sessão.');
                            }
                        } catch (err) {
                            console.error(err);
                            alert('Erro ao apagar sessão.');
                        }
                    });
                });
            }
      popup.style.display = "flex";  // abrir popup
        }
    });

    calendar.render();

    // Intercepta o submit do formulário
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        let date = formData.get('date');        // YYYY-MM-DD
        let endDate = formData.get('endDate');  // YYYY-MM-DD or ""
        const time = formData.get('time');      // HH:MM or ""
        const diaAtual = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        if (date < diaAtual) {
            alert("A data não pode ser anterior ao dia de hoje!");
            return;
        }


        if (endDate && endDate < date) {
            alert("A data final não pode ser menor que a data inicial!");
            return;
        }

        const payload = {
            title: formData.get('title'),
            date: date,                       // envia SEM 'T'
            endDate: endDate || null,         // null se vazio
            duration: formData.get('duration'),
            color: formData.get('color'),
            time: time || null                // envia time separado
        };

        const res = await fetch('/createStudySession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            await res.json(); // opcional: podes inspecionar a resposta
            alert("Sessão criada!");
            calendar.refetchEvents(); // suficiente para atualizar
            form.reset();
        } else {
            alert("Erro ao criar sessão");
        }
    });
});

