import AreaChart from "../../charts/AreaChart";
import BarCharts from "../../charts/BarCharts";

const OverviewTab = ({ averagedata, attendancedata }) => {
  return (
    <div>
      <div className="student_tab_div">
        {/* <h3 className="medium_font font_size_18 mt-3">Current Course</h3>
        <div className="current_course_card rounded-2 p-3 my-3" style={{ backgroundColor: '#edf7ff'}}>
          <h4 className="medium_font font_size_14">Algebra Section</h4>
          <p className="font_size_14 text-primary m-0">Mathematics</p>
        </div> */}
        <div className="d-flex flex-wrap">
          <BarCharts averagedata={averagedata} />
          <AreaChart attendancedata={attendancedata} />
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
