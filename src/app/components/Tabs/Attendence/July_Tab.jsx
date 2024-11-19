import ClassCard from "../../Cards/ClassCard";

const July_Tab = () => {
  const meetingCardData = [
    {
      class: "Class 1",
      students_quantity: 250,
      link: "attendence/attendence-table",
    },
    {
      class: "Class 1",
      students_quantity: 250,
      link: "attendence/attendence-table",
    },
    {
      class: "Class 1",
      students_quantity: 250,
      link: "attendence/attendence-table",
    },
    {
      class: "Class 1",
      students_quantity: 250,
      link: "attendence/attendence-table",
    },
    {
      class: "Class 1",
      students_quantity: 250,
      link: "attendence/attendence-table",
    },
    {
      class: "Class 1",
      students_quantity: 250,
      link: "attendence/attendence-table",
    },
    {
      class: "Class 1",
      students_quantity: 250,
      link: "attendence/attendence-table",
    },
    {
      class: "Class 1",
      students_quantity: 250,
      link: "attendence/attendence-table",
    },
    {
      class: "Class 1",
      students_quantity: 250,
      link: "attendence/attendence-table",
    },
  ];
  return (
    <div className="class_materials_card_div mt-3 d-flex flex-wrap align-items-center">
      {meetingCardData.map((curData, index) => (
        <ClassCard key={index} {...curData} />
      ))}
    </div>
  );
};

export default July_Tab;
