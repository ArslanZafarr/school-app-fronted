import React, { useState } from 'react';
import '../sidebar.css';
import Link from 'next/link';
import Image from 'next/image';
import { tutorPanelSidebarLinks } from './Links.js';
import Logout from '@/app/components/Modals/Logout/Logout';
import AdminPanelSidebarCard from '@/app/components/Cards/AdminPanelSidebarCard';
import LogoutButton from '@/app/components/LogoutButton';

const TutorPanelSidebar = () => {
    const [openMenus, setOpenMenus] = useState({});
    const [selectedLink, setSelectedLink] = useState('/admin-panel');

    const toggleMenu = (index) => {
        setOpenMenus((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };

    return (
        <div>
            <div className="logo_div p-3">
                <Link href="#" className="d-flex justify-content-center align-items-center text-decoration-none text-dark">
                    <Image src="/assets/images/login-page/logo.png" width={30} height={30} alt="Logo" />
                    <h5 className="m-0 medium_font ps-2">Siksha Matic</h5>
                </Link>
            </div>
            <div className="sidebar mt-4">
                {tutorPanelSidebarLinks.map((data, index) => (
                    <React.Fragment key={index}>
                        <div className={`sidebar-item ${selectedLink === data.link ? 'selected' : ''}`}>
                            <div className="d-flex align-items-center my-1" onClick={() => data.children && toggleMenu(index)}>
                                <Link
                                    href={data.link}
                                    className={`d-flex align-items-center text-decoration-none text-dark ${selectedLink === data.link ? 'selected' : ''
                                        }`}
                                    onClick={() => handleLinkClick(data.link)}
                                >
                                    <Image
                                        src={selectedLink === data.link ? data.selectedIcon : data.icon}
                                        width={20}
                                        height={20}
                                        alt={data.text}
                                        className="me-2"
                                    />
                                    {data.text}
                                    {data.children && (
                                        <Image
                                            src={openMenus[index] ? "/assets/images/dashboard/arrow-down.png" : "/assets/images/dashboard/arrow-down.png"}
                                            width={15}
                                            height={10}
                                            alt="Toggle"
                                            className="ms-4"
                                        />
                                    )}
                                </Link>
                            </div>
                        </div>
                        {data.children && openMenus[index] && (
                            <div className="sidebar-submenu ms-4">
                                {data.children.map((child, childIndex) => (
                                    <Link
                                        key={childIndex}
                                        href={child.link}
                                        className={`my-1 d-flex align-items-center text-decoration-none text-dark ${selectedLink === child.link ? 'submenu_selected' : ''
                                            }`}
                                        onClick={() => handleLinkClick(child.link)}
                                    >
                                        <Image
                                            src={selectedLink === child.link ? child.selectedIcon : child.icon}
                                            width={15}
                                            height={15}
                                            alt={child.text}
                                            className="me-2"
                                        />
                                        {child.text}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
                <LogoutButton className="0px!important" />
            </div>

        </div>
    );
};

export default TutorPanelSidebar;
