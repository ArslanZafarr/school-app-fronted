import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AdminPanelSidebarCard = () => {
    return (
        <div className='rounded p-4' style={{ background: 'linear-gradient(to bottom, #ffe165, #fb8f16)' }}>
            <Image src={'/assets/images/dashboard/card_emoji.png'} width={80} height={80} alt='image' />
            <p className='semiBold_font font_size_16 my-3'>Create Power classes for <br />
                students of Board exams</p>
            <Link href={'#'} style={{ width: '110px', height: '40px' }} className='medium_font font_size_14 px-3 py-2 bg-white rounded text-dark text-decoration-none'> <span className=''> Start Now </span></Link>
        </div>
    )
}

export default AdminPanelSidebarCard
