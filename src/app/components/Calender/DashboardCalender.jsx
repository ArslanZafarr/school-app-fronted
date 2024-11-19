"use client";
import './dashboard-calender.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const DashboardCalender = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <div>
            <div className='mobile_screen_calendar_heading text-start d-block d-xxl-none d-xl-none d-lg-none d-md-none'>
                <h3 className='medium_font font_size_20 ms-3'>Manage Timetables</h3>
            </div>
            <div className='calendar_div border rounded p-3 m-3' >
                <div className='calendar_heading d-none d-xxl-block d-xl-block d-lg-block d-md-block'>
                    <h3 className='medium_font font_size_20'>Manage Timetables</h3>
                </div>
                <div className='calendar_body_div d-flex justify-content-center align-items-center'>
                    <Calendar onChange={handleChange} value={selectedDate} />
                </div>
            </div>
        </div>
    )
}

export default DashboardCalender
