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
    const {title, date,endDate, duration} = req.body;
    console.log("Dados recebidos:", req.body);

    if (!title || !date) {
        return res.status(400).send("Título e data são obrigatórios");
    }

    try {
        // Chama a tua função do data module
        const sessions = await createStudySessions(req.session.userId, title, date,endDate, duration);
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
        const events = sessionEvents.map(s => ({
            id: s.id,
            title: s.title,
            start: s.time ? `${s.date}T${s.time}` : s.date,  // ISO string completa
            allDay: !s.time
        }));
        res.json(events)


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
