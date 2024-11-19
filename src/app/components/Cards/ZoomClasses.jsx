import Image from "next/image";
import "./zoom-classes.css";
import moment from "moment";

const ZoomClasses = ({ classes }) => {
  return (
    <div>
      <div className="zoom_classes_main_div">
        <div className="zoom_classes_card border rounded p-3 m-2">
          <h3 className="medium_font font_size_18">
            {" "}
            {moment().format("dddd, MMMM D")}{" "}
          </h3>
          {classes.map((curData, index) => (
            <div
              key={index}
              className="sub_card border-bottom p-2 m-2 d-flex justify-content-between align-items-center"
            >
              <div className="Image_div d-flex align-items-center">
                <Image
                  className="border rounded-4"
                  src={"/assets/images/principal-panel/dashboard/card.png"}
                  alt="image"
                  width={50}
                  height={50}
                />
                <div className="text_div ms-3">
                  <p className="medium_font font_size_16 mb-1">
                    {curData.class.name}
                  </p>
                  <p className="font_size_14 text_muted mb-1">
                    Teacher:  {curData.teacher.name}
                  </p>
                  <p className="font_size_14 text_muted mb-1">
                    {" "}
                    Students: {curData.class.total_students}
                  </p>
                </div>
              </div>
              <div className="time_div">

                <p className="font_size_14 text_muted">
                  {new Date(`1970-01-01T${curData.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-
                  {new Date(`1970-01-01T${curData.end_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZoomClasses;
