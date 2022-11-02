import React, { useState } from 'react';
import "./RightSide.css";
import {UilSetting} from "@iconscout/react-unicons";
import TrendCard from '../trendCard/TrendCard';
import ShareModal from '../shareModal/ShareModal';
import { Link } from 'react-router-dom';

const RightSide = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className='RightSide'>
        <div className="navIcon">
            <Link to="/"><img src="/img/home.png" alt="home" /></Link>
            <UilSetting />
            <img src="/img/noti.png" alt="noti" />
            <Link to="/chat"><img src="/img/comment.png" alt="comment" /></Link>
        </div>
        <TrendCard />
        <button className='button right-button' onClick={()=> setOpenModal(true)}>Share</button>
        <ShareModal openModal={openModal} setOpenModal={setOpenModal}/>
    </div>
  )
}

export default RightSide;