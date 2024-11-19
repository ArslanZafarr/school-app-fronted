import Link from "next/link";
import { LiaEditSolid } from "react-icons/lia";

const ClassCard = (curData) => {
  return (
    <div className="class_materials_card border p-3 my-3 rounded d-flex justify-content-between align-items-start me-3">
      <div className="">
        <p className="medium_font font_size_22">Class {curData.grade}</p>
        <p className="text_muted font_size_22">
          {" "}
          {curData.student_count} Students
        </p>
      </div>
      <div className="">
        {curData.link === "classes-content" ? (
          <Link
            href={`${curData.link}?id=${curData["id"]}&grade=${curData["grade"]}`}
          >
            <LiaEditSolid
              className="border rounded-2 p-1 fs-2"
              style={{ color: "#798df8" }}
            />
          </Link>
        ) : (
          <Link href={`${curData.link}?id=${curData["id"]}`}>
            <LiaEditSolid
              className="border rounded-2 p-1 fs-2"
              style={{ color: "#798df8" }}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
