"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserDataFromApi, setToken } from "@/redux/features/auth/authSlice";
import "./login.css";
import "@/app/globals.css";
import Image from "next/image";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa6";
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userLogin, { isLoading, isError }] = useUserLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typepassword, settypepassword] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!email) tempErrors.email = "Email is required.";
    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await userLogin(formData).unwrap();
      console.log("🚀 ~ handleSubmit ~ response:", response);

      if (response.success) {
        toast.success("User logged in successfully!");

        // Dispatch actions to set user data and token
        dispatch(setUserDataFromApi(response.user));
        dispatch(setToken(response.token));

        // Redirect based on user role
        const role = response.user.role;
        switch (role) {
          case "admin":
            router.push("/admin-panel");
            break;
          case "teacher":
            router.push("/dashboard");
            break;
          case "principal":
            router.push("/principal-panel");
            break;
          case "tutor":
            router.push("/tutor-panel");
            break;
          default:
            toast.error("Unknown role");
        }
      } else {
        toast.error(response.error.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error", error);
      const message = error.data?.message || "An error occurred.";
      toast.error(message);
    }
  };

  return (
    <section className="login_section">
      <div className="main_container">
        <div className="sub_container d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <Image
            className="login_image img-fluid"
            src="/assets/images/login-page/login-page-image.jpg"
            alt="Login page image"
            width={960}
            height={900}
          />
        </div>
        <div className="sub_container">
          <div className="login_form_container d-flex flex-column justify-content-center align-items-center h-100 w-100">
            <div className="logo_div text-center">
              <Image
                src="/assets/images/dashboard/logo-4.png"
                alt="Brainlux logo"
                width={40}
                height={40}
              />
              <h5 className="mt-2">Brainlux</h5>
            </div>
            <div className="login_text text-center mb-2 mt-5 my-xxl-5 my-xl-5 my-lg-5 my-md-5">
              <h3 className="medium_font font_size_32 login_heading">Login</h3>
            </div>
            <div className="login_text text-center">
              <h3 className="bold_font font_size_22">
                Welcome to Brainlux
              </h3>
            </div>
            <div className="login_text text-center my-4">
              <h5 className="font_size_16">
                Welcome! Please sign in to manage schools, timetables, and
                educational content.
              </h5>
            </div>
            <form onSubmit={handleSubmit} className="p-3 w-75 responsive_width">
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  User Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
                {errors.email && (
                  <div className="error-text text-danger">{errors.email}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={typepassword ? "password" : "text"}
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
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
              <div className="text-end p-3 responsive_width">
                <Link
                  href="/forgot-password"
                  className="font_size_16 forget_btn text-decoration-none"
                >
                  Forget Password
                </Link>
              </div>
              <div className="p-3 responsive_width">
                <Button
                  className="loginBtn"
                  text="Login"
                  type="submit"
                  disabled={isLoading}
                />
              </div>
            </form>
            {isError && <p className="error">Failed to login</p>}
            {/* <Link href={"/register"} className="text-decoration-none text-dark">
              <p>
                Do not have an account?{" "}
                <a href="#" style={{ color: "#FA7800" }}>
                  Register
                </a>
              </p>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
