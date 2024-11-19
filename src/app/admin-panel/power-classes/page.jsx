import Link from "next/link";
import "./powerclasses.css";
import Button from "@/app/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import PowerClassesPagePagination from "@/app/components/Pagination/PowerClassesPagePagination";
import PowerClassesCard from "@/app/components/Cards/powerClassesCard";

const page = () => {
  const cardData = [
    {
      image: "/assets/images/dashboard/power-classes/card-image-1.png",
      teacher: "Teacher: Asma Khan",
      subject: "Biology Section 2",
      dateTime: "Monday, January 31, 5:00 PM - 6:30 PM",
      btnText: "Manage",
    },
    {
      image: "/assets/images/dashboard/power-classes/card-image-1.png",
      teacher: "Teacher: Asma Khan",
      subject: "Biology Section 2",
      dateTime: "Monday, January 31, 5:00 PM - 6:30 PM",
      btnText: "Manage",
    },
    {
      image: "/assets/images/dashboard/power-classes/card-image-1.png",
      teacher: "Teacher: Asma Khan",
      subject: "Biology Section 2",
      dateTime: "Monday, January 31, 5:00 PM - 6:30 PM",
      btnText: "Manage",
    },
  ];

  return (
    <>
      <div className="power_classes_div">
        <div className="power_classes_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> Power Classes </h2>
          <Link href="/admin-panel/add-school-details">
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
        <div className="power_classes_card_div">
          {cardData.map((curData, index) => (
            <PowerClassesCard key={index} {...curData} />
          ))}
        </div>
        <div className="power_classes_pagination_div">
          <PowerClassesPagePagination />
        </div>
      </div>
    </>
  );
};

export default page;
