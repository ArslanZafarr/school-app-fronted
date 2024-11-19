"use client";
import React, { useState } from "react";
import Button from "../../Button";
import Image from "next/image";

const MondayTab = ({
  formData,
  handleChange,
  errors,
  handleSubmit,
  subjects,
  handleFiles,
  createsubject,
}) => {
  const [subject, setsubject] = useState("");
  return (
    <form onSubmit={handleSubmit}>
      <div className="create_timetable_card card_border rounded p-4 mt-3">
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Start Time
              </label>
              <input
                type="time"
                placeholder="Select a time"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={formData.start_time}
                onChange={handleChange}
                name="start_time"
              />
              {errors.start_time && (
                <span className="text-danger">{errors.start_time}</span>
              )}
            </div>
          </div>
          <div className="col-6">
            {/* <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                End Time
              </label>
              <input
                type="time"
                placeholder="Select a time"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={formData.end_time}
                onChange={handleChange}
                name="end_time"
              />
              {errors.end_time && (
                <span className="text-danger">{errors.end_time}</span>
              )}
            </div> */}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            No of Hours
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onWheel={(event) => event.currentTarget.blur()}
            placeholder="Enter Hours"
            value={formData.no_of_hours}
            onChange={handleChange}
            name="no_of_hours"
          />
          {errors.no_of_hours && (
            <span className="text-danger">{errors.no_of_hours}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Add Subject
          </label>
          {subjects.length > 0 && (
            <div className="d-flex mb-2">
              {subjects.map((item, index) => (
                <div
                  key={index}
                  className="me-2 border border-success rounded p-2"
                >
                  <p className="mb-0">{item.name}</p>
                </div>
              ))}
            </div>
          )}
          <div>
            <input
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Subject Name and click Save Subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}
              name="no_of_hours"
            />
            <div
              className="btn_div"
              onClick={() => {
                createsubject(subject);
                setsubject("");
              }}
            >
              <button type="button" className="my-4">
                Save Subject
              </button>
            </div>
          </div>
          {/* <select
            className="form-select form-select-lg mb-3"
            aria-label="Large select example"
            value={formData.subject_id}
            onChange={handleChange}
            name="subject_id"
          >
            <option value=""> Select Subject </option>
            {subjects.map((item, index) => (
              <option key={index} value={item["id"]}>
                {" "}
                {item?.name}{" "}
              </option>
            ))}
          </select>
          {errors.subject_id && (
            <span className="text-danger">{errors.subject_id}</span>
          )} */}
        </div>
        {/* <div style={{ width: "200px" }}>
        <button type="button" class="btn btn_outline my-3">
          Add more subject
        </button>
      </div> */}
        {/* <div className="content_upload_card mb-3">
          <div className="upload_file_div ">
            <h3 className="medium_font font_size_18 mb-4"> Upload Media </h3>
            <div className="upload_file_area">
              <div className="upload_file_content_area">
                <input
                  onChange={(e) => handleFiles(e, "image")}
                  type="file"
                  id="fileUpload"
                  className="file-upload-input"
                />
                <label
                  htmlFor="fileUpload"
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <Image
                    className="mb-3 cursor_image"
                    src="/assets/images/dashboard/content-upload/Upload-icon.png"
                    alt="image"
                    width={50}
                    height={50}
                  />
                  <p className="medium_font font_size_16 mb-1">
                    {" "}
                    Drag & drop files or Browse{" "}
                  </p>
                  <p className="font_size_14 text_muted">
                    {" "}
                    Supported formats: JPEG, PNG{" "}
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div> */}
        <div className="btn_div">
          <Button text="Save" className="my-4" />
        </div>
      </div>
    </form>
  );
};

export default MondayTab;
