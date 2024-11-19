import Image from "next/image";
import "./content-material-card.css";
import Link from "next/link";

const ContentMaterialCard = ({ content }) => {
  return (
    <>
      {content.map((curData, index) => (
        <div key={index} className="content_material_card mb-4">
          <Link
            href={`/admin-panel/content-material/content-material-details?id=${curData.id}`}
          >
            <Image
              className="mb-3 rounded-4"
              src={"/assets/images/dashboard/content-material/card.png"}
              alt="image"
              width={168}
              height={168}
            />
            <p className="medium_font font_size_16 mb-2 "> {curData.title} </p>
            <p className="font_size_14">
              {" "}
              {curData.upload_media.length} items{" "}
            </p>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ContentMaterialCard;
