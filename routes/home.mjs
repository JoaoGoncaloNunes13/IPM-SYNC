import express from 'express';
import * as data from '../data/users-data.mjs';
const router = express.Router();

router.get('/home', (req, res) => {
    if (!req.session.userId) return res.redirect('/');

    const user = data.users.find(u => u.id === req.session.userId);

    const projects = data.servers.map(s => ({
        id: s.id,
        name: s.name,
        initial: s.name.charAt(0).toUpperCase()
    }));

    const upcomingEvents = [];
    const recentMessages = [];

    res.render('home', { name: user.name, projects, upcomingEvents, recentMessages, loggedIn: true });
});

export default router;
