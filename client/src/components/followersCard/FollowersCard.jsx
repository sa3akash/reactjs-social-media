import React from 'react';
import './FollowersCard.css';
import User from './User';
import { useState } from 'react';
import { useEffect } from 'react';
import {fetchAllUser} from "../../Http"
import {useSelector} from "react-redux"

const FollowersCard = () => {
    const [allUsers, setAllUsers] = useState([])

    const {user} = useSelector(state=>state.Auth)

    useEffect(()=>{
        const getAllUser = async () => {
            try{
                const res = await fetchAllUser()
                setAllUsers(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getAllUser()
    },[])

  return (
    <div className='FollowersCard'>
        <h3>People you may know</h3>
        
        {allUsers.map((person, index)=>{
            if(person._id !== user._id){
                return <User key={index} person={person}/>
            }
        })}
    </div>
  )
}

export default FollowersCard;