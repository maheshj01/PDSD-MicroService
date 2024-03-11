// src/components/MenuOptions.tsx

import React from "react";
import { Link } from "react-router-dom";

interface MenuOptionsProps {
    userRole: string;
    onMenuClick: (menuItem: string, path: string) => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ userRole, onMenuClick }) => {
    const menuItems: { [key: string]: string } = {
        "Profile": "/profile",
        "Register User": "/register",
        "Add/Request Book": "/add-request",
        "Sign Out": "/login",
    };

    const getMenuItems = () => {
        const allowedRoles = userRole in menuItems ? [userRole] : ["default"];
        return allowedRoles.flatMap((role) => Object.keys(menuItems).filter(item => menuItems[item] !== '/login' || role === 'default'));
    };

    return (
        <div className="menu-options">
            {getMenuItems().map((menuItem) => (
                <div key={menuItem} onClick={() => onMenuClick(menuItem, menuItems[menuItem])}>
                    {<Link to={menuItems[menuItem]}>
                        {menuItem}
                    </Link>}
                </div>
            ))}
        </div>
    );
};

export default MenuOptions;
