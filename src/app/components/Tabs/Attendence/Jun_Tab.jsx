import ClassCard from "../../Cards/ClassCard";

const Jun_Tab = ({ classes }) => {
  return (
    <div className="class_materials_card_div mt-3 d-flex flex-wrap align-items-center">
      {classes.map((curData, index) => (
        <ClassCard
          link="attendence/attendance-subject"
          // link="attendence/attendence-table"
          key={index}
          {...curData}
        />
      ))}
    </div>
  );
};

export default Jun_Tab;
