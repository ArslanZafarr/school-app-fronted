"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./faqs-card.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

const FaqsCard = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [open, setopen] = useState(false);
  //   const [accordionData, setAccordionData] = useState(faqs);

  const handleItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleAddFaq = () => {
    setopen(!open);
    // setAccordionData([...accordionData, { title: "New FAQ", content: "" }]);
  };

  return (
    <div className="faqs_card-main_div ">
      <div>
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`accordion-item ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <div className="faqs_card position-relative border rounded p-3 my-xxl-3 my-xl-3 my-lg-3 my-md-3 d-flex justify-content-between align-items-center">
              <div className="text_div">
                <p
                  className="medium_font font_size_16 m-0 "
                  type="button"
                  onClick={() => handleItemClick(index)}
                >
                  {" "}
                  {item.title}{" "}
                </p>
              </div>
              <div className=" d-flex justify-content-between align-items-center">
                <div className="delete_and_edit_icon_div">
                  <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                    <Link href="#">
                      <FaRegEdit className="card_icon text-dark" />
                    </Link>
                    <Link href="#">
                      <RiDeleteBin6Line
                        className="card_icon"
                        style={{ color: "#ef3826" }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="plus_icon_div">
                  <FaPlus onClick={handleAddFaq} />
                </div>
              </div>
            </div>

            <div
              className={`accordion-collapse collapse ${
                activeIndex === index ? "show" : ""
              }`}
            >
              <div className="accordion-body accordion">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqsCard;
