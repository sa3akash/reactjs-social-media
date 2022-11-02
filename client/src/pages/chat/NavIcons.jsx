import React from "react";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="/">
        <img src="/img/home.png" alt="home" />
      </Link>
      <UilSetting />
      <img src="/img/noti.png" alt="notification" />
      <Link to="/chat">
        <img src="/img/comment.png" alt="moment" />
      </Link>
    </div>
  );
};

export default NavIcons;
