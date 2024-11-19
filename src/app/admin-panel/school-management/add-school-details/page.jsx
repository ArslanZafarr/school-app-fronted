"use client";
import Button from "@/app/components/Button";
import "./add-school-details.css";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateSchoolUserMutation,
  useSchoolUsersQuery,
} from "@/redux/features/admin-panel/school-management/schoolManagementApi";
import { useRouter } from "next/navigation";
import { FaEyeSlash } from "react-icons/fa6";
const Page = () => {
  const initialFormData = {
    school_name: "",
    school_type: "",
    classes_from: "",
    classes_to: "",
    principal_name: "",
    principal_email: "",
    principal_password: "",
    address: "",
    phone_number: "",
    board_type: "",
    payment_amount: "",
  };
  const [typepassword, settypepassword] = useState(true);
  const router = useRouter();
  const { refetch } = useSchoolUsersQuery(); // Use refetch from useSchoolUsersQuery
  const [data, { isLoading, isError }] = useCreateSchoolUserMutation();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    if (!formData.school_name)
      tempErrors.school_name = "School name is required";
    if (!formData.school_type)
      tempErrors.school_type = "School type is required";
    if (!formData.classes_from)
      tempErrors.classes_from = "Starting class is required";
    if (!formData.classes_to)
      tempErrors.classes_to = "Ending class is required";
    if (!formData.principal_name)
      tempErrors.principal_name = "Principal name is required";
    if (!formData.principal_email)
      tempErrors.principal_email = "Principal email is required";
    if (!formData.principal_password) {
      tempErrors.principal_password = "Principal password is required";
    } else if (formData.principal_password.length < 8) {
      tempErrors.principal_password =
        "Principal password must be at least 8 characters long";
    }
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.phone_number)
      tempErrors.phone_number = "Phone number is required";
    if (!formData.board_type) tempErrors.board_type = "Board type is required";
    if (!formData.payment_amount)
      tempErrors.payment_amount = "Payment amount is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }

      try {
        const response = await data(formPayload).unwrap();
        toast.success("Data submitted successfully.");
        setFormData(initialFormData);
        setErrors({});
        refetch(); // Refetch the data after successful creation
        router.push("/admin-panel/school-management");
      } catch (error) {
        const message = error.data.message || "Invalid data";
        toast.error(message);
        console.log(error);
      }
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <>
      <div className="school_details_div">
        <div className="school_details_heading">
          <h2 className="medium_font font_size_24 mb-5">
            {" "}
            Add School Details{" "}
          </h2>
        </div>

        <div className="card_border rounded p-xxl-4 p-xl-4 p-lg-4 p-md-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="school_name"
                className="form-label medium_font font_size_16"
              >
                School Name
              </label>
              <input
                type="text"
                name="school_name"
                value={formData.school_name}
                onChange={handleChange}
                placeholder="Enter a name"
                className="form-control"
                id="school_name"
              />
              {errors.school_name && (
                <span className="text-danger">{errors.school_name}</span>
              )}
            </div>
            <div className="rodio_button_div mb-4">
              <div className="school_details_heading">
                <h2 className="medium_font font_size_16 mb-4"> School Type </h2>
              </div>
              <div className="d-flex flex-wrap align-items-center">
                <div className="form-check me-xxl-5 me-xl-5 me-lg-5">
                  <input
                    className="form-check-input radio_buttons"
                    type="radio"
                    name="school_type"
                    id="school_type_english"
                    value="english"
                    checked={formData.school_type === "english"}
                    onChange={handleRadioChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="school_type_english"
                  >
                    English Medium
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input radio_buttons"
                    type="radio"
                    name="school_type"
                    id="school_type_hindi"
                    value="hindi"
                    checked={formData.school_type === "hindi"}
                    onChange={handleRadioChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="school_type_hindi"
                  >
                    Hindi Medium
                  </label>
                </div>
              </div>
              {errors.school_type && (
                <span className="text-danger">{errors.school_type}</span>
              )}
              <div className="school_details_heading">
                <h2 className="medium_font font_size_16 my-4"> Board Type </h2>
              </div>
              <div className="d-flex flex-wrap align-items-center">
                <div className="form-check me-xxl-5 me-xl-5 me-lg-5">
                  <input
                    className="form-check-input radio_buttons"
                    type="radio"
                    name="board_type"
                    id="board_type_cbse"
                    value="cbse"
                    checked={formData.board_type === "cbse"}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="board_type_cbse">
                    CBSE
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input radio_buttons"
                    type="radio"
                    name="board_type"
                    id="board_type_rbse"
                    value="rbse"
                    checked={formData.board_type === "rbse"}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="board_type_rbse">
                    RBSE
                  </label>
                </div>
              </div>
              {errors.board_type && (
                <span className="text-danger">{errors.board_type}</span>
              )}
              <div className="school_details_heading">
                <h2 className="medium_font font_size_16 my-4"> Class Range </h2>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="">
                    <label
                      htmlFor="classes_from"
                      className="form-label medium_font font_size_16"
                    >
                      From
                    </label>
                    <input
                      type="number"
                      name="classes_from"
                      value={formData.classes_from}
                      onChange={handleChange}
                      className="form-control"
                      onWheel={(event) => event.currentTarget.blur()}
                      id="classes_from"
                    />
                    {errors.classes_from && (
                      <span className="text-danger">{errors.classes_from}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mt-3 mt-xxl-0 mt-xl-0 mt-lg-0 mt-md-0">
                    <label
                      htmlFor="classes_to"
                      className="form-label medium_font font_size_16"
                    >
                      To
                    </label>
                    <input
                      type="number"
                      name="classes_to"
                      value={formData.classes_to}
                      onChange={handleChange}
                      className="form-control"
                      id="classes_to"
                      onWheel={(event) => event.currentTarget.blur()}
                    />
                    {errors.classes_to && (
                      <span className="text-danger">{errors.classes_to}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="principal_name"
                className="form-label medium_font font_size_16"
              >
                Principal Name
              </label>
              <input
                type="text"
                name="principal_name"
                value={formData.principal_name}
                onChange={handleChange}
                placeholder="Principal Name"
                className="form-control"
                id="principal_name"
              />
              {errors.principal_name && (
                <span className="text-danger">{errors.principal_name}</span>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="principal_email"
                className="form-label medium_font font_size_16"
              >
                Principal Email
              </label>
              <input
                type="email"
                name="principal_email"
                value={formData.principal_email}
                onChange={handleChange}
                placeholder="Principal Email"
                className="form-control"
                id="principal_email"
              />
              {errors.principal_email && (
                <span className="text-danger">{errors.principal_email}</span>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="principal_password"
                className="form-label medium_font font_size_16"
              >
                Principal Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={typepassword ? "password" : "text"}
                  name="principal_password"
                  value={formData.principal_password}
                  onChange={handleChange}
                  placeholder="Principal Password"
                  className="form-control"
                  id="principal_password"
                />
                <div
                  className="passwordshow"
                  onClick={() => settypepassword(!typepassword)}
                >
                  <FaEyeSlash />
                </div>
              </div>
              {errors.principal_password && (
                <span className="text-danger">{errors.principal_password}</span>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="address"
                className="form-label medium_font font_size_16"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="form-control"
                id="address"
              />
              {errors.address && (
                <span className="text-danger">{errors.address}</span>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="phone_number"
                className="form-label medium_font font_size_16"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="form-control"
                id="phone_number"
              />
              {errors.phone_number && (
                <span className="text-danger">{errors.phone_number}</span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone_number"
                className="form-label medium_font font_size_16"
              >
                Payment Amount
              </label>
              <input
                type="number"
                name="payment_amount"
                value={formData.payment_amount}
                onChange={handleChange}
                placeholder="Phone Number"
                className="form-control"
                id="payment_amount"
                onWheel={(event) => event.currentTarget.blur()}
              />
              {errors.payment_amount && (
                <span className="text-danger">{errors.payment_amount}</span>
              )}
            </div>
            <div className="Button_div btn_div" style={{ width: "150px" }}>
              <Button text="Save" type={"submit"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
