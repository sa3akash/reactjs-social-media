import React from 'react';
import './ProfileCard.css';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const URL = process.env.REACT_APP_SERVER_URL;

const ProfileCard = ({location}) => {
    const {user} = useSelector(state=>state.Auth)
    const {post} = useSelector(state=>state.Post)

  return (
    <div className='ProfileCard'>
        <div className={location === "ProfilePage" ? "ProfileImg profile" : "ProfileImg"}>
            <img src={user.coverImage ? URL+"/uploads/"+user.coverImage: "/img/cover.jpg"} alt="cover" />
            <img src={user.profileImage ? URL+"/uploads/"+user.profileImage: "/img/default.png"} alt="profile" />
        </div>
        <div className="ProfileName">
            <span style={{textTransform:"capitalize"}}>{`${user.firstname} ${user.lastname}`}</span>
            <span>{user.workAt ? user.workAt : "Write about your self"}</span>
        </div>
        <div className={`FollowingStatus ${location ? "profileMargin" : ''}`}>
            <hr />
            <div className='FollowContainer'>
                <div className="Fllow">
                    <span>{user?.followers.length}</span>
                    <span>Followers</span>
                </div>
                <div className="vl"></div>
                <div className="Fllow">
                    <span>{user?.following.length}</span>
                    <span>Following</span>
                </div>
                {location === "ProfilePage" && (
                <>
                <div className="vl"></div>
                <div className="Fllow">
                    <span>{post.filter(p=> p.userId === user._id).length}</span>
                    <span>Posts</span>
                </div>
                </>
            )}
            </div>
            <hr />
        </div>
        {location === "ProfilePage" ? ("") : (
            <div className='MyProfileLink'>
                <Link to={`/profile/${user._id}`}>
                <span>My Profile</span>
                </Link>
            </div>
        )}
        
    </div>
  )
}

export default ProfileCard;