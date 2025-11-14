import express from 'express';
import * as data from '../data/users-data.mjs';
const router = express.Router();

// Página de projeto
router.get('/:projectId', async (req, res) => {
    const projectId = parseInt(req.params.projectId);
    try {
        const project = await data.getServer(projectId);
        res.render('project', { project });
    } catch (err) {
        res.status(404).send("Projeto não encontrado");
    }
});

// Criar canal
router.post('/:projectId/channels', async (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const { type, name } = req.body;
    try {
        const channel = await data.createChannel(projectId, type, name);
        res.json(channel);
    } catch(err) {
        res.status(400).send(err.message);
    }
});

export default router;
