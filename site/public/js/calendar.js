document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const form = document.getElementById('studySessionForm');

    if (!calendarEl || !form) return;

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'pt',
            events: '/getStudySessions',
            dateClick: function(info) {
                alert("Dia clicado: " + info.dateStr);
            }
        });

    calendar.render();

    // Intercepta o submit do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        const data = {
            title: formData.get('title'),
            date: formData.get('date'),
            time: formData.get('time'),
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
            calendar.refetchEvents();
        }else {
            alert("Erro ao criar sessão");
        }
    });
});

