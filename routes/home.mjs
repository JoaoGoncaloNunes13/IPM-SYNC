import express from 'express';
import * as data from '../data/users-data.mjs';
import {createStudySession, getUser} from "../data/users-data.mjs";

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
    const {title, date, duration} = req.body;
    console.log("Dados recebidos:", req.body);

    if (!title || !date) {
        return res.status(400).send("Título e data são obrigatórios");
    }

    try {
        // Chama a tua função do data module
        const session = await createStudySession(req.session.userId, title, date, duration);

        console.log("Sessão de estudo criada:", session);
        res.json({ success: true, session });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao criar a sessão");
    }
});


router.get('/getStudySessions', async (req, res) => {
    const user = getUser(req.session.userId);
    if (!user || !user.calendar) return res.json([]);
    try {
        const sessionEvents = await data.getStudySessions(user.id);
        console.log("Sessões obtidas:", sessionEvents);
        const events = sessionEvents.map(s => ({
            title: s.title,
            start: s.date,
            allDay: true
        }));
        console.log("Eventos formatados:", events);

        res.json(events)


    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao obter as sessões");
    }

    res.json(events);
});


export default router;
