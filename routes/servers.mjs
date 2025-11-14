import express from 'express';
import * as data from '../data/users-data.mjs';
import {createServer} from "../data/users-data.mjs";

const router = express.Router();

// Página de projeto
router.get('/servers/:serverId', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    try {
        const server = await data.getServer(serverId);
        res.render('project', {project: server});
    } catch (err) {
        res.status(404).send("Projeto não encontrado");
    }
});

// Criar canal
router.post('/servers/:serverId/channels', async (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const {type, name} = req.body;
    try {
        const channel = await data.createChannel(projectId, type, name);
        res.json(channel);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// verificar os membros que estao no projeto
router.get('/servers/:serverId/members', async (req, res) => {
    const projectId = parseInt(req.params.projectId);
    try {
        const project = await data.getServer(projectId);
        const members = await Promise.all(project.members.map(memberId => data.getUser(memberId)));
        res.json(members);
    } catch (err) {
        res.status(404).send(err.message);
    }
});
router.post("/servers", async (req, res) => {
    try {
        const {name, ownerId, channels, members} = req.body;

        const newServer = await createServer(name, ownerId);

        if (members) {
            newServer.members = members;
        }

        // E os canais
        if (channels) {
            newServer.channels = channels;
        }

        res.json(newServer);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

export default router;
