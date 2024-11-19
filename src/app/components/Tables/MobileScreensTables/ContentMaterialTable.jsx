import Link from "next/link";

const MobileContentMaterialTable = () => {
  const tableData = [
    {
      material: "Lecture 1: Intro to Biology",
      type: "Lecture",
      course: "Completed",
      created_by: "Dr Jame",
      last_updated: "3 days ago",
    },
    {
      material: "Lecture 1: Intro to Biology",
      type: "Lab",
      course: "Pending",
      created_by: "Dr Jame",
      last_updated: "3 days ago",
    },
    {
      material: "Lecture 1: Intro to Biology",
      type: "Quiz",
      course: "Completed",
      created_by: "Dr Jame",
      last_updated: "3 days ago",
    },
    {
      material: "Lecture 1: Intro to Biology",
      type: "Answer Key",
      course: "Pending",
      created_by: "Dr Jame",
      last_updated: "3 days ago",
    },
    {
      material: "Lecture 1: Intro to Biology",
      type: "Reading",
      course: "Completed",
      created_by: "Dr Jame",
      last_updated: "3 days ago",
    },
    {
      material: "Lecture 1: Intro to Biology",
      type: "Note",
      course: "Pending",
      created_by: "Dr Jame",
      last_updated: "3 days ago",
    },
  ];

  const colorMapping = {
    Lecture: { backgroundColor: "#f5eeff", color: "#8565ec" },
    Lab: { backgroundColor: "#edfbf5", color: "#77ba9e" },
    Quiz: { backgroundColor: "#eafeff", color: "#7eced3" },
    "Answer Key": { backgroundColor: "#fff6ed", color: "#fa7800" },
    Reading: { backgroundColor: "#ffeefa", color: "#fb861f" },
    Note: { backgroundColor: "#ffedec", color: "#f79289" },
  };

  return (
    <>
      <div>
        <h3 className="medium_font font_size_24 mt-5">
          {" "}
          Content Materials Data{" "}
        </h3>
        <div className="mobile_screen_table d-flex justify-content-center">
          <table className="mb-5 mt-3 medium_font font_size_14 ">
            <div className="border rounded">
              {tableData.map((curData, index) => (
                <div key={index} className="main_div border-bottom p-3">
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Type</th>
                      <th className="payment-header">Course</th>
                      <th>Created by</th>
                      <th>Last updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={index}>
                      <td>{curData.material}</td>
                      <td>
                        <span
                          className="py-2 px-5 rounded-4"
                          style={colorMapping[curData.type]}
                        >
                          {curData.type}
                        </span>
                      </td>
                      <td>
                        <span>{curData.course}</span>
                      </td>
                      <td>{curData.created_by}</td>
                      <td>{curData.last_updated}</td>
                      <td>
                        {" "}
                        <Link className="text-decoration-none" href="#">
                          Edit
                        </Link>{" "}
                      </td>
                    </tr>
                  </tbody>
                </div>
              ))}
            </div>
          </table>
        </div>
      </div>
      <div className="mt-4 mb-3 text-center">
        <Link href={"#"} class="btn load_more_btn">
          Load More
        </Link>
      </div>
    </>
  );
};

export default MobileContentMaterialTable;
