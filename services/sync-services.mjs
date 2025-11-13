// Module contains all task management logic


export default function(Data) {
     // Validate arguments
     if (!Data) {
        throw new Error("Data module is required");
    }


    return {
        createUser: createUser,
        getUser: getUser,
        addUserToServer: addUserToServer,
        createServer: createServer,
        getServer: getServer,
        createChannel: createChannel,
        getChannels: getChannels,
        sendMessage: sendMessage,


    }

    async function createUser(userToCreate) {
        return Data.createUser(userToCreate);
    }

    async function getUser(id) {
        return Data.getUser(id);
    }

    async function addUserToServer(userId, serverId) {
        return Data.addUserToServer(userId, serverId);
    }

    async function createServer(name, ownerId) {
        return Data.createServer(name, ownerId);
    }

    async function getServer(idServer) {
        return Data.getServer(idServer);    
    }

    async function createChannel(serverId, type, name) {
        return Data.createChannel(serverId, type, name);
    }

    async function getChannels(serverId) {
        return Data.getChannels(serverId);
    }

    async function sendMessage(serverId, channelType, channelId, userId, content) {
        return Data.sendMessage(serverId, channelId, userId, content);
    }

}

