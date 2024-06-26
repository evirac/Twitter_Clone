import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaHashtag, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import '../sass/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Image src='assets/logo.svg' className="sidebar-logo" />
      </div>
      <div className="sidebar-menu">
        <SidebarItem icon={<FaHome />} text="Home" to="/" />
        <SidebarItem icon={<FaHashtag />} text="Explore" to="/explore" />
        <SidebarItem icon={<FaBell />} text="Notifications" to="/notifications" />
        <SidebarItem icon={<FaUser />} text="Profile" to="/profile" />
        <SidebarItem icon={<FaSignOutAlt />} text="Logout" to="/logout" />
      </div>
      <div className="sidebar-footer">
        <SidebarProfile />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, to }) => {
  return (
    <NavLink to={to} className="sidebar-item" activeClassName="active">
      {icon}
      <span>{text}</span>
    </NavLink>
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
