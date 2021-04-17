

let subscribers=[]



let ws=null;

const closeHandler=()=>{
    alert('CLOSE WS');
    setTimeout(createChannel,3000)
}


const messageHandler=(e)=>{
    const newMessages=JSON.parse(e.data)
    subscribers.forEach(s=>s(newMessages))
}



function createChannel(){
    if(ws!=null)ws.removeEventListener('close',closeHandler)
    if(ws!=null)ws.close();
    ws=new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close',closeHandler)
    ws.addEventListener('message',messageHandler)
}



export const chatApi={
    start(){
        createChannel()
    },
    stop(){
        subscribers=[]
        if(ws!=null)ws.removeEventListener('close',closeHandler)
        if(ws!=null)ws.removeEventListener('message',messageHandler)
        if(ws!=null)ws.close()
    },
    subscribe(callback){
        subscribers.push(callback)
        return ()=>{
            subscribers=subscribers.filter(s=>s !== callback)
        }
    },
    unsubscribe(callback){
            subscribers=subscribers.filter(s=>s !== callback)

    },
    sendMessages(message){
        if(ws!=null)ws.send(message)
    }

}