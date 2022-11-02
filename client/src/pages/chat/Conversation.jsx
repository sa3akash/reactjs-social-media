import React, { useState, useEffect } from "react";
import { getOneProfile } from "../../Http";
import "./Chat.css";

const URL_SERVER = process.env.REACT_APP_SERVER_URL;

const Conversation = ({ data, user,online }) => {
  const [otherUser, setOtherUser] = useState({});


  useEffect(() => {
    const friendUserId = data?.members.find((id) => id !== user._id);

    const getFriendUser = async () => {
      try {
        const res = await getOneProfile(friendUserId);
        setOtherUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriendUser();
  }, [data.members, user._id]);

  return (
    <>
    <div className="follower conversation">
      <div className="avater">
        {online && <div className="online-dot"></div>}
        
        <img
          src={otherUser.profileImage ? URL_SERVER + "/uploads/" + otherUser.profileImage : "/img/default.png"}
          alt="avater"
          className="followerImage"
        />
      </div>
      <div className="name">
        <span>
          {otherUser?.firstname} {otherUser?.lastname}
        </span>
        <span>Online</span>
        {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
      </div>
    </div>
    <hr className="hrClass"/>
    </>
  );
};

export default Conversation;
