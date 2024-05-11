const socket = io("http://localhost:3400");

const ulElement = document.getElementById("contacts").querySelector("ul");

let namespaceSocket;

function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild
}

function initNamespaceConnection(endpoint) {
  if(namespaceSocket) namespaceSocket.close()
  namespaceSocket = io(`http://localhost:3400/${endpoint}`);
  namespaceSocket.on("connect", () => {
    namespaceSocket.on("roomList", (rooms) => {
      getRoomInfo(endpoint,rooms[0]?.name);
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
          getRoomInfo(endpoint,roomName);
        });
      });
    });
  });
}
function sendMessage(){
  const roomName = document.querySelector("#roomName h3").getAttribute("roomName")
  const endpoint = document.querySelector("#roomName h3").getAttribute("endpoint")
  let message = document.querySelector(".message-input input#messageInput").value;
  if(message.trim() === ""){
    return alert("input message can not be empty")
  }
  const userID = document.getElementById("userID").value
  
  namespaceSocket.emit("newMessage",{
    message,
    roomName,
    endpoint,
    sender: userID
  })

  namespaceSocket.off("confirmMessage")
  namespaceSocket.on("confirmMessage",data=>{
   const li = stringToHTML(`
    <li class="${(userID === data.sender) ? 'sent': 'replies'}">
      <img src="assets/image/1713477957714.jpeg" alt="profile pic" />
      <p>${data.message}</p>
    </li>`)
    document.querySelector(".messages ul").appendChild(li)
    document.querySelector(".message-input input#messageInput").value = ""
    const messagesEl = document.querySelector("div.messages")
    messagesEl.scrollTo(0,messagesEl.scrollHeight)
  })
}

function getRoomInfo(endpoint,room) {
  document.querySelector("#roomName h3").setAttribute("roomName",room)
  document.querySelector("#roomName h3").setAttribute("endpoint",endpoint)
  namespaceSocket.emit("joinRoom", room);
  namespaceSocket.off("roomInfo")
  namespaceSocket.on("roomInfo", (roomInfo) => {
    
    document.querySelector(".messages ul").innerHTML = ""
    document.querySelector("#roomName h3").innerText = roomInfo?.description
    const messages = roomInfo?.messages;
    const locations= roomInfo?.locations
    const data = [...messages,...locations].sort((conv1,conv2)=> conv1.dateTime - conv2.dateTime )
    const userID = document.getElementById("userID").value;
    for (const message of messages) {
        const li = stringToHTML(`
            <li class="${(userID == message.sender)? 'sent' : 'replies'}">
                <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
                    alt="" />
                <p>${message.message}</p>
            </li>   
        `)
        document.querySelector(".messages ul").appendChild(li)
    }
})
  namespaceSocket.on("countOfOnlineUsers",countOfUsers => {
    document.getElementById("onlineCount").innerText = countOfUsers 
  })
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
  window.addEventListener("keydown",(e)=>{
    if(e.code ==="enter") sendMessage()
  })
document.querySelector("button.submit").addEventListener("click",()=>{
  sendMessage()
})
});

