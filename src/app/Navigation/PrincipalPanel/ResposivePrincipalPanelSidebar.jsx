"use client";
import React, { useState } from 'react';
import '../sidebar.css';
import Link from 'next/link';
import Image from 'next/image';
import { CiMenuBurger } from 'react-icons/ci';
import { principalPanelSidebarLinks } from './Links';
import LogoutButton from '@/app/components/LogoutButton';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import "../../components/Modals/Logout/logout.css";
import { toast } from "react-toastify";
import { logout } from '@/redux/features/auth/authSlice';

const ResposivePrincipalPanelSidebar = () => {

    const [openMenus, setOpenMenus] = useState({});
    const [selectedLink, setSelectedLink] = useState('/principal-panel');



    const toggleMenu = (index) => {
        setOpenMenus(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };


    const dispatch = useDispatch();
    const router = useRouter(); // Initialize the useRouter hook

    const handleLogout = () => {
        // Show toast notification before logout
        toast.success("User logged out successfully!");

        // Perform logout action
        dispatch(logout());
        router.push("/");
    };


    return (
        <div className="responsive_sidebar mobile_screen_sidebar">
            <a
                className="text-dark"
                data-bs-toggle="offcanvas"
                href="#PrincipalPanel"
                role="button"
                aria-controls="offcanvasExample"
            >
                <CiMenuBurger className="fs-2" />
            </a>

            <div
                className="offcanvas offcanvas-start"
                tabIndex={-1}
                id="PrincipalPanel"
                aria-labelledby="offcanvasExampleLabel"
            >
                <div className="d-flex px-3 py-3 border-bottom justify-content-between align-items-center">
                    <Link href={'#'}
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                    <div className='logo_div p-3'>
                        <Link href="#" className='d-flex justify-content-center align-items-center text-decoration-none text-dark'>
                            <Image src='/assets/images/login-page/logo.png' width={30} height={30} alt="Logo" />
                        </Link>
                    </div>
                </div>
                <div className="offcanvas-body">
                    <div>
                        <div className="sidebar mt-4" data-bs-dismiss="offcanvas"
                            aria-label="Close">
                            {principalPanelSidebarLinks.map((data, index) => (
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
                                                    className={`my-1 d-flex align-items-center text-decoration-none text-dark ${selectedLink === child.link ? 'selected' : ''
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
                            {/* <LogoutButton /> */}
                            <LogoutButton className="d-none d-md-block" />
                        </div>

                        <button
                            onClick={handleLogout}
                            className={`d-flex btn hover_color text-dark logout_btn `}>

                            <span>
                                <Image
                                    className="me-3"
                                    src="/assets/images/dashboard/logout.png"
                                    width={20}
                                    height={20}
                                    alt="Logout icon"
                                />
                                Logout
                            </span>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ResposivePrincipalPanelSidebar
