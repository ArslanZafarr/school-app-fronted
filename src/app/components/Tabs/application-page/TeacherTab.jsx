import SubjectCard from "../../Cards/TeacherCard";

const TeacherTab = () => {
  return (
    <div className="teacher_content_div">
        <div className="teacher_heading">
            <h3 className="medium_font font_siz_20 my-4"> Teacher </h3>
        </div>
      <div className="teacher_card_div">
        <SubjectCard />
      </div>
    </div>
  );
};

export default TeacherTab;
