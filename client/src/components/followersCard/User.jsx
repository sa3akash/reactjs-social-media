import React, { useState } from "react";
import "./FollowersCard.css";
import {multiFollow} from "../../Http";
import {useSelector,useDispatch} from "react-redux"
import {setFollowing,setUnFollowing} from "../../store/AuthReducer"

const URL_SERVER = process.env.REACT_APP_SERVER_URL;

const User = ({ person }) => {
    const {user} = useSelector(state=>state.Auth)
    const followingUserId = user._id
    const [followings, setFollowings] = useState(person.followers.includes(user._id))

    const dispatch = useDispatch()

    const handleFollow = (id) => {
        const followButton = async () => {
            try{
                await multiFollow(id, followingUserId)
                setFollowings(prev=>!prev)
                followings ? dispatch(setUnFollowing(id)) : dispatch(setFollowing(id))

            }catch(err){
                console.log(err);
            }
        }
        followButton()
    }


  return (
    <div className="followerContainer">
      <div className="follower">
        <img src={person.profileImage ? URL_SERVER+"/uploads/"+person.profileImage: "/img/default.png"} alt={person.name} className="follerImg" />
        <div className="followerName">
          <span>{person.firstname} {person.lastname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button className="button fc-button" onClick={()=>handleFollow(person._id)}>
        {followings ? "Unfollow" : "Follow"}
    </button>
    </div>
  );
};

export default User;
