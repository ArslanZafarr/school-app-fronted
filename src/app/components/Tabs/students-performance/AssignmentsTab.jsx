import Link from "next/link";
import SubmittedCard from "../../Cards/SubmittedCard";
import Button from "../../Button";
import { CiCirclePlus } from "react-icons/ci";

const AssignmentsTab = ({ id, assignments, class_id }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <h3 className="medium_font font_size_24 mb-3"> Assignments </h3>
        <div style={{ width: "180px" }}>
          <Link
            href={`/students/students-performance/assignments/add-assignment?id=${id}&class_id=${class_id}`}
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
        {assignments.map((curData, index) => (
          <>
            {curData.status === "submitted" && (
              <SubmittedCard color={"#33FF57"} key={index} {...curData} />
            )}
          </>
        ))}
      </div>
      <div>
        <h3 className="medium_font font_size_20 mb-5 mt-4">In Progress</h3>
        {assignments.map((curData, index) => (
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

export default AssignmentsTab;
