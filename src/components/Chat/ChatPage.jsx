import React, {useEffect, useRef, useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import userPhoto from '../../assets/images/user.png';
import styles from "../Users/users.module.css";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import s from "../Chat/Chat.module.css"


const ChatPage = () => {


    return <Chat/>
}

let Chat = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return <div>

        <div className="one" ><h1>Chat</h1></div>

        <Messages/>
        <AddMessageForm/>


    </div>
}

const Messages = () => {
    const messagesChatRef = useRef(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const messages = useSelector((state) => state.chat.messages
    )




    const scrollHandler = (e, UIEvent) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }


    useEffect(() => {
        messagesChatRef.current.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
        <div ref={messagesChatRef}></div>
    </div>
}
const Message = ({message}) => {

    return <div className={s.chatMessage}>
        <hr className="hr-washed"/>
        <NavLink to={'/profile/' + message.userId}>

            <img src={message.photo != null ? message.photo : userPhoto} className={styles.userPhoto}/>
            <p className={s.chatName}>{message.userName}</p>
        </NavLink>
        <p className={s.chatMessageInfo}>{message.message}</p>


    </div>
}

const AddMessageForm = () => {
    let [messageText, sendMessageText] = useState('');
    const dispatch = useDispatch();


    let sendOwnMessage = () => {
        if (!messageText) {
            return
        }
        dispatch(sendMessage(messageText))
        sendMessageText('')
    }

    return <div className={s.chatAddMessage}>
        <div >
        <textarea className={"placeholderProfile"} onChange={(e) => {
            sendMessageText(e.currentTarget.value)
        }} value={messageText}></textarea>
        </div>
        <div>
            <button className={"button1"} onClick={sendOwnMessage}>AddMessage</button>
        </div>
    </div>
}


export default ChatPage;