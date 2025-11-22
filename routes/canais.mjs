import express from 'express';
import * as data from '../data/users-data.mjs';
import {addTaskToChannel} from "../data/users-data.mjs";


const router = express.Router();

router.get('/servers/:serverId/:type/:channelId', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const channelId = parseInt(req.params.channelId);
    const type = req.params.type;

    try {
        const channel = await data.getChannel(serverId, type, channelId);
        res.json(channel);
    } catch (err) {
        res.status(404).send(err.message);
    }
});

router.post('/servers/:serverId/channels', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const {type, name} = req.body;
    try {
        const channel = await data.createChannel(serverId, type, name);
        res.json(channel);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Criar nova tarefa num canal
router.post('/servers/:serverId/tarefas/:channelId', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const channelId = parseInt(req.params.channelId);
    const { title, description, deadline, assignedTo } = req.body;

    if (!title || !deadline || !assignedTo) {
        return res.status(400).json({ error: "Título, data e responsável são obrigatórios" });
    }

    try {
        await data.addTaskToChannel(serverId, channelId, { title, description, deadline, assignedTo });

        // Pega o canal atualizado
        const updatedChannel = await data.getChannel(serverId, 'tarefas', channelId);

        // Substituir assignedTo pelo nome do utilizador
        updatedChannel.tarefas = await Promise.all(
            updatedChannel.tarefas.map(async task => {
                const user = await data.getUser(task.assignedTo);
                return { ...task, assignedTo: user.name };
            })
        );

        res.json(updatedChannel);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


export default router;