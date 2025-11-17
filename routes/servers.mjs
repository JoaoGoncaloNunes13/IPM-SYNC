import express from 'express';
import * as data from '../data/users-data.mjs';


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

//Criar um servidor
router.post("/servers", async (req, res) => {
    try {
        const {name,channels} = req.body;
        const ownerId = req.session.userId;

        const newServer = await data.createServer(name, ownerId, channels);


        console.log(data.servers);

        res.json(newServer);
        
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});


export default router;
