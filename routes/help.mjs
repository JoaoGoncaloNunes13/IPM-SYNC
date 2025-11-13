import express from 'express';
const router = express.Router();

const helpMessages = [];

// About Us, FAQs, Help
router.get('/aboutus', (req, res) => {
    res.render('navbar-items/aboutus', { title: 'About Us - SYNC', message: 'Saiba mais sobre nós!' });
});
router.get('/faqs', (req, res) => {
    res.render('navbar-items/faqs', { title: 'FAQs - SYNC', message: 'Perguntas Frequentes' });
});
router.get('/help', (req, res) => {
    res.render('navbar-items/help', { title: 'Help - SYNC', message: 'Precisas de ajuda?' });
});

// POST do modal de ajuda
router.post('/sendHelp', (req, res) => {
    const { name, email, message } = req.body;
    helpMessages.push({ id: helpMessages.length + 1, name, email, message, timestamp: new Date() });
    console.log('Mensagem de ajuda recebida:', helpMessages[helpMessages.length - 1]);
    res.send('Mensagem recebida! Obrigado por nos contactar.');
});

export default router;
