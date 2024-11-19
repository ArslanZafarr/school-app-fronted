"use client";
import Button from "@/app/components/Button";
import "./add-new-faqs.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { addFaq } from "@/services/admin/faqs";

const Page = () => {
  const router = useRouter();
  const initialFormData = {
    content: "",
    topic: "",
    title: "",
  };
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
    if (!formData.content) tempErrors.content = "Content is required";
    if (!formData.topic) tempErrors.topic = "Topic is required";
    if (!formData.title) tempErrors.title = "Title is required";

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
      console.log("65", formPayload);
      try {
        const response = await addFaq(apiToken, formPayload);
        console.log("73", response);
        toast.success("Data submitted successfully.");
        setFormData(initialFormData);
        setErrors({});
        setisLoading(false);
        //   refetch(); // Refetch the data after successful creation
        router.push("/admin-panel/faqs");
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
    <div className="add_new_faqs_div">
      <div className="add_new_faqs_heading d-flex justify-content-between align-items-center">
        <h2 className="medium_font font_size_24 heading_margin">
          {" "}
          Add New FAQ{" "}
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="add_new_faqs_card_div">
          <div className="add_new_faqs_card card_border rounded p-4 mt-4">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label medium_font font_size_16"
              >
                FAQ Title{" "}
              </label>
              <input
                className="form-control add_new_faqs_input_height"
                id="exampleFormControlInput1"
                placeholder="Enter a Title"
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
              {errors.title && (
                <span className="text-danger">{errors.title}</span>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label medium_font font_size_16"
              >
                Topic{" "}
              </label>
              <input
                className="form-control add_new_faqs_input_height"
                id="exampleFormControlInput1"
                placeholder="Topic"
                value={formData.topic}
                onChange={handleChange}
                name="topic"
              />
              {errors.topic && (
                <span className="text-danger">{errors.topic}</span>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label medium_font font_size_16"
              >
                FAQ Content
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={7}
                defaultValue={""}
                placeholder="FAQ Content"
                value={formData.content}
                onChange={handleChange}
                name="content"
              />
              {errors.content && (
                <span className="text-danger">{errors.content}</span>
              )}
            </div>
            <div
              className="add_new_faqs_btn_div btn_div mt-5"
              style={{ width: "200px" }}
            >
              <Button text="Save" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
