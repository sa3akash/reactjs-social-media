import { useState,useEffect, useRef } from 'react';
import "./Chat.css";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import {useSelector} from "react-redux";
import {getChatsData} from "../../Http"
import Conversation from "./Conversation"
import NavIcons from './NavIcons';
import ChatBox from './chatBox/ChatBox';
import {io} from "socket.io-client";

const URL_SERVER = process.env.REACT_APP_SERVER_URL;

const Chat = () => {
    const {user} = useSelector(state=>state.Auth)
    const [chats, setChats] = useState()
    const [onlineUser, setOnlineUser] = useState([])
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)


    const socket = useRef()


    useEffect(()=>{
        const getChats = async () => {
            try{
                const res = await getChatsData(user._id)
                setChats(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getChats()
    },[user._id])


    // socket work
    useEffect(()=>{
        socket.current = io(URL_SERVER)
        socket.current.emit("new_user_add", user._id)
        socket.current.on("get_users",(users)=>{
            setOnlineUser(users)
            
        })
        
    },[user._id])

    //send message
    useEffect(()=>{
        if(sendMessage!==null){
            socket.current.emit("send_message",sendMessage)
        }
    },[sendMessage])

    //receive message
    useEffect(()=>{
        socket.current.on("receive_message",(data)=>{
            setReceiveMessage(data)
        })
    },[])


    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUser.find((user) => user.userId === chatMember);
        return online ? true : false;
      };

  return (
    <div className='Chat'>
        <div className="Chat-container">
        <LogoSearch />
        {/* Left Side */}
            <div className="Left-side-chat">
                <h2>Chats</h2>
                <div className="Chat-list">
                    {chats && chats.map(chat=>(
                        <div key={chat._id} onClick={()=> setCurrentChat(chat)}>
                            <Conversation data={chat} user={user} online={checkOnlineStatus(chat)}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Side */}
        <div className="Right-side-chat">
            <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            <NavIcons />
            </div>

        <ChatBox
          chat={currentChat}
          currentUserId={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
        </div>
    </div>
  )
}

export default Chat