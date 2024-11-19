"use client";
import Button from "@/app/components/Button";
import "./settings.css";
import { CiCamera } from "react-icons/ci";
import Link from "next/link";
import { useState } from "react";
import { useUserAddProfileMutation } from "@/redux/features/teacher-panel/profile/profileApi";

const Page = () => {
  const initialFormData = {
    full_name: "",
    address: "",
    phone: "",
    image: null,
  };
  const [userAddProfile, { isLoading, isError }] = useUserAddProfileMutation();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name) newErrors.full_name = "Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formPayload = new FormData();
    formPayload.append("full_name", formData.full_name);
    formPayload.append("address", formData.address);
    formPayload.append("phone", formData.phone);
    formPayload.append("image", formData.image);

    try {
      const response = await userAddProfile(formPayload).unwrap();
      console.log("🚀 ~ handleSubmit ~ response:", response);
      window.location.reload(); // Refresh the page after successful submission
    } catch (error) {
      console.log("admin-panel profile error", error);
    }
  };

  return (
    <div className="settings_div">
      <div className="settings_heading d-flex justify-content-between align-items-center">
        <h2 className="medium_font font_size_24"> Settings </h2>
        <Link
          href={"/change-password"}
          className="text-danger medium_font font_siz_16 text-decoration-none"
        >
          Change Password
        </Link>
      </div>
      <div className="settings_card_div mt-4">
        <div className="settings_card card_border rounded p-xxl-3 p-xl-3 p-lg-3 p-md-3">
          <div className="d-flex flex-column align-items-center">
            <div className="settings_card_upload_photo_main_div my-4">
              <input
                type="file"
                id="fileUpload"
                className="file-upload-input"
                onChange={handleImageChange}
              />
              <label htmlFor="fileUpload">
                <div className="settings_card_upload_photo_div border rounded-circle">
                  <CiCamera className="m-3 settings_upload_file_icon" />
                </div>
              </label>
              <p className="font_size_14 mt-2" style={{ color: "orange" }}>
                Upload Photo
              </p>
            </div>
            {errors.image && (
              <p className="error_text text-danger">{errors.image}</p>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="settings_inputs_div">
              <div className="mx-xxl-4 mx-xl-4 mx-lg-4 mx-md-4">
                <div className="settins_inputs_inner_div">
                  <div className="mb-4">
                    <label
                      htmlFor="full_name"
                      className="form-label medium_font font_size_14"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="form-control"
                      id="full_name"
                      placeholder="Name"
                      style={{ height: "55px" }}
                    />
                    {errors.full_name && (
                      <p className="error_text text-danger">
                        {errors.full_name}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="form-label medium_font font_size_14"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      style={{ height: "55px" }}
                    />
                    {errors.address && (
                      <p className="error_text text-danger">{errors.address}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="form-label medium_font font_size_14"
                    >
                      Phone
                    </label>
                    <input
                      type="number"
                      onWheel={(event) => event.currentTarget.blur()}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      id="phone"
                      placeholder="Phone"
                      style={{ height: "55px" }}
                    />
                    {errors.phone && (
                      <p className="error_text text-danger">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="settings_btn_div d-flex justify-content-center">
              <div
                className="settings_btn btn_div my-5"
                style={{ width: "250px" }}
              >
                <Button text="Save" isLoading={isLoading} />
              </div>
            </div>
            {isError && (
              <p className="error_text text-danger">
                An error occurred while saving the profile.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
