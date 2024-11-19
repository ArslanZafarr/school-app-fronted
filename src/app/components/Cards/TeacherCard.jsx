import { RiFileEditLine } from "react-icons/ri";
import './teacher-card.css';

const TeacherCard = () => {

    const cardData = [
        {
            subject: 'Biology',
            teacher: 'Sarah Jain',
            experience: '10 years Experience'
        },
        {
            subject: 'Biology',
            teacher: 'Sarah Jain',
            experience: '10 years Experience'
        },
        {
            subject: 'Biology',
            teacher: 'Sarah Jain',
            experience: '10 years Experience'
        },
        {
            subject: 'Biology',
            teacher: 'Sarah Jain',
            experience: '10 years Experience'
        }
    ]
    return (
        <div className="teacher_card_div">
            {
                cardData.map((curData, index) => (
                    <div key={index} className="Card my-3 p-3 d-block felx-wrap d-xxl-flex d-xl-flex d-lg-flex d-md-flex justify-content-between align-items-center">
                    <div className="content_div d-flex d-flex align-items-center">
                        <div className="icon_div">
                            <RiFileEditLine />
                        </div>
                        <div className="text_div ms-3">
                            <p className="medium_font font_size_16">{curData.subject}</p>
                            <p className="text_muted font_size_14">{curData.teacher}</p>
                            <p className="text_muted font_size_14">{curData.experience}</p>
                        </div>
                    </div>
                    <div className="btn_div_2 d-flex justify-content-between align-items-center mt-3">
                        <button type="button" class="btn btn-outline-success me-4"> Accept </button>
                        <button type="button" class="btn btn-outline-danger"> Decline </button>
                    </div>
                </div>
                ))
            }

        </div>
    )
}

export default TeacherCard

