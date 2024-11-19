import Link from "next/link";
import React from "react";

const TimeTableTable = ({ timetable }) => {
  return (
    <>
      <div className="mobile_screen_table d-flex justify-content-center">
        <table className="my-5 medium_font font_size_14 ">
          <div className="border rounded">
            {timetable.map((curData, index) => (
              <div key={index} className="main_div border-bottom p-3">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Subject</th>
                    <th className="payment-header">Start Time</th>
                    <th>End Time</th>
                    <th>Duration</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index} className="">
                    <td>Class {curData.timetable?.class?.grade}</td>
                    <td>{curData.subject?.name}</td>
                    <td>{curData.timetable?.start_time}</td>
                    <td>{curData.timetable?.end_time}</td>
                    <td>{curData.timetable?.duration} Minutes</td>
                    <td>
                      <Link
                        href={`timetable/online-class?id=${curData.timetable?.id}`}
                        className="medium_font"
                        style={{ color: "#5088ff", textDecoration: "none" }}
                      >
                        View
                      </Link>
                    </td>
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

export default TimeTableTable;
