document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const form = document.getElementById('studySessionForm');

    if (!calendarEl || !form) return;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt',
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
                    li.classList.add('session-item'); // se tiveres CSS de cards

                    // hora já está separada, mas podes usar s.time se existir
                    const hora = s.date.includes("T") ? s.date.split("T")[1] : (s.time || "Sem hora");

                    li.innerHTML = `
                      <strong>${s.title}</strong>
                     <div>Data: ${s.date.split("T")[0]}</div>
                         <div>Hora: ${hora}</div>
                         <div>Duração: ${s.duration ? s.duration + " min" : "Não definido"}</div>` ;

                    list.appendChild(li);
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

        let date = formData.get('date');
        const time = formData.get('time');
        if (time) date += 'T' + time;

        const data = {
            title: formData.get('title'),
            date: date,
            duration: formData.get('duration')
        };

        const res = await fetch('/createStudySession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {

            const result = await res.json();
            console.log("Sessão criada:", result.session);

            alert("Sessão criada!");
            form.reset();

            // Atualiza o FullCalendar para mostrar a nova sessão
            calendar.addEvent({
                title: result.session.title,
                start: result.session.date,
                allDay: !time
            });
            calendar.refetchEvents();
        } else {
            alert("Erro ao criar sessão");
        }
    });
});

