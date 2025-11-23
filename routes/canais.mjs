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
        await data.addTaskToChannel(serverId, channelId, { title, description, deadline, assignedTo, completed: false });

        // Pega o canal atualizado
        const updatedChannel = await data.getChannel(serverId, 'tarefas', channelId);

        // Substituir assignedTo pelo nome do utilizador
        /*updatedChannel.tarefas = await Promise.all(
            updatedChannel.tarefas.map(async task => {
                if (isUUID(task.assignedTo)) {
                    const user = await data.getUser(task.assignedTo);
                    return { ...task, assignedTo: user.name };
                }
            })
        );*/
        const lastTask = updatedChannel.tarefas[updatedChannel.tarefas.length - 1];
        const user = await data.getUser(lastTask.assignedTo);
        updatedChannel.tarefas[updatedChannel.tarefas.length - 1] = { ...lastTask, assignedTo: user.name };

        res.json(updatedChannel);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// Criar novos grupos num canal
router.post('/servers/:serverId/grupos/:channelId', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const channelId = parseInt(req.params.channelId);
    const { name, quantity } = req.body;

    if (!name || !quantity) {
        return res.status(400).json({ error: "Nome e quantidade são obrigatórios" });
    }

    try {
        await data.addGroupsToChannel(serverId, channelId, { name, quantity });

        // Pega o canal atualizado
        const updatedChannel = await data.getChannel(serverId, 'grupos', channelId);

        res.json(updatedChannel);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Página de visualização de um grupo específico
router.get("/servers/:serverId/grupos/:channelId/:groupId", async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const channelId = parseInt(req.params.channelId);
    const groupId = parseInt(req.params.groupId);

    try {
        const server = await data.getServer(serverId);

        const channel = server.channels.grupos.find(c => c.id === channelId);
        if (!channel) return res.status(404).send("Canal não encontrado");

        const group = channel.groups.find(g => g.id === groupId);
        if (!group) return res.status(404).send("Grupo não encontrado");

        // obter os membnros do grupo que não sao owner
        const filteredGroupMembers = group.members.filter(m => m.rule !== "owner");


        res.render("group", {
            title: group.name,
            group,
            server,
            serverChannel: channel,
            filteredGroupMembers
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao carregar grupo");
    }
});

router.post('/servers/:serverId/grupos/:channelId/:groupId', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const channelId = parseInt(req.params.channelId);
    const groupId = parseInt(req.params.groupId);
    const { type, name } = req.body;

    try {
        const updatedGroup = await data.createChannelInGroup(serverId, channelId, groupId, type, name);
        res.json(updatedGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }   
});

router.get('/servers/:serverId/grupos/:channelId/:groupId/:type/:channelIdInGroup', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const channelId = parseInt(req.params.channelId);
    const groupId = parseInt(req.params.groupId);
    const type = req.params.type;
    const channelIdInGroup = parseInt(req.params.channelIdInGroup); 
    try {
        const channel = await data.getGroupChannel(serverId, channelId, groupId, type, channelIdInGroup);
        res.json(channel);
    } catch (err) {
        res.status(404).send(err.message);
    }   
});

router.post('/servers/:serverId/grupos/:channelId/:groupId/tarefas/:channelIdInGroup', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const channelId = parseInt(req.params.channelId);
    const groupId = parseInt(req.params.groupId);
    const channelIdInGroup = parseInt(req.params.channelIdInGroup);
    const { title, description, deadline, assignedTo } = req.body;
    if (!title || !deadline || !assignedTo) {
        return res.status(400).json({ error: "Título, data e responsável são obrigatórios" });
    }
    try {
        await data.addTaskToChannelInGroup(serverId, channelId, groupId, channelIdInGroup, { title, description, deadline, assignedTo, completed: false });
        const updatedChannel = await data.getGroupChannel(serverId, channelId, groupId, 'tarefas', channelIdInGroup);
        
        const lastTask = updatedChannel.tarefas[updatedChannel.tarefas.length - 1];
        const user = await data.getUser(lastTask.assignedTo);
        updatedChannel.tarefas[updatedChannel.tarefas.length - 1] = { ...lastTask, assignedTo: user.name };


        res.json(updatedChannel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


export default router;