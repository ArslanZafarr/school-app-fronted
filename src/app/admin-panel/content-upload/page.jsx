"use client";
import Button from "@/app/components/Button";
import "./content-upload.css";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { uploadContent } from "@/services/admin/contentupload";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Page = () => {
  const initialFormData = {
    subject: "",
    class_grade: "",
    title: "",
  };
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFiles2, setSelectedFiles2] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFiles = (e, name) => {
    const files = Array.from(e.target.files);
    if (name === "upload_media") {
      let data = [...selectedFiles];
      files.forEach((item) => {
        data.push(item);
      });
      setSelectedFiles(data);
    } else {
      let data = [...selectedFiles2];
      files.forEach((item) => {
        data.push(item);
      });
      setSelectedFiles2(data);
    }
    // setFormData({
    //   ...formData,
    //   [name]: e.target.files[0],
    // });
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

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.subject) tempErrors.subject = "Subject is required";
    if (!formData.class_grade)
      tempErrors.class_grade = "Class Grade is required";
    if (!formData.title) tempErrors.title = "Title is required";
    // if (!formData.upload_media) tempErrors.upload_media = "Media is required";
    // if (!formData.cover_image)
    //   tempErrors.cover_image = "Cover Image is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setisLoading(true);
      const formPayload = new FormData();
      for (const key in formData) {
        console.log("63", key);
        formPayload.append(key, formData[key]);
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        formPayload.append("upload_media", selectedFiles[i]);
      }
      for (let i = 0; i < selectedFiles2.length; i++) {
        formPayload.append("cover_image", selectedFiles2[i]);
      }
      console.log("65", formPayload);
      try {
        const response = await uploadContent(formPayload, apiToken);
        console.log("73", response);
        toast.success("Data submitted successfully.");
        setFormData(initialFormData);
        setErrors({});
        setisLoading(false);
        //   refetch(); // Refetch the data after successful creation
        //   router.push('/admin-panel/school-management');
      } catch (error) {
        setisLoading(false);
        const message = error.data?.message || "Invalid data";
        toast.error(message);
        console.log(error);
      }
    } else {
      console.log("Validation failed");
    }
  };
  return (
    <>
      <div className="content_upload_div">
        <div className="content_upload_heading mb-4 d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> Content Upload </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="content_upload_card_div card_border rounded-4 p-xxl-4 p-xl-4 p-lg-4 p-md-4">
            <div className="select_div">
              <h3 className="medium_font font_size_18"> Select Subject: </h3>

              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                name="subject"
              />
              {errors.subject && (
                <span className="text-danger">{errors.subject}</span>
              )}
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Class
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Class"
                  value={formData.class_grade}
                  onChange={handleChange}
                  name="class_grade"
                />
                {errors.class_grade && (
                  <span className="text-danger">{errors.class_grade}</span>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="title"
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                />
                {errors.title && (
                  <span className="text-danger">{errors.title}</span>
                )}
              </div>
            </div>
            <div className="upload_file_div mt-3">
              <h3 className="medium_font font_size_18"> Upload Media </h3>
              <div className="upload_file_area">
                <div className="upload_file_content_area">
                  <input
                    type="file"
                    multiple
                    id="fileUpload"
                    className="file-upload-input"
                    //   value={formData.subject}
                    onChange={(e) => handleFiles(e, "upload_media")}
                    name="upload_media"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ height: "200px" }}
                  >
                    <Image
                      className="mb-3 cursor_image"
                      src="/assets/images/dashboard/content-upload/Upload-icon.png"
                      alt="fileUpload"
                      width={50}
                      height={50}
                    />
                    <p className="medium_font font_size_16 mb-1">
                      {" "}
                      Drag & drop files or Browse{" "}
                    </p>
                    <p className="font_size_14 text_muted">
                      {" "}
                      Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI,
                      Word, PPT{" "}
                    </p>
                  </label>
                </div>
                {errors.upload_media && (
                  <span className="text-danger">{errors.upload_media}</span>
                )}
              </div>
            </div>
            <div className="upload_file_div mt-3">
              <h3 className="medium_font font_size_18"> Cover Photo </h3>
              <div className="upload_file_area">
                <div className="upload_file_content_area">
                  <input
                    type="file"
                    id="fileUploadcover"
                    className="file-upload-input"
                    onChange={(e) => handleFiles(e, "cover_image")}
                    name="cover_image"
                    multiple
                  />
                  <label
                    htmlFor="fileUploadcover"
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ height: "200px" }}
                  >
                    <Image
                      className="mb-3 cursor_image"
                      src="/assets/images/dashboard/content-upload/Upload-icon.png"
                      alt="fileUploadcover"
                      width={50}
                      height={50}
                    />
                    <p className="medium_font font_size_16 mb-1">
                      {" "}
                      Drag & drop files or Browse{" "}
                    </p>
                    <p className="font_size_14 text_muted">
                      {" "}
                      Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI,
                      Word, PPT{" "}
                    </p>
                  </label>
                </div>
                {errors.cover_image && (
                  <span className="text-danger">{errors.cover_image}</span>
                )}
              </div>
            </div>
            {/* <div className="uploading_file_div mt-3">
            <h3 className="medium_font font_size_16">
              {" "}
              Uploading - 3/3 files{" "}
            </h3>
            <div className="uploading_file_card border rounded p-2 d-flex justify-content-between align-itmes-center">
              <div className="text_div">
                <p className="font_size_14 mb-0"> your-file-here.PDF </p>
                <div className="border_div"></div>
              </div>
              <div className="uploaded_file_icon_div">
                <Link href="#" className="text-decoration-none text-dark">
                  <MdOutlineCancel />
                </Link>
              </div>
            </div>
          </div> */}
            <div className="uploaded_file_div mt-3">
              <h3 className="medium_font font_size_16"> Uploaded </h3>
              {selectedFiles.map((item, index) => (
                <div
                  key={index}
                  className="uploaded_file_card mb-3 border border-success rounded p-2 d-flex justify-content-between align-itmes-center"
                >
                  <div className="text_div position-relative">
                    <p className="font_size_14 mb-0"> {item?.name} </p>
                    <div className="border_div"></div>
                  </div>
                </div>
              ))}
              {selectedFiles2.map((item, index) => (
                <div
                  key={index}
                  className="uploaded_file_card mb-3 border border-success rounded p-2 d-flex justify-content-between align-itmes-center"
                >
                  <div className="text_div position-relative">
                    <p className="font_size_14 mb-0"> {item?.name} </p>
                    <div className="border_div"></div>
                  </div>
                </div>
              ))}
              {/* {formData.cover_image && (
                <div className="uploaded_file_card border border-success rounded p-2 d-flex justify-content-between align-itmes-center">
                  <div className="text_div position-relative">
                    <p className="font_size_14 mb-0">
                      {" "}
                      {formData.cover_image?.name}{" "}
                    </p>
                    <div className="border_div"></div>
                  </div>
                  <div className="uploaded_file_icon_div">
                    <Link href="#" className="text-decoration-none text-dark">
                      <RiDeleteBin6Line className="text-danger" />
                    </Link>
                  </div>
                </div>
              )} */}
            </div>
            <div className="btn_div my-5" style={{ width: "250px" }}>
              <Button text="Upload Files" type={"submit"} className="py-3" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
