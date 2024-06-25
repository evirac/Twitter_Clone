import React from 'react';
import { FaHome, FaHashtag, FaBell, FaUser } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import Image from "react-bootstrap/Image"
import '../sass/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Image src='assets/logo.svg' className="sidebar-logo" />
      </div>
      <div className="sidebar-menu">
        <SidebarItem icon={<FaHome />} text="Home" />
        <SidebarItem icon={<FaHashtag />} text="Explore" />
        <SidebarItem icon={<FaBell />} text="Notifications" />
        <SidebarItem icon={<FaUser />} text="Profile" />
        <SidebarItem icon={<FiLogOut />} text="Logout" />
      </div>
      <div className="sidebar-footer">
        <SidebarProfile />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text }) => {
  return (
    <div className="sidebar-item">
      {icon}
      <span>{text}</span>
    </div>
  );
};

const SidebarProfile = () => {
  return (
    <div className="sidebar-profile">
      <img src="https://via.placeholder.com/40" alt="Profile" />
      <span>Username</span>
    </div>
  );
};

export default Sidebar;
