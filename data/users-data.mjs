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
        {id: randomUUID(), name: "João Nunes", email: "joao@sync.com", password: "1234", calendar: [
                { "id": "...", "title": "Matemática", "date": "2025-11-18", "time": "10:00", "duration": 60 },
                { "id": "...", "title": "História", "date": "2025-11-18", "time": "11:30", "duration": 45 }
            ]},
        {id: randomUUID(), name: "Madalena Alves", email: "madalena@sync.com", password: "1234", calendar: []},
        {id: randomUUID(), name: "Pedro Peres", email: "pedro@sync.com", password: "1234", calendar: []},
        {id: randomUUID(), name: "Ricardo Oliveira", email: "ricardo@sync.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Professora Teresa", email: "teresa@sync.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Fernando Torres", email: "fernando@gmail.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Miguel Gamboa", email: "miguel@gmail.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "João Trindade", email: "joao@gmail.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Pedro Felix", email: "pedro@gmail.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Paulo Pereira", email: "paulo@gmail.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Catia Vaz", email: "catia@gmail.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Matilde Pato", email: "matilde@gmail.com", password: "1234",calendar: []},
        {id: randomUUID(), name: "Madalena Alves", email: "madalena@gmail.com", password: "1234",calendar: []},
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
        },

        {
            id: 3,
            name: "Intereção pessoa-máquina",
            ownerId: users[9].id,
            codigo: "JKL012",
            channels: {
                texto: [{
                    id: 0, 
                    name: "Canal de Texto", 
                    messages: [{id: 0, authorId: users[9].id, author: users[9].name, content: "Olá a todos!", timestamp: new Date()},]
                    },
                    {
                        id: 1, 
                        name: "Canal de Duvidas de IPM", 
                        messages: []
                    }],
                grupos: [
                    {
                        id: 0,
                        name: "Canal de Grupos de IPM",
                        groups: [
                            {
                                id: 0,
                                name: "Projeto IPM_GRP1",
                                members: [
                                            {
                                                id: users[9].id,
                                                name: users[9].name,
                                                rule: "owner"
                                            },
                                            {
                                                id: users[6].id,
                                                name: users[6].name,
                                                rule: "standard"
                                            },  
                                            {
                                                id: users[7].id,
                                                name: users[7].name,
                                                rule: "standard"
                                            },  
                                            {
                                                id: users[8].id,
                                                name: users[8].name,
                                                rule: "standard"
                                            }
                                        ],
                        channels: {
                            texto: [{
                                    id: 0, 
                                    name: "Canal de Texto", 
                                    messages: [{id: 0, authorId: users[9].id, author: users[9].name, content: "Olá a todos!", timestamp: new Date()},]
                                    },],
                            tarefas: [
                                        {
                                        id: 0,
                                        name: "tarefas de IPM",
                                        tarefas: [
                                            {
                                                title: 'Pesquisar sobre IPM',
                                                description: 'Fazer uma pesquisa detalhada sobre o que é IPM e suas aplicações.',
                                                deadline: '2025-11-15',
                                                assignedTo: users[6].name,
                                                completed: true
                                            },
                                            {
                                                title: 'Desenvolver protótipo',
                                                description: 'Criar um protótipo funcional para o projeto de IPM.',
                                                deadline: '2025-11-25',
                                                assignedTo: users[7].name,
                                                completed: false
                                            },
                                        ]
                                    }
                            ],
                            calendario: []
                        }
                    },
                    {
                        id: 1,
                        name: "Projeto IPM_GRP2",
                        members: [
                            {
                                id: users[9].id,
                                name: users[9].name,
                                rule: "owner"
                            },
                            {
                                id: users[10].id,
                                name: users[10].name,
                                rule: "standard"
                            },
                            {  
                                id: users[11].id,
                                name: users[11].name,
                                rule: "standard"   
                            },  
                            {
                                id: users[12].id,
                                name: users[12].name,
                                rule: "standard"
                            }
                        ],
                        channels: {
                            texto: [{
                                    id: 0, 
                                    name: "Canal de Texto", 
                                    messages: [{id: 0, authorId: users[9].id, author: users[9].name, content: "Bem vindos ao grupo!" , timestamp: new Date()},]
                                    },],
                            tarefas: [
                                    {
                                        id: 0,
                                        name: "tarefas de IPM",
                                        tarefas: [
                                            {
                                                title: 'Entregar relatório IPM',
                                                description: 'Temos que entregar o relatório do stage 1 até ao final do mês.',
                                                deadline: '2025-11-20',
                                                assignedTo: users[10].name,
                                                completed: true
                                            },
                                            {
                                                title: 'Fazer o backend do projeto',
                                                description: 'O backend deve estar funcional até ',
                                                deadline: '2025-11-22',
                                                assignedTo: users[11].name,
                                                completed: true
                                            },
                                            {
                                                title: 'Fazer o frontend do projeto',
                                                description: 'O frontend deve estar funcional até ',
                                                deadline: '2025-11-28',
                                                assignedTo: users[12].name,
                                                completed: false
                                            }
                                        ]
                                    }
                                ],
                                
                            calendario: []
                        }
                    }
                        ],
                    }
                ],
                tarefas: [],
                calendario: [],
            },
            members:[{
                        id: users[9].id,
                        name: users[9].name,
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
                    },
                    {
                        id: users[10].id,
                        name: users[10].name,
                        role: "owner"
                    },
                    {
                        id: users[11].id,
                        name: users[11].name,
                        role: "standard"
                    },
                    {
                        id: users[12].id,
                        name: users[12].name,
                        role: "owner"
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

export async function createChannel(serverId, type, name) {
    const server = await getServer(serverId);
    if (!server) throw new Error("Servidor não encontrado.");
    if (!server.channels[type]) throw new Error("Tipo de canal inválido.");

    const nextId = server.channels[type].length;
    let channel = null;
    if (type === 'texto') {
        channel = { id: nextId, name, messages: [] };
    } else if (type === 'grupos') {
        channel = { id: nextId, name, groups: [] };
    } else if (type === 'tarefas') {
        channel = { id: nextId, name, tarefas: [] };
    } else if (type === 'calendario') {
        channel = { id: nextId, name, eventos: [] };
    }
    server.channels[type].push(channel);
    console.log(`Servidor ${serverId} tem agora canais do tipo ${type}:`, server.channels[type]);
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

export async function createStudySessions(userId, title, date, endDate, duration,color,time) {
    const user = await getUser(userId);
    if (!user) throw new Error("Utilizador não encontrado.");

    const sessions = [];
    console.log("USERDATA COLOR = ", color);

    // Constrói ISO completa da primeira sessão
    const firstSessionDate = time ? `${date}T${time}` : date;

    if (!endDate) {
        // Apenas uma sessão
        const session = {
            id: user.calendar.length,
            title,
            date: firstSessionDate,
            duration,
            color: color,
            type: "sessão"
        };
        user.calendar.push(session);
        sessions.push(session);
    } else {
        // Criar várias sessões entre date e endDate
        let currentDate = new Date(date);
        const finalDate = new Date(endDate);

        while (currentDate <= finalDate) {
            // Reconstrói ISO string incluindo hora se houver
            const sessionDate = time
                ? `${currentDate.toISOString().split('T')[0]}T${time}`
                : currentDate.toISOString().split('T')[0];

            const session = {
                id: user.calendar.length,
                title,
                date: sessionDate,
                duration,
                color: color,
                type: "sessão"
            };
            user.calendar.push(session);
            sessions.push(session);

            // Avança um dia
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    console.log("Sessões criadas:", sessions);
    return sessions;
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

export async function deleteStudySession(userId, sessionId) {
    const user = await getUser(userId);
    if (!user) throw new Error("Utilizador não encontrado.");
    const sessionIndex = user.calendar.findIndex(s => s.id == sessionId);
    if (sessionIndex === -1) throw new Error("Sessão não encontrada.");
    user.calendar.splice(sessionIndex, 1);
    return true;

}

export async function addTaskToChannel(serverId, channelId, task) {
    const server = await getServer(serverId);
    const channel = server.channels.tarefas.find(c => c.id === channelId);
    channel.tarefas.push(task);
    console.log(`Canal de tarefas ${channelId} agora tem tarefas:`, channel.tarefas);

    // Atualiza calendário se existir
    const calendarChannel = server.channels.calendario[0]; // assume 1 canal
    if (calendarChannel) {
        calendarChannel.events = calendarChannel.events || [];
        calendarChannel.events.push({
            id: calendarChannel.events.length,
            title: task.title,
            date: task.deadline,
            type: 'task'
        });
    }

    return task;
}

export async function addGroupsToChannel(serverId, channelId, groups) {
    const server = await getServer(serverId);

    // garante que há array de canais de grupos
    if (!server.channels.grupos) {
        throw new Error("Não existem canais de grupos neste servidor.");
    }

    // encontra o canal de grupos certo
    const channel = server.channels.grupos.find(c => c.id === channelId);

    if (!channel) {
        throw new Error(`Canal de grupos com id ${channelId} não encontrado.`);
    }

    // garante que o array groups existe dentro do canal
    if (!channel.groups) {
        channel.groups = [];
    }

    const groupsToBeAdded = [];

    for (let i = 0; i < groups.quantity; i++) {
        groupsToBeAdded.push({
            id: channel.groups.length + i,
            name: `${groups.name} ${i + 1}`,
            members: [],
            channels: {
                texto: [],
                tarefas: [],
                calendario: []
            }
        });
    }

    // adiciona os grupos ao canal
    channel.groups.push(...groupsToBeAdded);
    console.log(`Canal ${channelId} agora tem grupos:`, channel.groups);

    return channel;
}

export async function createChannelInGroup(serverId, channelId, groupId, type, name) {
    const server = await getServer(serverId);
    const channel = server.channels.grupos.find(c => c.id === channelId);
    if (!channel) throw new Error("Canal de grupos não encontrado.");
    const group = channel.groups.find(g => g.id === groupId);
    if (!group) throw new Error("Grupo não encontrado.");
    const nextId = group.channels[type].length;
    let newChannel = null;
    if (type === 'texto') {
        newChannel = { id: nextId, name, messages: [] };
    } else if (type === 'tarefas') {
        newChannel = { id: nextId, name, tarefas: [] };
    } else if (type === 'calendario') {
        newChannel = { id: nextId, name, eventos: [] };
    }
    group.channels[type].push(newChannel);
    console.log(`Grupo ${groupId} agora tem canais do tipo ${type}:`, group.channels[type]);
    return newChannel;
}

export async function getGroupChannel(serverId, channelId, groupId, type, channelIdInGroup) {
    const server = await getServer(serverId);
    const channel = server.channels.grupos.find(c => c.id === channelId);
    if (!channel) throw new Error("Canal de grupos não encontrado.");
    const group = channel.groups.find(g => g.id === groupId);
    if (!group) throw new Error("Grupo não encontrado.");
    const groupChannel = group.channels[type].find(c => c.id === channelIdInGroup);
    if (!groupChannel) throw new Error("Canal do grupo não encontrado.");
    return groupChannel;
}

export async function addTaskToChannelInGroup(serverId, channelId, groupId, channelIdInGroup, task) {
    const server = await getServer(serverId);
    const channel = server.channels.grupos.find(c => c.id === channelId);
    if (!channel) throw new Error("Canal de grupos não encontrado.");
    const group = channel.groups.find(g => g.id === groupId);
    if (!group) throw new Error("Grupo não encontrado.");
    const groupChannel = group.channels.tarefas.find(c => c.id === channelIdInGroup);
    if (!groupChannel) throw new Error("Canal de tarefas do grupo não encontrado.");
    groupChannel.tarefas.push(task);

    // Atualiza calendário do grupo se existir
    const calendarChannel = group.channels.calendario[0]; // assume 1 canal de calendário
    if (calendarChannel) {
        calendarChannel.events = calendarChannel.events || [];
        calendarChannel.events.push({
            id: calendarChannel.events.length,
            title: task.title,
            date: task.deadline,
            type: 'task'
        });
    }
    console.log(`Canal de tarefas ${channelIdInGroup} do grupo ${groupId} agora tem tarefas:`, groupChannel.tarefas);
    return task;
    
}


