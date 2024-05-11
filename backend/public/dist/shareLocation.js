function getLocation(){
    const roomName = document.querySelector("#roomName h3").getAttribute("roomName")
    const endpoint = document.querySelector("#roomName h3").getAttribute("endpoint")
    const userID = document.getElementById("userID").value
    navigator.geolocation.getCurrentPosition((position)=>{
        const{latitude: lat, longitude: long} = position.coords
        const latLong = new google.maps.LatLng(lat, long)
        const myOptions = {
            center : latLong,
            zoom:15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl:false,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            }
        }
    
    namespaceSocket.emit("newLocation",{
        location: myOptions,
        roomName,
        endpoint,
        sender: userID
      })
    
      namespaceSocket.off("confirmLocation")
      namespaceSocket.on("confirmLocation",data=>{
        const li = stringToHTML(`
        <li class="${(userID == data.sender)? 'sent' : 'replies'}">
          <img src="assets/image/1713477957714.jpeg" alt="profile pic" />
          
        </li>`)
        const p = stringToHTML(`<p id="location-me" style="width:200px; height:150px;"></p>`)
        const map = new google.maps.Map(p,data.location)
        li.appendChild(p)
        document.querySelector(".messages ul").appendChild(li)
        new google.maps.Marker({
            position: data.location.center,
            map,
            title:"You are here"
        })
        const messagesEl = document.querySelector("div.messages")
        messagesEl.scrollTo(0,messagesEl.scrollHeight)
      })
    },(error)=>{
        const li = stringToHTML(`
        <li class="sent">
          <img src="assets/image/1713477957714.jpeg" alt="profile pic" />
          
        </li>`)
        const p = stringToHTML(`<p id="location-me" style="width:200px; height:150px;">${error.message}</p>`)
        li.appendChild(p)
        document.querySelector(".messages ul").appendChild(li)
    })

}




