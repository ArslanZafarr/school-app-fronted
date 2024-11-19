"use client";
import React, { useState } from 'react';
import TeacherTab from './TeacherTab'; // Import teacher tab component
import StudentTab from './StudentTab';
import './application-tabs.css';

const ApplicationTabs = () => {

    const [activeTab, setActiveTab] = useState('teacher'); // Initial active tab

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'teacher':
                return <TeacherTab />;
            case 'student':
                return <StudentTab />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="tab_div mt-3">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <button
                            className={`nav-link medium_font font_size_14 ${activeTab === 'teacher' && 'active'}`}
                            onClick={() => handleTabChange('teacher')}
                        >
                            Teachers
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link medium_font font_size_14 ${activeTab === 'student' && 'active'}`}
                            onClick={() => handleTabChange('student')}
                        >
                            Students
                        </button>
                    </li>
                </ul>
                {renderContent()}
            </div>
        </>
    )
}

export default ApplicationTabs
