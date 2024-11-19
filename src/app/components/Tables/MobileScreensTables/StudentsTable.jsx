import Link from "next/link";

const StudentsTable = ({ students }) => {
  return (
    <>
      <div className="mobile_screen_table d-flex justify-content-center">
        <table className="my-5 medium_font font_size_14 ">
          <div className="border rounded">
            {students.map((curData, index) => (
              <div key={index} className="main_div border-bottom p-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Parents Contact</th>
                    <th>class</th>
                    <th>Roll No</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index}>
                    <td>
                      {" "}
                      <span> {curData.profile?.full_name} </span>{" "}
                    </td>
                    <td>
                      {" "}
                      <span>{curData.gender}</span>
                    </td>
                    <td>
                      <span>{curData.date_of_birth}</span>
                    </td>
                    <td>{curData.parent_contact_number}</td>
                    <td>{curData.class?.grade}</td>
                    <td>{curData.id}</td>
                  </tr>
                </tbody>
              </div>
            ))}
          </div>
        </table>
      </div>
    </>
  );
};

export default StudentsTable;
