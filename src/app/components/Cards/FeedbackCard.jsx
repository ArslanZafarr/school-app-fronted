import Image from "next/image";
import Button from "../Button";
import "./feedback-card.css";
import PowerClassesPagePagination from "../Pagination/PowerClassesPagePagination";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import Link from "next/link";
const FeedbackCard = ({
  feedback,
  totalitems,
  currentPage,
  totalpages,
  handlepagechange,
}) => {
  return (
    <div className="feedback_card_div card_border rounded p-xxl-5 p-xl-5 p-lg-5 p-md-5 mt-4">
      <p className="font_size_14 text_muted mb-4 ms-3">
        {totalitems} feedback items
      </p>

      {feedback.map((curData, index) => (
        <div key={index} className="feedback_card border-bottom p-4">
          <div className="feedback_card d-flex justify-content-between align-items-center">
            <div className="feedback_card_content_div order_div_2">
              <p className="font_size_14 text_muted mb-1 d-none d-xxl-block d-xl-block d-lg-block d-md-block">
                {curData?.votes}
              </p>
              <p className="medium_font font_size_16 mb-1">{curData.title}</p>
              <p className="font_size_14 text_muted mb-1">{curData.message}</p>
              <Link
                href={`/admin-panel/feedback/feedback-details?id=${curData.id}`}
              >
                <Button
                  text="View Details"
                  className="feedback_btn medium_font font_size_14 mt-4"
                />
              </Link>
            </div>
            <div className="feedback_card_content_div order_div_1 mb-3 mb-xxl-0 mb-xl-0 mb-lg-0">
              <Image
                className="border rounded-4"
                src={"/assets/images/dashboard/power-classes/card-image-1.png"}
                alt="image"
                width={400}
                height={200}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="pagination_div mt-5">
        <ResponsivePagination
          current={currentPage}
          total={totalpages}
          onPageChange={handlepagechange}
        />
      </div>
    </div>
  );
};

export default FeedbackCard;
