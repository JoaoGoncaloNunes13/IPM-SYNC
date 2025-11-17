import express from 'express';
import * as data from '../data/users-data.mjs';


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

export default router;