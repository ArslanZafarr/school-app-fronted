import Image from "next/image";
import "./teacher-panel-upcoming-classes.css";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";

const TeacherPanelUpcomingClassesWidget = ({ classes }) => {
  return (
    <div>
      <div className="upcoming_classes_card border rounded p-4 m-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="medium_font font_size_18 mb-5">Upcoming Classes</h3>
          <Link
            className="text-decoration-none mb-5 text-danger"
            href={"/timetable"}
          >
            {" "}
            See all{" "}
          </Link>
        </div>
        {classes.map((curData, index) => (
          <div
            key={index}
            className="sub_card rounded p-2 my-3 d-flex justify-content-between align-items-center"
          >
            <div className="sub_card_content_div d-flex justify-content-between align-items-center">
              <div className="Image_div me-2">
                <Image
                  src={"/assets/images/dashboard/image.png"}
                  alt="image"
                  width={50}
                  height={50}
                />
              </div>
              <div className="Image_div">
                <p className="font_size_14 m-0">{curData.class?.name}</p>
                <Link
                  href={curData.google_meet_link}
                  className="font_size_12 text-muted m-0"
                >
                  {" "}
                  {curData.google_meet_link}{" "}
                </Link>
              </div>
            </div>
            <p className="medium_font font_size_12 text-success m-0 d-block d-xxl-block d-xl-block d-lg-none d-md-none">
              {curData.start_time} - {curData.end_time}
            </p>
            <FaChevronRight className="font_size_18" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherPanelUpcomingClassesWidget;
