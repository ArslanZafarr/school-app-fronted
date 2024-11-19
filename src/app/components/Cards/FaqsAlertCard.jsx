"use client";
import Link from "next/link";
import "./faqs-alert-card.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
const FaqsAlertCard = ({ faqs, handledeletefaq }) => {
  return (
    <div>
      {faqs.map((item, index) => (
        <IndividualFaq
          item={item}
          key={index}
          performaction={() => handledeletefaq(item.id)}
        />
      ))}
    </div>
  );
};

export default FaqsAlertCard;

export const IndividualFaq = ({ item, performaction }) => {
  const [open, setopen] = useState(false);
  const handleAddFaq = () => {
    setopen(!open);
  };
  return (
    <div className="faqs_card-main_div">
      <div className="faqs_card border rounded p-3 my-3">
        <div className="faqs_alert_heading_div d-flex justify-content-between align-items-center">
          <div className="text_div">
            <p className="medium_font font_size_16 m-0">{item.title}</p>
          </div>
          <div className="alert_icons_div d-flex justify-content-between align-items-center">
            <div className="delete_and_edit_icon_div">
              <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                <Link href="/admin-panel/faqs/edit-faq">
                  <FaRegEdit className="card_icon text-dark" />
                </Link>
                <Link href="#">
                  <RiDeleteBin6Line
                    className="card_icon"
                    style={{ color: "#ef3826" }}
                    onClick={performaction}
                  />
                </Link>
              </div>
            </div>
            <div className="plus_icon_div">
              {open ? (
                <MdCancel
                  onClick={handleAddFaq}
                  style={{ fontSize: "20px", cursor: "pointer" }}
                />
              ) : (
                <FaPlus onClick={handleAddFaq} />
              )}
            </div>
          </div>
        </div>
        {open && (
          <div className="faqs_alert_description_div mt-3">
            <p className="font_size_16">{item.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};
