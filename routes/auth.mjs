import express from 'express';
import * as data from '../data/users-data.mjs';
const router = express.Router();

// Página inicial
router.get('/', (req, res) => {
    res.render('index', {
        title: 'SYNC',
        message: 'Bem-vindo ao SYNC 👋',
        version: 'v1.0',
        loggedIn: !!req.session.userId
    });
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await data.loginUser(email, password);
        req.session.userId = user.id;
        res.redirect('/home');
    } catch (err) {
        res.status(401).send(err.message);
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/');
    });
});

// Registo
router.get('/register', (req, res) => {
    res.render('navbar-items/register', { title: 'Registo - SYNC' });
});
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await data.createUser({ name, email, password });
        req.session.userId = newUser.id;
        res.redirect('/home');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

export default router;
