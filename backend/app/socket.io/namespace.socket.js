const { ConversationModel } = require("../models/conversation");

class NamespaceSocketHandler {
  #io;
  constructor(io) {
    this.#io = io;
  }
  initConnection() {
    this.#io.on("connection", async (socket) => {
      const namespaces = await ConversationModel.find({}, { rooms: 0 }).sort({
        _id: -1,
      });
      socket.emit("namespacesList", namespaces);
    });
  }
  async createNamespacesConnection() {
    const namespaces = await ConversationModel.find({}).sort({ _id: -1 });
    namespaces.map((namespace) =>
      this.#io.of(`/${namespace.endpoint}`).on("connection", async (socket) => {
        const conversation = await ConversationModel.findOne(
          { endpoint: namespace.endpoint },
          { rooms: 1 }
        ).sort({ _id: -1 });
        socket.emit("roomList", conversation.rooms);
        socket.on("joinRoom", (roomName) => {
          const lastRoom = Array.from(socket.rooms)[1];
          if (lastRoom) {
            socket.leave(lastRoom);
          }
          socket.join(roomName);
          const roomInfo = conversation.rooms.find(
            (item) => item.name === roomName
          );
          socket.emit("roomInfo", roomInfo);
        });
      })
    );
  }
}
module.exports = {
  NamespaceSocketHandler,
};
