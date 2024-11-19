"use client";
import { useState } from "react";
import Link from "next/link";
import "./register.css";
import "@/app/globals.css";
import Image from "next/image";
import Button from "@/app/components/Button";
import { useUserRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaEyeSlash } from "react-icons/fa6";
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, { isLoading, isError }] = useUserRegisterMutation();
  const [typepassword, settypepassword] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = "Username is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters.";
    }
    if (!formData.role) tempErrors.role = "Role is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formPayload = new FormData();
    formPayload.append("username", formData.username);
    formPayload.append("email", formData.email);
    formPayload.append("password", formData.password);
    formPayload.append("role", formData.role);

    console.log("Form data submitted:", formPayload);
    try {
      const response = await register(formPayload).unwrap();
      console.log("🚀 ~ handleSubmit ~ response:", response);
      toast.success("User registered successfully!");
      dispatch(setToken(response.token));
      router.push("/");
    } catch (error) {
      const message = error.data?.message || "An error occurred.";
      toast.error(message);
    }
  };

  return (
    <>
      <section className="login_section">
        <div className="main_container">
          <div className="sub_container d-none d-xxl-block d-xl-block d-lg-block d-md-block">
            <Image
              className="login_image img-fluid"
              src="/assets/images/login-page/login-page-image.jpg"
              alt="image"
              width={960}
              height={900}
            />
          </div>
          <div className="sub_container ">
            <div className="login_form_container d-flex flex-column justify-content-center align-items-center h-100 w-100">
              <div className="logo_div text-center">
                <Image
                  src="/assets/images/login-page/logo.png"
                  alt="image"
                  width={40}
                  height={40}
                />
                <h5 className="mt-2"> Siksha Matic </h5>
              </div>
              <div className="login_text text-center mb-2 mt-4 my-xxl-4 my-xl-4 my-lg-4 my-md-4">
                <h3 className="medium_font font_size_32 login_heading">
                  {" "}
                  Register{" "}
                </h3>
              </div>
              <div className="login_text text-center">
                <h3 className="bold_font font_size_22">
                  {" "}
                  Welcome to Siksha Matic{" "}
                </h3>
              </div>
              <div className="login_text text-center my-3">
                <h5 className="font_size_16">
                  {" "}
                  Welcome, Admin! Please sign up to manage schools, timetables,
                  and educational content.{" "}
                </h5>
              </div>
              <form
                className="p-3 w-75 responsive_width"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label htmlFor="userNameId" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userNameId"
                    name="username"
                    placeholder="Enter Your Name"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <div className="error-text text-danger">
                      {errors.username}
                    </div>
                  )}
                </div>
                <div className="mb-xxl-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="error-text text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="passwordId" className="form-label">
                    Password
                  </label>

                  <div style={{ position: "relative" }}>
                    <input
                      type={typepassword ? "password" : "text"}
                      className="form-control"
                      id="passwordId"
                      name="password"
                      placeholder="Enter Your Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div
                      className="passwordshow"
                      onClick={() => settypepassword(!typepassword)}
                    >
                      <FaEyeSlash />
                    </div>
                  </div>
                  {errors.password && (
                    <div className="error-text text-danger">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="mb-xxl-4">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    name="role"
                    placeholder="Enter Your Role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                  {errors.role && (
                    <div className="error-text text-danger">{errors.role}</div>
                  )}
                </div>
                <div className="responsive_width">
                  <Button className="loginBtn" text="Register" />
                </div>
              </form>
              {/* <div className="text-center">
                <Link href={"/"} className={"text-decoration-none text-dark"}>
                  <p>
                    {" "}
                    Do not have an account?{" "}
                    <a href="#" style={{ color: "#FA7800" }}>
                      Login{" "}
                    </a>{" "}
                  </p>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
