import React, { useEffect, useState,useRef } from "react";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import { getOneProfile,getChatMessage,createMessage } from "../../../Http";

const URL_SERVER = process.env.REACT_APP_SERVER_URL;


const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();
  const imageRef = useRef();

  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }

  // fetching data for header
  useEffect(() => {
    const friendUserID = chat?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getOneProfile(friendUserID);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUserId]);


  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getChatMessage(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);


  //Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])



  // Send Message
  const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUserId,
      text: newMessage,
      chatId: chat._id,
  }


  const receiverId = chat.members.find((id)=>id!==currentUserId);

  // // send message to socket server
  setSendMessage({...message, receiverId})


  // // send message to database
  try {
    const { data } = await createMessage(message);
    setMessages([...messages, data]);
    setNewMessage("");
  }catch(err){
    console.log("error")
  }
}

// Receive Message from parent component
useEffect(()=> {
  //console.log("Message Arrived: ", receiveMessage)
  if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
    setMessages([...messages, receiveMessage]);
  }

},[receiveMessage,messages,chat?._id])

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div className="profilediv">
                  <img
                    src={userData?.profileImage ? URL_SERVER + "/uploads/" + userData.profileImage : "/img/default.png"}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>


            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message,i) => (
                <React.Fragment key={i}>
                  <div ref={scroll} className={ message.senderId === currentUserId ? "message own" : "message"}>
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick = {handleSend}>Send</div>
              <input type="file" name="" id="" style={{ display: "none" }} ref={imageRef}/>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
