import React from 'react';
import "./ProfileLeft.css";
import LogoSearch from "../logoSearch/LogoSearch";
import InfoCard from '../infoCard/InfoCard';
import FollowersCard from '../followersCard/FollowersCard';

const ProfileLeft = () => {
  return (
    <div className='ProfileLeft'>
        <LogoSearch />
        <InfoCard />
        <FollowersCard />
    </div>
  )
}

export default ProfileLeft