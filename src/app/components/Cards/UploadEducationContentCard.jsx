import "./upload-education-content-card.css";
import { FaCirclePlus } from "react-icons/fa6";
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";

const UploadEducationContentCard = ({ content }) => {
  const router = useRouter();
  return (
    <div>
      <div className="education_content_heading mb-4 d-block d-xxl-none d-xl-none d-lg-none d-md-none">
        <h3 className="medium_font font_size_18 ms-3">
          Upload Educational Content
        </h3>
      </div>
      <div className="education_content_card p-3 m-3 border rounded">
        <div className="education_content_heading mb-4 d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <h3 className="medium_font font_size_18">
            Upload Educational Content
          </h3>
        </div>
        {content.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              router.push(
                `/admin-panel/content-material/content-material-details?id=${item.id}`
              );
            }}
            style={{ overflow: "hidden", cursor: "pointer" }}
            className="education_content_card_body border-bottom pb-4 mb-4 d-flex justify-content-between align-items-center"
          >
            <p className="font_size_14 m-0">{item.title}</p>
            <div className="d-flex education_content_image position-relative">
              {item.upload_media.map((ele, ind) => (
                <Image
                  key={ind}
                  className="image_1 rounded-circle"
                  src={"/assets/images/dashboard/profile-image.png"}
                  alt="image"
                  width={30}
                  height={30}
                />
              ))}
            </div>
          </div>
        ))}
        <div
          style={{ width: "150px" }}
          onClick={() => {
            router.push("/admin-panel/content-upload");
          }}
        >
          <Button text="Upload" className="font_size_14" />
        </div>
      </div>
    </div>
  );
};

export default UploadEducationContentCard;
