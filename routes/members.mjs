import express from 'express';
import * as data from '../data/users-data.mjs';

const router = express.Router();

// === Adicionar membro ao servidor ===
router.post('/servers/:serverId/members', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const {userId, role} = req.body; // role opcional: "member" por default

    try {
        const server = await data.getServer(serverId);
        const user = await data.getUser(userId);

        if (server.members.find(m => m.id === userId)) {
            return res.status(400).send("User already a member");
        }

        server.members.push({id: userId, role: role || "member"});
        res.json(server.members);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// === Remover membro do servidor ===
router.delete('/servers/:serverId/members/:userId', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const userId = req.params.userId;

    try {
        const server = await data.getServer(serverId);
        const memberIndex = server.members.findIndex(m => m.id === userId);

        if (memberIndex === -1) {
            return res.status(404).send("User not found in server");
        }

        server.members.splice(memberIndex, 1);
        res.json(server.members);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// === Alterar role de um membro ===
router.patch('/servers/:serverId/members/:userId', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const userId = req.params.userId;
    const {role} = req.body;

    try {
        const server = await data.getServer(serverId);
        const member = server.members.find(m => m.id === userId);

        if (!member) return res.status(404).send("User not found in server");

        member.role = role;
        res.json(member);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// === Listar membros de um servidor ===
router.get('/servers/:serverId/members', async (req, res) => {
    const serverId = parseInt(req.params.serverId);

    try {
        const server = await data.getServer(serverId);
        const members = await Promise.all(
            server.members.map(async m => {
                const user = await data.getUser(m.id);
                return {id: user.id, name: user.name, email: user.email, role: m.role};
            })
        );
        res.json(members);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/servers/:serverId/validate-member', async (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const {userId} = req.body;
    try {
        // usa a funcao addUserToServer para verificar se o user é valido
        await data.addUserToServer(userId, serverId);
        res.json({valid: true});


    } catch (err) {
        res.status(400).send(err.message);

    }
});

export default router;
