import {createServer} from "../data/users-data.mjs";
import express from 'express';

const router = express.Router();
router.post("/servers", async (req, res) => {
    try {
        const {name, ownerId, channels, members} = req.body;

        const newServer = await createServer(name, ownerId);

        // Opcionalmente adicionas os membros escolhidos
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