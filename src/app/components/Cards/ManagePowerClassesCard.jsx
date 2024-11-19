import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import "./manage-power-classes-card.css";
import { useRouter } from "next/navigation";

const ManagePowerClassesCard = ({ classes }) => {
  const router = useRouter();

  return (
    <dvi>
      <h3 className="medium_font font_size_18 ms-3 d-block d-xxl-none d-xl-none d-lg-none d-md-none">
        Manage Power Classes
      </h3>
      <div className="manage_power_classes_card border rounded p-3 m-3">
        <h3 className="medium_font font_size_18 d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          Manage Power Classes
        </h3>
        {classes.map((curData, index) => (
          <div
            key={index}
            onClick={() => {
              router.push(`/admin-panel/edit-power-class?id=${curData.id}`);
            }}
            style={{ cursor: "pointer" }}
            className="sub_card rounded p-2 my-3 d-flex justify-content-between align-items-center"
          >
            <div className="sub_card_content_div d-flex justify-content-between align-items-center">
              <div className="Image_div me-2">
                <Image
                  src={"/assets/images/dashboard/image.png"}
                  alt="image"
                  width={50}
                  height={50}
                />
              </div>
              <div className="Image_div">
                <p className="font_size_14 m-0">{curData.subject?.name}</p>
                <p className="font_size_12 text-muted m-0">
                  {" "}
                  {curData.tutor?.profile?.full_name}{" "}
                </p>
              </div>
            </div>
            <div className="icon_di">
              <FaChevronRight className="font_size_24" />
            </div>
          </div>
        ))}
      </div>
    </dvi>
  );
};

export default ManagePowerClassesCard;
