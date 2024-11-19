import "./teacher-panel-widget.css";
import { CiClock2 } from "react-icons/ci";

const TeacherPanelWidget = ({ activity }) => {
  const widgetsData = [
    {
      icon: <CiClock2 className="fs-3 mb-2" />,
      time: "10:00 - 11:30",
      text: "Upcoming Class",
      color: "#FA7800",
    },
    {
      icon: <CiClock2 className="fs-3 mb-2" />,
      time: "11:30 - 13:00",
      text: "Next Class",
      color: "#9854cb",
    },
    {
      icon: <CiClock2 className="fs-3 mb-2" />,
      time: "13:00 - 14:30",
      text: "Another Class",
      color: "#2a9361",
    },
    {
      icon: <CiClock2 className="fs-3 mb-2" />,
      time: "14:30 - 16:00",
      text: "Following Class",
      color: "#1980e5",
    },
    {
      icon: <CiClock2 className="fs-3 mb-2" />,
      time: "16:00 - 17:30",
      text: "Final Class",
      color: "#f8b300",
    },
  ];
  return (
    <div className="widgets_div d-flex flex-wrap align-items-center">
      <div
        className="widget_card rounded p-3 m-xxl-3 m-xl-3 m-lg-3 m-md-3"
        style={{ backgroundColor: "#FA7800" }}
      >
        <CiClock2 className="fs-3 mb-2" />
        <p className="semiBold_font font_size_16 mb-2">
          {" "}
          {activity.upcoming_class?.start_time} -{" "}
          {activity.upcoming_class?.end_time}{" "}
        </p>
        <p className="font_size_14"> Upcoming Classes </p>
      </div>
      {/* {
                widgetsData.map((curData, index) => (
                    <div key={index} className='widget_card rounded p-3 m-xxl-3 m-xl-3 m-lg-3 m-md-3' style={{ backgroundColor: curData.color }}>
                        {curData.icon}
                        <p className='semiBold_font font_size_16 mb-2'> {curData.time} </p>
                        <p className='font_size_14'> {curData.text} </p>
                    </div>
                ))
            } */}
    </div>
  );
};

export default TeacherPanelWidget;
