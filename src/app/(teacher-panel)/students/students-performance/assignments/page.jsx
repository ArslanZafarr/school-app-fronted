import Link from "next/link";
import "./assignmets.css";
import Button from "@/app/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import SubmittedCard from "@/app/components/Cards/SubmittedCard";

const page = () => {
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
    <div className="padding tablet_padding">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="medium_font font_size_24 mb-3"> Assignments </h3>
        <div style={{ width: "180px" }}>
          <Link href="/students/students-performance/assignments/add-assignment">
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
        {cardData.map((curData, index) => (
          <SubmittedCard key={index} {...curData} />
        ))}
      </div>
      <div>
        <h3 className="medium_font font_size_20 mb-5 mt-4">In Progress</h3>
        {progressCardData.map((curData, index) => (
          <SubmittedCard key={index} {...curData} />
        ))}
      </div>
    </div>
  );
};

export default page;