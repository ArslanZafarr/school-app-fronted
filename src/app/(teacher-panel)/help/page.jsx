"use client";
import Button from "@/app/components/Button";
import { createFeedback } from "@/services/teacher/teacherApiService";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const initialFormData = {
    title: "",
    message: "",
    upload_media: "",
  };
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const { apiToken } = useSelector((state) => state.storeAuth);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFiles = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.files[0],
    });
  };
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.message) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("54");
    if (validateForm()) {
      console.log("56");
      setisLoading(true);
      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }
      try {
        const response = await createFeedback(formPayload, apiToken);
        console.log("73", response);
        toast.success(response.data.message);
        setFormData(initialFormData);
        setErrors({});
        setisLoading(false);
      } catch (error) {
        setisLoading(false);
        const message = error.data?.message || "Invalid data";
        toast.error(message);
        console.log(error);
      }
    }
  };
  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="padding tablet_padding">
      <div className="announcement_heading_div">
        <h3 className="medium_font font_size_24">
          Help us improve Brainlux
        </h3>
        <p className="font_size_14 text_muted">
          We&apos;re always working to improve the app and your feedback is an
          important part of that process.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="announcement_inputs_div">
          <div>
            <div className="mb-5">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
              {errors.title && (
                <span className="text-danger">{errors.title}</span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Your feedback
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={7}
                defaultValue={""}
                placeholder="What's going well? What could be better?"
                value={formData.message}
                onChange={handleChange}
                name="message"
              />
              {errors.message && (
                <span className="text-danger">{errors.message}</span>
              )}
            </div>

            <div className="content_upload_card mb-3">
              <div className="upload_file_div ">
                <h3 className="medium_font font_size_18 mb-4">
                  {" "}
                  Upload Media{" "}
                </h3>
                <div className="upload_file_area">
                  <div className="upload_file_content_area">
                    <input
                      type="file"
                      id="fileUpload"
                      className="file-upload-input"
                      onChange={(e) => handleFiles(e, "upload_media")}
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
            </div>

            <div className="">
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Your feedback will help us make the app better for everyone.
              </label>
            </div>
          </div>
          <div className="btn_div w-100 pe-xxl-5 pe-xl-5 pe-lg-5 pe-md-5 d-xxl-flex d-xl-flex d-lg-flex d-md-flex justify-content-xxl-end justify-content-xl-end justify-content-lg-end justify-content-md-end mt-4 me-5 align-items-center">
            <Button text="Cancel" className="bg_gray px-5 mb-2" />
            <Button
              text="Submit"
              className="ms-xxl-5 ms-xl-5 ms-lg-5 ms-md-5 mb-2"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
