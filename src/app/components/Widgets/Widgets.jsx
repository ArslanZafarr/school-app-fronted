import "./widgets.css";
import Image from "next/image";

const widgets = ({ stats }) => {
  const widgetCardData = [
    {
      total_students: "Total Students",
      total_students_quantity: stats["total_students"]?.count,
      icon: "/assets/images/principal-panel/dashboard/total-student.png",
      arrow_icon: "/assets/images/principal-panel/dashboard/green-arrow.png",
      attendence_rate: stats["total_students"]?.attendance_rate,
      ratename: "Attendance Rate",
    },
    {
      total_students: "New Students",
      total_students_quantity: stats["new_students"]?.count,
      icon: "/assets/images/principal-panel/dashboard/total-student.png",
      arrow_icon: "/assets/images/principal-panel/dashboard/green-arrow.png",
      attendence_rate: stats["new_students"]?.registered_rate,
      ratename: "More Registered",
    },
    {
      total_students: "Total Teachers",
      total_students_quantity: stats["total_teachers"]?.count,
      icon: "/assets/images/principal-panel/dashboard/total-student.png",
      arrow_icon: "/assets/images/principal-panel/dashboard/green-arrow.png",
      attendence_rate: stats["total_teachers"]?.performance,
      ratename: "Performance",
    },
    {
      total_students: "New Teachers",
      total_students_quantity: stats["new_teachers"]?.count,
      icon: "/assets/images/principal-panel/dashboard/total-student.png",
      arrow_icon: "/assets/images/principal-panel/dashboard/green-arrow.png",
      attendence_rate: stats["new_teachers"]?.registered_rate,
      ratename: "More Registered",
    },
  ];

  return (
    <div>
      <div className="widgets_main_div principal_panel_widgets justify-content-between d-flex flex-wrap align-items-center">
        {widgetCardData.map((curData, index) => (
          <div key={index} className="widget_card border rounded p-3 m-md-2">
            <div className="widget_content_top_div d-flex justify-content-between align-items-xxl-center align-items-xl-center align-items-lg-center">
              <div className="widget_text_div">
                <p className="medium_font font_size_14">
                  {curData.total_students}
                </p>
                <p className="semiBold_font font_size_25">
                  {curData.total_students_quantity}
                </p>
              </div>
              <div className="widget_icon_div">
                <Image src={curData.icon} alt="image" width={60} height={60} />
              </div>
            </div>
            <div className="widget_content_bottom_div mt-3 d-flex justify-content-between align-items-center">
              <Image
                src={curData.arrow_icon}
                alt="image"
                width={30}
                height={15}
              />
              <p className="medium_font font_size_14 mb-0 d-flex">
                <span>{curData.attendence_rate}%</span>{" "}
                <span className="d-none d-xxl-block d-xl-block d-lg-block">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>{" "}
                {curData.ratename}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default widgets;
