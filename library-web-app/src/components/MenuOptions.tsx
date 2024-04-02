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
    };

    if (userRole === "staff" || userRole === "librarian") {
        menuItems["Add/Request Book"] = "/add-request";
    }
    if (userRole === "librarian") {
        menuItems["Book Requests"] = "/book-requests";
    }

    if (userRole === "librarian") {
        menuItems["Register User"] = "/register";
    }

    menuItems["Sign Out"] = "/login";

    const getMenuItems = () => {
        return Object.keys(menuItems);
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
