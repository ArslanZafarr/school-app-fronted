import "./student-card.css";
import { RiFileEditLine } from "react-icons/ri";

const StudentCard = ({ applications, handlestatus }) => {
  return (
    <>
      <div className="student_card_div">
        <div className="teacher_card_div">
          {applications.map((curData, index) => (
            <div
              key={index}
              className="Card my-3 p-3 d-block felx-wrap d-xxl-flex d-xl-flex d-lg-flex d-md-flex justify-content-between align-items-center"
            >
              <div className="content_div d-flex d-flex align-items-center">
                <div className="icon_div">
                  <RiFileEditLine />
                </div>
                <div className="text_div ms-3">
                  <p className="medium_font font_size_16">
                    {curData.power_class?.class_name}
                  </p>
                  <p className="text_muted font_size_14">
                    {curData.teacher ?? "Sarah"}
                  </p>
                </div>
              </div>
              {curData?.status === "accepted" ? (
                <p
                  className="text_muted font_size_14"
                  style={{ color: "#1C91F2" }}
                >
                  Accepted
                </p>
              ) : (
                <>
                  {curData?.status === "declined" ? (
                    <p
                      className="text_muted font_size_14"
                      style={{ color: "#1C91F2" }}
                    >
                      Declined
                    </p>
                  ) : (
                    <div className="btn_div_2 d-flex justify-content-between align-items-center mt-3">
                      <button
                        type="button"
                        class="btn btn-outline-success me-4"
                        onClick={() => handlestatus("accepted", curData.id)}
                      >
                        {" "}
                        Accept{" "}
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() => handlestatus("declined", curData.id)}
                      >
                        {" "}
                        Decline{" "}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentCard;
