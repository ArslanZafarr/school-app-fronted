import Button from "../Button";
import './power-classes-card.css'
import Image from "next/image";

const PowerClassesCard = (curData) => {

    const { image, teacher, subject, dateTime, btnText } = curData;

    return (
        <>
            <div className="power_classes_card">
                <div className="card mb-3 my-5 mx-xxl-3 mx-xl-3 mx-lg-3 rounded-4 card_height">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <Image src={image} className="img-fluid rounded-3 card_height" width={500} height={50} alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body card_body_height d-flex flex-column justify-content-around">
                                <p className="card-text font_size_14 text_muted  ">z
                                    {teacher}
                                </p>
                                <h5 className="card-title font_size_18 medium_font ">{subject}</h5>
                                <p className="card-text">
                                    <small className="font_size_16 text_muted">{dateTime}</small>
                                </p>
                                <div className="card_button_div d-flex justify-content-end align-items-center me-3">
                                    <Button text={btnText} className="card_btn" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PowerClassesCard
