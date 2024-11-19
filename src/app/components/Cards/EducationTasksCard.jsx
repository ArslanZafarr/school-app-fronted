import './education-tasks-card.css';

const EducationTasksCard = () => {
    return (
        <div>
            <div className='education_tasks_heading mb-4 ms-3 d-block d-xxl-none d-xl-none d-lg-none d-md-none'>
                <h3 className='medium_font font_size_20'>Manage Educational Tasks</h3>
            </div>
            <div className='education_tasks_card p-3 m-3 border rounded'>
                <div className='education_tasks_heading mb-4 d-none d-xxl-block d-xl-block d-lg-block d-md-block'>
                    <h3 className='medium_font font_size_20'>Manage Educational Tasks</h3>
                </div>
                <div className='education_tasks_card_body border-bottom pb-4 mb-4 d-flex justify-content-between align-items-center'>
                    <div className='content_div d-flex justify-content-center align-items-center'>
                        <div className='circle_div me-3'> 1 </div>
                        <p className='font_size_18 m-0 '>Upload answer keys</p>
                    </div>
                    <p className='font_size_14 m-0 due_date_para'>Due today</p>
                </div>
                <div className='education_tasks_card_body border-bottom pb-4 mb-4 d-flex justify-content-between align-items-center'>
                    <div className='content_div d-flex justify-content-center align-items-center'>
                        <div className='circle_div me-3'> 2 </div>
                        <p className='font_size_18 m-0'>Upload answer keys</p>
                    </div>
                    <p className='font_size_14 m-0 due_date_para'>Due today</p>
                </div>
                <div className='education_tasks_card_body border-bottom pb-4 mb-4 d-flex justify-content-between align-items-center'>
                    <div className='content_div d-flex justify-content-center align-items-center'>
                        <div className='circle_div me-3'> 3 </div>
                        <p className='font_size_18 m-0'>Upload answer keys</p>
                    </div>
                    <p className='font_size_14 m-0 due_date_para'>Due today</p>
                </div>
                <div className='education_tasks_card_body border-bottom pb-4 mb-4 d-flex justify-content-between align-items-center'>
                    <div className='content_div d-flex justify-content-center align-items-center'>
                        <div className='circle_div me-3'> 3 </div>
                        <p className='font_size_18 m-0'>Upload answer keys</p>
                    </div>
                    <p className='font_size_14 m-0 due_date_para'>Due today</p>
                </div>
            </div>
        </div>
    )
}

export default EducationTasksCard
