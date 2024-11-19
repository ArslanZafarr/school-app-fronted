import StudentCard from "../../Cards/StudentCard";

const StudentTab = () => {
  return (
    <div>
      <div className="teacher_heading">
        <h3 className="medium_font font_siz_20 my-4"> Student </h3>
      </div>
      <div className="student_tab_div">
        <StudentCard />
      </div>
    </div>
  );
};

export default StudentTab;
