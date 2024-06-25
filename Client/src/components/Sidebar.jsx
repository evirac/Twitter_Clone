import React from 'react';
import { FaHome, FaHashtag, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import Image from "react-bootstrap/Image";
import '../sass/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Image src='assets/logo.svg' className="sidebar-logo" />
      </div>
      <div className="sidebar-menu">
        <SidebarItem icon={<FaHome />} text="Home" active />
        <SidebarItem icon={<FaHashtag />} text="Explore" />
        <SidebarItem icon={<FaBell />} text="Notifications" />
        <SidebarItem icon={<FaUser />} text="Profile" />
        <SidebarItem icon={<FaSignOutAlt />} text="Logout" />
      </div>
      <div className="sidebar-footer">
        <SidebarProfile />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active }) => {
  return (
    <div className={`sidebar-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

const SidebarProfile = () => {
  return (
    <div className="sidebar-profile">
      <img src="https://via.placeholder.com/40" alt="Profile" />
      <div className="profile-info">
        <div className="profile-name">User Name</div>
        <div className="profile-username">@username</div>
      </div>
    </div>
  );
};

export default Sidebar;
