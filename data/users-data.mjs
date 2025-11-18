import {randomUUID} from 'crypto'

const calendarDays = [];
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const daysInMonth = new Date(year, month + 1, 0).getDate();

for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({day: i, date: `${year}-${month + 1}-${i}`});
}

export let users = [];
export let servers = [];

export function initializeData() {
    if (users.length > 0 || servers.length > 0) return;

    users = [
        {id: randomUUID(), name: "João Nunes", email: "joao@sync.com", password: "1234", calendar: []},
        {id: randomUUID(), name: "Madalena Alves", email: "madalena@sync.com", password: "1234", calendar: []},
        {id: randomUUID(), name: "Pedro Peres", email: "pedro@sync.com", password: "1234", calendar: []},
        {id: randomUUID(), name: "Ricardo Oliveira", email: "ricardo@sync.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Professora Teresa", email: "teresa@sync.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Fernando Torres", email: "fernando@gmail.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Miguel Gamboa", email: "miguel@gmail.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "João Trindade", email: "joao@gmail.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Pedro Felix", email: "pedro@gmail.com", password: "1234",calendar: []},
    ];

    servers = [
        {
            id: 0,
            name: "Projeto IPM Teste",
            ownerId: users[0].id,
            codigo: "ABC123",
            channels: {
                texto: [],
                grupos: [],
                tarefas: [],
                calendario: [],
            },
            members: [{
                id: users[0].id,
                name: users[0].name,
                role: "owner"
            },
                {
                    id: users[1].id,
                    name: users[1].name,
                    role: "standard"
                }

            ],
        },
        {
            id: 1,
            name: "Trabalho Engenharia",
            ownerId: users[1].id,
            codigo: "DEF456",
            channels: {
                texto: [ {id: 0, name: "Geral", messages: []} , // tem que ter ID do user q mandou a msg e texto
                    {id: 1, name: "canal 2 de texto", messages: [] }

                ],
                grupos: [],
                tarefas: [],
                calendario: [],
            },
            members:  [{
                id: users[0].id,
                name: users[0].name,
                role: "owner"
            }],
        },

        {
            id: 2,
            name: "Projeto IPM",
            ownerId: users[5].id,
            codigo: "GHI789",
            channels: {
                texto: [{
                    id: 0, 
                    name: "Canal de Texto", 
                    messages: [{id: 0, authorId: users[5].id, author: users[5].name, content: "Olá a todos!", timestamp: new Date()},]
                    },
                    {
                        id: 1, 
                        name: "Segundo Canal de Texto", 
                        messages: []
                    }],
                grupos: [],
                tarefas: [],
                calendario: [],
            },
            members:[{
                        id: users[5].id,
                        name: users[5].name,
                        role: "owner"
                    },
                    {
                        id: users[6].id,
                        name: users[6].name,
                        role: "standard"
                    },
                    {
                        id: users[7].id,
                        name: users[7].name,
                        role: "standard"
                    },
                    {
                        id: users[8].id,
                        name: users[8].name,
                        role: "standard"
                    }
            ],
        }
    ];

    console.log(servers.find(s => s.id === 2).channels.texto);
    console.log(servers.find(s => s.id === 2).channels['texto']);
}


export async function createUser(userToCreate) {
    if (users.find((u) => u.email === userToCreate.email)) {
        throw new Error("Email already in use");
    } else {
        let newUser =
            {
                id: randomUUID(),
                name: userToCreate.name,
                email: userToCreate.email,
                password: userToCreate.password,
                calendar: []
            };
        users.push(newUser);
        console.log(users);
        return newUser;
    }
}

export async function getUser(id) {
    let user = users.find(u => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
}

export async function addUserToServer(userId, serverId, role) {
    let server = servers.find(s => s.id === serverId);
    if (!server) throw new Error("Server not found");
    let user = users.find(u => u.id === userId);
    if (!user) throw new Error("User not found");
    if (!server.members.includes(userId)) {
        server.members.push({id: userId, name: user.name, role: role || "member"});
        console.log("User added to server successfully");
        return server.members;
    } else {
        throw new Error("User already a member of the server");
    }
}

// Funçoes para gerir servidores

export async function createServer(name, ownerId, channels) {
    const newServer = {
        id: servers.length,
        name,
        ownerId,
        codigo: Math.random().toString(36).substring(2, 8).toUpperCase(),
        channels: {
            texto: [{
                id: randomUUID(),
                name: "Geral",
                messages: []
            }],
            grupos: channels.grupos ? [channels.grupos] : [],
            tarefas: channels.tarefas ? [channels.tarefas] : [],
            calendario: channels.calendario ? [channels.calendario] : [],
        },
        members: [{
            id: ownerId,
            name: (await getUser(ownerId)).name,
            role: "owner"
        }],
    };
    servers.push(newServer);
    return newServer;
}

export async function getServer(idServer) {
    let server = servers.find((s) => s.id === idServer);
    if (!server) throw new Error("Server not found");
    return server;
}

//criação de canais

export async function createChannel(serverId, type, name) {  //alterar para depois cada tipo de canal que temos
    const server = getServer(serverId);
    let channel = null;
    if (!server) throw new Error("Servidor não encontrado.");
    if (!server.channels[type]) throw new Error("Tipo de canal inválido.");
    if (type == 'texto') {
        channel = {id: randomUUID(), name, messages: []};
    } else if(type == 'grupos') {
        channel = {id: randomUUID(), name, grupos: []};
    } else if (type == 'tarefas') {
        channel = {id: randomUUID(), name, tarefas: []};
    } else if (type == 'calendario') {
        channel = {id: randomUUID(), name, eventos: []};
    }

    server.channels[type].push(channel);
    return channel;
}

export async function getChannel(serverId, type, channelId) {
    const server = await getServer(serverId);
    if (!server) throw new Error("Servidor não encontrado.");
    let a = server.channels;
    let b = server.channels['texto'];
    let channelType = server.channels[type]
    console.log(a);
    console.log(b);
    console.log(server.channels[type]);
    if (!channelType) throw new Error("Tipo de canal inválido.");
    const channel = server.channels[type].find((c) => c.id === channelId);
    if (!channel) throw new Error("Canal não encontrado.");
    return channel;
}

// Funçoes para gerir mensagens

export async function sendMessage(serverId, channelType, channelId, userId, content) {
    const channel = await getChannel(serverId, channelType, channelId);
    const user = await getUser(userId);
    if (!channel) throw new Error("Channel not found");
    if (!user) throw new Error("User not found");
    const message = {id: randomUUID(), authorId: userId, author: user.name, content: content, timestamp: new Date()};
    channel.messages.push(message);
    return message;
}

export async function getMessages(serverId, channelType, channelId) {
    const channel = await getChannel(serverId, channelType, channelId);
    if (!channel) throw new Error("Channel not found");
    return channel.messages;
}

// lembretes e sessoes de estudo

export async function createStudySession(userId, title, date, duration) {
    const user = await getUser(userId);
    if (!user) throw new Error("Utilizador não encontrado.");
    const session = {id: user.calendar.length, title, date, duration, type: "sessão"};
    user.calendar.push(session);
    return session;
}

export async function getStudySessions(userId) {
    const user = await getUser(userId);
    if (!user) throw new Error("Utilizador não encontrado.");
    if (!user.calendar) return [];
    const sessions = user.calendar;

    return sessions;

}

export async function createReminder(userId, title, date) {
    const user = getUser(userId);
    if (!user) throw new Error("Utilizador não encontrado.");

    if (!user.calendar) user.calendar = [];
    const reminder = {id: user.calendar.length, title, date, type: "lembrete"};
    user.calendar.push(reminder);
    return reminder;
}

export async function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Credenciais inválidas");
    return user;
}
