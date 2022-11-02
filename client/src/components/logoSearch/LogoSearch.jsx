import React from 'react';
import './LogoSearch.css';
import {UilSearch} from "@iconscout/react-unicons";

const LogoSearch = () => {
  return (
    <div className='LogoSearch'>
        <img src="/img/logo.png" alt="logo" />
        <div className="SearchBox">
            <input type="text" placeholder='#Explore'/>
            <div className="SearchIcon">
                <UilSearch />
            </div>
        </div>
    </div>
  )
}

export default LogoSearch;