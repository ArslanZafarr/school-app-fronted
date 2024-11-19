import Button from '../Button';
import './manage-subject-card.css';

const ManageSubjectCard = () => {
    return (
        <div>
            <h3 className='medium_font font_size_18 d-block d-xxl-none d-xl-none d-lg-none d-md-none'>Manage Subjects</h3>
            <div className='manage_subject_card border rounded p-3 m-3'>
                <h3 className='medium_font font_size_18 d-none d-xxl-block d-xl-block d-lg-block d-md-block'>Manage Subjects</h3>
                <div className='progress_card mt-3'>
                    <p className='font_size_14 mb-1'>Mathematics</p>
                    <p className='font_size_14 text_muted mb-2'>Advanced calculus, algebra, geometry</p>
                    <div className="progress position-relative">
                        <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "90%" }}
                            aria-valuenow={90}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                        </div>
                    </div>
                    <div className='progress_bar_heading_div mt-2 d-flex justify-content-end align-items-center'>
                        <p className='progress_bar_heading text-info font_size_12 mb-2'>90% remaining</p>
                    </div>
                </div>
                <div className='progress_card'>
                    <p className='font_size_14 mb-1'>Science</p>
                    <p className='font_size_14 text_muted mb-2'>Physics, Chemistry, Biology</p>
                    <div className="progress position-relative">
                        <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "90%" }}
                            aria-valuenow={90}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                        </div>
                    </div>
                    <div className='progress_bar_heading_div mt-2 d-flex justify-content-end align-items-center'>
                        <p className='progress_bar_heading text-info font_size_12'>90% remaining</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ManageSubjectCard
