// src/components/MenuOptions.tsx

import React from "react";
import { Link } from "react-router-dom";

interface MenuOptionsProps {
    userRole: string;
    onMenuClick: (menuItem: string) => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ userRole, onMenuClick }) => {
    const menuItems: { [key: string]: string[] } = {
        librarian: ["Profile", "Register User", "Add/Request Book", "Sign Out"],
        staff: ["Profile", "Add/Request Book", "Sign Out"],
        default: ["Profile", "Sign Out"],
    };

    const getMenuItems = () => {
        const roles = Object.keys(menuItems);
        const allowedRoles = roles.includes(userRole) ? [userRole] : ["default"];

        return allowedRoles.flatMap((role) => menuItems[role]);
    };

    return (
        <div className="menu-options">
            {getMenuItems().map((menuItem) => (
                <div key={menuItem} onClick={() => onMenuClick(menuItem)}>
                    {menuItem === "Sign Out" ? (
                        <Link to="#" onClick={() => onMenuClick(menuItem)}>
                            {menuItem}
                        </Link>
                    ) : (
                        <Link to={`/${menuItem.toLowerCase().replace("/", "")}`}>
                            {menuItem}
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MenuOptions;
