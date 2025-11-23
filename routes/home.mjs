import express from 'express';
import * as data from '../data/users-data.mjs';
import {createStudySessions, getUser} from "../data/users-data.mjs";

const router = express.Router();

router.get('/home', (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    const user = data.users.find(u => u.id === req.session.userId);

    const projects = data.servers.filter(server => server.members.some(member => member.id === user.id));

    const upcomingEvents = [];
    const recentMessages = [];

    res.render('home', {name: user.name, projects, upcomingEvents, recentMessages, loggedIn: true});
});


router.post('/createStudySession', async (req, res) => {
    if (!req.session.userId) return res.redirect('/');
    const {title, date,endDate, duration, color, time} = req.body;
    console.log("Dados recebidos:", req.body);

    if (!title || !date) {
        return res.status(400).send("Título e data são obrigatórios");
    }

    try {
        // Chama a tua função do data module
        const sessions = await createStudySessions(req.session.userId, title, date,endDate, duration, color, time);
        console.log("Sessões criadas depois de se fazer o fetch:", sessions);
        res.json({success: true, sessions});
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao criar a sessão");
    }
});


router.get('/getStudySessions', async (req, res) => {
    const user = await getUser(req.session.userId);
    if (!user || !user.calendar) return res.json([]);

    try {
        const sessionEvents = await data.getStudySessions(user.id);
        console.log("Sessões obtidas:", sessionEvents);

        const normalizeStart = (s) => {
            if (!s || !s.date) return null;

            // Caso a data esteja mal formada (ex: '2025-11-24T11:11T11:11') - pega na parte da data e na última parte como hora
            const parts = s.date.split('T').filter(Boolean);
            let datePart = parts[0]; // YYYY-MM-DD
            let timePart = null;

            if (parts.length >= 2) {
                timePart = parts[parts.length - 1];
            } else if (s.time) {
                timePart = s.time;
            }

            if (timePart) {
                // normaliza HH:MM -> HH:MM:00 (se quiseres manter segundos), aqui mantemos HH:MM
                const hhmm = timePart.split(':').slice(0,2).join(':');
                return `${datePart}T${hhmm}`;
            } else {
                return datePart; // all-day
            }
        };

        const events = sessionEvents.map(s => {
            const start = normalizeStart(s);
            const allDay = !start.includes('T');
            return {
                id: s.id,
                title: s.title,
                start,
                allDay,
                color: s.color || '#3788d8',
                backgroundColor: s.color || '#3788d8', // cor do fundo (preenche o dia)
                borderColor: s.color || '#3788d8',     // borda da célula
                display: 'block' // garante que ocupa o dia todo
            };
        }).filter(e => e.start);

        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao obter as sessões");
    }
});


router.get('/getStudySessionsByDate', async (req, res) => {
    const user = await getUser(req.session.userId);
    if (!user) return res.json([]);

    const date = req.query.date; // YYYY-MM-DD

    try {
        const sessions = await data.getStudySessions(user.id);

        // filtrar apenas sessões daquele dia
        const filtered = sessions.filter(s =>
            s.date.startsWith(date)  // funciona tanto para YYYY-MM-DD como YYYY-MM-DDTHH:mm
        );
        console.log("Sessões filtradas para", date, ":", filtered);

        res.json(filtered);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao obter sessões");
    }
});


router.delete('/deleteStudySession/:id', async (req, res) => {
    const sessionId = req.params.id;
    try {
        const userID = req.session.userId;
        await data.deleteStudySession(userID, sessionId);
        res.json({success: true});
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao deletar a sessão");
    }
});


    export default router;
