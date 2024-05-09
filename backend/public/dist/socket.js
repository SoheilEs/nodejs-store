const socket = io("http://localhost:3400");

const ulElement = document.getElementById("contacts").querySelector("ul");

let namespaceSocket;

function initNamespaceConnection(endpoint) {
  namespaceSocket = io(`http://localhost:3400/${endpoint}`);
  namespaceSocket.on("connect", () => {
    namespaceSocket.on("roomList", (rooms) => {
      getRoomInfo(rooms[0].name);
      ulElement.innerHTML = "";
      rooms.map((room) => {
        ulElement.innerHTML += `
                <li class="contact" roomName="${room.name}">
                <div class="wrap">
                <img src="${room.image}" alt="room image" />
                    <div class="meta">
                        <p class="name">${room.name}</p>
                        <p class="preview">${room.description}</p>
                    </div>
                </div>
                </li>`;
      });
      const roomNode = document.querySelectorAll("ul li.contact");
      roomNode.forEach((room) => {
        room.addEventListener("click", () => {
          const roomName = room.getAttribute("roomName");
          getRoomInfo(roomName);
        });
      });
    });
  });
}

function getRoomInfo(room) {
  namespaceSocket.emit("joinRoom", room);
  namespaceSocket.on("roomInfo", (roomInfo) => {
    document.querySelector("#roomName h3").innerText = roomInfo.description;
  });
}

socket.on("connect", () => {
  socket.on("namespacesList", (namespacesList) => {
    const nameSpacesElement = document.getElementById("namespaces");
    nameSpacesElement.innerHTML = "";
    initNamespaceConnection(namespacesList[0].endpoint);
    namespacesList.map((item) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.setAttribute("class", "namespaceTitle");
      p.setAttribute("endpoint", item.endpoint);
      p.innerText = item.title;
      li.appendChild(p);
      nameSpacesElement.appendChild(li);
    });
    const namespaceNodes = document.querySelectorAll(
      "#namespaces li p.namespaceTitle"
    );
    namespaceNodes.forEach((node) =>
      node.addEventListener("click", () => {
        const endpoint = node.getAttribute("endpoint");
        initNamespaceConnection(endpoint);
      })
    );
  });
});
