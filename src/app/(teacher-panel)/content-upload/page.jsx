"use client";
import Button from "@/app/components/Button";
import "./content-upload.css";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { contentUpload } from "@/services/teacher/teacherApiService";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const initialFormData = {
    title: "",
    class_grade: searchParams.get("id"),
    cover_image: "",
    upload_media: "",
    class_id: searchParams.get("id"),
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { apiToken, teacherProfile } = useSelector((state) => state.storeAuth);
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
  const deletemedia = (name) => {
    let data = { ...formData };
    delete data.name;
    setFormData(name);
  };
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.class_grade)
      tempErrors.class_grade = "Class Grade is required";
    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.upload_media) tempErrors.upload_media = "Media is required";
    if (!formData.cover_image)
      tempErrors.cover_image = "Cover Image is required";

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
      formPayload.append(
        "subject",
        teacherProfile["teacher_profile"]["subject"]
      );
      formPayload.append(
        "school_id",
        teacherProfile["teacher_profile"]["school"]["id"]
      );
      try {
        const response = await contentUpload(formPayload, apiToken);
        console.log("73", response);
        toast.success(response.data.message);
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
    <>
      <div className="content_upload_div padding">
        <div className="content_upload_heading mb-4 d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> Content Upload </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="content_upload_card card_border rounded-4 p-xxl-4 p-xl-4 p-lg-4 p-lg-4 p-md-4">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Content Title
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
              {errors.title && (
                <span className="text-danger">{errors.title}</span>
              )}
            </div>
            <div className="upload_file_div mt-3">
              <h3 className="medium_font font_size_18"> Upload Resources: </h3>
              <div className="upload_file_area">
                <div className="upload_file_content_area">
                  <input
                    type="file"
                    id="fileUpload"
                    className="file-upload-input"
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
                    id="fileUploadCover"
                    className="file-upload-input"
                    onChange={(e) => handleFiles(e, "cover_image")}
                    name="cover_image"
                  />
                  <label
                    htmlFor="fileUploadCover"
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
              {formData.upload_media && (
                <div className="uploaded_file_card mb-3 border border-success rounded p-2 d-flex justify-content-between align-itmes-center">
                  <div className="text_div position-relative">
                    <p className="font_size_14 mb-0">
                      {" "}
                      {formData.upload_media?.name}{" "}
                    </p>
                    <div className="border_div"></div>
                  </div>
                  <div className="uploaded_file_icon_div">
                    <Link
                      href="#"
                      className="text-decoration-none text-dark"
                      onClick={() => deletemedia("upload_media")}
                    >
                      <RiDeleteBin6Line className="text-danger" />
                    </Link>
                  </div>
                </div>
              )}
              {formData.cover_image && (
                <div className="uploaded_file_card border border-success rounded p-2 d-flex justify-content-between align-itmes-center">
                  <div className="text_div position-relative">
                    <p className="font_size_14 mb-0">
                      {" "}
                      {formData.cover_image?.name}{" "}
                    </p>
                    <div className="border_div"></div>
                  </div>
                  <div className="uploaded_file_icon_div">
                    <Link
                      href="#"
                      className="text-decoration-none text-dark"
                      onClick={() => deletemedia("cover_image")}
                    >
                      <RiDeleteBin6Line className="text-danger" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="btn_div my-5" style={{ width: "250px" }}>
              <Button text="Upload Files" className="py-3" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
