import React, {useState} from 'react';
import "./InfoCard.css";
import {UilPen} from "@iconscout/react-unicons";
import ProfileModal from "../profileModal/ProfileModal";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {getOneProfile} from "../../Http"
import {setAuth} from "../../store/AuthReducer"

const InfoCard = () => {
    const [openModal, setOpenModal] = useState(false);
    const [userProfile, setUserProfile] = useState({})

    const {user} = useSelector(state=>state.Auth)
    const dispatch = useDispatch()

    const {id} = useParams()
   

    const handleLogout = () => {
        dispatch(setAuth(null))
        localStorage.clear("user")
    }

    useEffect(()=>{

        const getOneUser = async () => {
            if(user._id === id) {
                setUserProfile(user)
            }else{
                try{
                    const profileOne = await getOneProfile(id)
                    setUserProfile(profileOne.data);
                }catch(err){
                    console.log(err)
                }
            }
            
        }
        getOneUser()
    },[id,user])


  return (
    <div className='InfoCard'>
        <div className="infoHead">
            <h4>Profile info</h4>
            {user._id === id ? (
                <>
                    <UilPen className='editIcon' onClick={()=> setOpenModal(true)}/>
                    <ProfileModal openModal={openModal} setOpenModal={setOpenModal} data={user}/>
                </>
            ): ("")}
          
        </div>
        <div className="info">
            <span><b>Status: </b></span>
            <span style={{textTransform:"capitalize"}}>{userProfile.relationship}</span>
        </div>
        <div className="info">
            <span><b>Lives in: </b></span>
            <span style={{textTransform:"capitalize"}}>{userProfile.livesIn}</span>
        </div>
        <div className="info">
            <span><b>Work at: </b></span>
            <span style={{textTransform:"capitalize"}}>{userProfile.workAt}</span>
        </div>
        <button className="button info-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default InfoCard;