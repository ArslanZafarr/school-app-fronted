"use client";
import Button from "@/app/components/Button";
import "./settings.css";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUserProfileChangePasswordMutation } from "@/redux/features/teacher-panel/profile/profileApi";
import { FaEyeSlash } from "react-icons/fa6";
const Page = () => {
  const [typepassword, settypepassword] = useState(true);
  const [typepassword2, settypepassword2] = useState(true);
  const [userChangePassword, { isLoading, isError }] =
    useUserProfileChangePasswordMutation();

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.current_password)
      newErrors.current_password = "Current password is required";
    if (!formData.new_password)
      newErrors.new_password = "New password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formPayload = new FormData();
    formPayload.append("current_password", formData.current_password);
    formPayload.append("new_password", formData.new_password);

    try {
      const response = await userChangePassword(formPayload).unwrap();
      console.log("🚀 ~ handleSubmit ~ response:", response);
      toast.success(response.message);
    } catch (error) {
      console.log("admin-panel profile error", error);
      toast.error(response.error);
    }
  };

  return (
    <div className="settings_div">
      <div className="settings_heading d-flex justify-content-between align-items-center">
        <h2 className="medium_font font_size_24"> Change Password </h2>
      </div>
      <div className="settings_card_div mt-4">
        <div className="settings_card card_border rounded p-xxl-3 p-xl-3 p-lg-3 p-md-3">
          <form onSubmit={handleSubmit}>
            <div className="settings_inputs_div">
              <div className="mx-xxl-4 mx-xl-4 mx-lg-4 mx-md-4">
                <div className="settins_inputs_inner_div">
                  <div className="mb-4">
                    <label
                      htmlFor="current_password"
                      className="form-label medium_font font_size_14"
                    >
                      Current Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={typepassword ? "password" : "text"}
                        name="current_password"
                        value={formData.current_password}
                        onChange={handleChange}
                        className="form-control"
                        id="current_password"
                        placeholder="Password"
                        style={{ height: "55px" }}
                      />
                      <div
                        className="passwordshow"
                        onClick={() => settypepassword(!typepassword)}
                      >
                        <FaEyeSlash />
                      </div>
                    </div>
                    {errors.current_password && (
                      <p className="error_text text-danger">
                        {errors.current_password}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="new_password"
                      className="form-label medium_font font_size_14"
                    >
                      New Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={typepassword2 ? "password" : "text"}
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleChange}
                        className="form-control"
                        id="new_password"
                        placeholder="New Password"
                        style={{ height: "55px" }}
                      />
                      <div
                        className="passwordshow"
                        onClick={() => settypepassword2(!typepassword2)}
                      >
                        <FaEyeSlash />
                      </div>
                    </div>
                    {errors.new_password && (
                      <p className="error_text text-danger">
                        {errors.new_password}
                      </p>
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
                <Button text="Changed Password" isLoading={isLoading} />
              </div>
            </div>
            <div className="text-center">
              {isError && (
                <p className="error_text text-danger">
                  Write the correct previous password.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
