import { randomUUID } from 'crypto'
const calendarDays = [];
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const daysInMonth = new Date(year, month + 1, 0).getDate();

for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, date: `${year}-${month+1}-${i}` });
}

export let users = [];
export let servers = [];

export function initializeData() {
  if (users.length > 0 || servers.length > 0) return;

  users = [
    { id: randomUUID(), name: "João Nunes", email: "joao@sync.com", password: "1234" },
    { id: randomUUID(), name: "Madalena Alves", email: "madalena@sync.com" , password: "1234"  },
    { id: randomUUID(), name: "Pedro Peres", email: "pedro@sync.com" , password: "1234" },
    { id: randomUUID(), name: "Ricardo Oliveira", email: "ricardo@sync.com", password: "1234"  },
    { id: randomUUID(), name: "Professora Teresa", email: "teresa@sync.com" , password: "1234" },
  ];

  servers = [
    {
      id: 0,
      name: "Projeto IPM",
      ownerId: users[0].id,
      channels: {
        texto: [],
        grupos: [],
        tarefas: [],
        calendario: [],
      },
      members: [users[0].id],
    },
    {
      id: 1,
      name: "Trabalho Engenharia",
      ownerId: users[1].id,
      channels: {
        texto: [],
        grupos: [],
        tarefas: [],
        calendario: [],
      },
      members: [users[1].id],
    },
  ];
}


// Funçoes para gerir utilizadores
export async function createUser(userToCreate) {
    if (users.find((u) => u.email === userToCreate.email)) {
        throw new Error("Email already in use");
    } else {
        let  newUser = 
        { id: randomUUID(), 
          name: userToCreate.name, 
          email: userToCreate.email , 
          password: userToCreate.password 
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

export async function addUserToServer(userId, serverId) {
    let server = servers.find(s => s.id === serverId);
    if (!server) throw new Error("Server not found");
    if (!users.find(u => u.id === userId)) throw new Error("User not found");
    if (!server.members.includes(userId)) {
        server.members.push(userId);
        console.log("User added to server successfully");
        return server.members;
    } else {
        throw new Error("User already a member of the server");
    }
}

// Funçoes para gerir servidores

export async function createServer(name, ownerId) {
  const newServer = {
    id: servers.length,
    name,
    ownerId,
    channels: {
      texto: [],
      grupos: [],
      tarefas: [],
      calendario: [],
    },
    members: [ownerId],
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
  if(type == 'texto') {
        channel = { id: randomUUID(), name, messages: [] };
    } else {
        channel = { id: randomUUID(), name };
    }
  
  server.channels[type].push(channel);
  return channel;
}

export async function getChannel(serverId, type, channelId) {
  const server = getServer(serverId);
  if (!server) throw new Error("Servidor não encontrado.");
  if (!server.channels[type]) throw new Error("Tipo de canal inválido.");
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
    const message = { id: randomUUID(), userId, content, timestamp: new Date() };
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
  const user = getUser(userId);
  if (!user) throw new Error("Utilizador não encontrado.");

  if (!user.calendar) user.calendar = [];
  const session = { id: user.calendar.length, title, date, duration, type: "sessão" };
  user.calendar.push(session);
  return session;
}

export async function createReminder(userId, title, date) {
  const user = getUser(userId);
  if (!user) throw new Error("Utilizador não encontrado.");

  if (!user.calendar) user.calendar = [];
  const reminder = { id: user.calendar.length, title, date, type: "lembrete" };
  user.calendar.push(reminder);
  return reminder;
}

export async function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Credenciais inválidas");
    return user;
}
