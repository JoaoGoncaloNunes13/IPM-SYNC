import express from 'express';
import * as data from '../data/users-data.mjs';
const router = express.Router();

router.get('/home', (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    const user = data.users.find(u => u.id === req.session.userId);

    const projects = data.servers.filter(server => server.members.some(member => member.id === user.id));

    const upcomingEvents = [];
    const recentMessages = [];

    res.render('home', { name: user.name, projects, upcomingEvents, recentMessages, loggedIn: true });
});

export default router;
