"use client";
import Button from "@/app/components/Button";
import "./add-new-student.css";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

const page = () => {
  return (
    <div className="add_new_teacher_main_div padding tablet_padding">
      <div className="teachers_div">
        <div className="teachers_heading d-flex justify-content-between align-items-center mb-3">
          <h2 className="medium_font font_size_24"> Add New Students </h2>
          <Link href="/principal-panel/students/add-new-student">
            <Button
              icon={
                <CiCirclePlus
                  className="me-2 text_color"
                  style={{ fontSize: "25px" }}
                />
              }
              text="Upload Using Excel"
              className=""
            />
          </Link>
        </div>
      </div>

      <div className="inputs_div card_border rounded p-3">
        <form>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter a name"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Password
            </label>
            <input
              type="Password"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Password"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Gender
            </label>
            <div
              className="my-4 d-flex justify-content-between align-items-center"
              style={{ width: "300px" }}
            >
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input radio_btn"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  defaultValue="option1"
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input radio_btn"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  defaultValue="option1"
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Date of Birth"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Parent’s Contact Number
            </label>
            <input
              type="number"
              onWheel={(event) => event.currentTarget.blur()}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Contact number"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Class
            </label>
            <input
              onWheel={(event) => event.currentTarget.blur()}
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Class"
            />
          </div>
          <div className="btn_div mt-5 mb-3" style={{ width: "200px" }}>
            <Button text="Add Student" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
