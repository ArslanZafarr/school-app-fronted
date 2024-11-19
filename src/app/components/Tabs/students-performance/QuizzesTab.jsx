import Link from "next/link";
import SubmittedCard from "../../Cards/SubmittedCard";
import Button from "../../Button";
import { CiCirclePlus } from "react-icons/ci";

const QuizzesTab = ({ id, quizzes, class_id }) => {
  const cardData = [
    {
      color: "#FF5733",
      heading: "English Grammar",
      para_1: "Due Dec 21, 2023",
      para_2: "Due Dec 21, 2023",
    },
    {
      color: "#33FF57",
      heading: "Math Homework",
      para_1: "Due Jan 10, 2024",
      para_2: "Due Jan 10, 2024",
    },
    {
      color: "#3357FF",
      heading: "Science Project",
      para_1: "Due Feb 5, 2024",
      para_2: "Due Feb 5, 2024",
    },
  ];

  const progressCardData = [
    {
      color: "#FF5733",
      heading: "English Grammar",
      para_1: "Due Dec 21, 2023",
      para_2: "Due Dec 21, 2023",
    },
    {
      color: "#33FF57",
      heading: "Math Homework",
      para_1: "Due Jan 10, 2024",
      para_2: "Due Jan 10, 2024",
    },
    {
      color: "#3357FF",
      heading: "Science Project",
      para_1: "Due Feb 5, 2024",
      para_2: "Due Feb 5, 2024",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h3 className="medium_font font_size_24 mb-3"> Quizzes </h3>
        <div style={{ width: "180px" }}>
          <Link
            href={`/students/students-performance/quizzes/add-quizzes?id=${id}&class_id=${class_id}`}
          >
            <Button
              icon={
                <CiCirclePlus
                  className="me-2 text_color"
                  style={{ fontSize: "25px" }}
                />
              }
              text="Add New"
              className=""
            />
          </Link>
        </div>
      </div>
      <div>
        <h3 className="medium_font font_size_20 mt-4">Submitted</h3>
        {quizzes.map((curData, index) => (
          <>
            {curData.status === "submitted" && (
              <SubmittedCard color={"#FF5733"} key={index} {...curData} />
            )}
          </>
        ))}
      </div>
      <div>
        <h3 className="medium_font font_size_20 mb-5 mt-4">In Progress</h3>
        {quizzes.map((curData, index) => (
          <>
            {curData.status === "in_progress" && (
              <SubmittedCard color={"#FF5733"} key={index} {...curData} />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default QuizzesTab;
