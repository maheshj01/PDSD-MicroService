// src/components/Menu.tsx

import React, { ReactNode, useState, useRef, useEffect } from "react";
import "./Menu.css"; // Import the Menu styles

interface MenuProps {
    trigger: ReactNode;
    children: ReactNode;
}

const Menu: React.FC<MenuProps> = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`menu ${isOpen ? "open" : ""}`} ref={menuRef}>
            <div className="trigger" onClick={toggleMenu}>
                {trigger}
            </div>
            {isOpen && <div className="menu-content">{children}</div>}
        </div>
    );
};

export default Menu;
