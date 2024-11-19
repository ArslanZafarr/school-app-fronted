import "./submitted-card.css";
import { LuFileEdit } from "react-icons/lu";
import { lighten } from "polished";
import moment from "moment";

const SubmittedCard = (curData) => {
  return (
    <>
      <div className="Card border rounded p-3 my-3 d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <LuFileEdit
            className="rounded"
            style={{
              backgroundColor: lighten(0.3, curData.color),
              color: curData.color,
              fontSize: "50px",
              padding: "12px",
            }}
          />
          <div className="ms-2">
            <h4 className="medium_font font_size_16 "> {curData.topic} </h4>
            <p className="text_muted font_size_14 m-0">
              {" "}
              {curData.due_date &&
                moment(curData["due_date"]).format("lll")}{" "}
            </p>
          </div>
        </div>
        <p className="font_size_16 m-0">Class {curData.class?.grade} </p>
      </div>
    </>
  );
};

export default SubmittedCard;
