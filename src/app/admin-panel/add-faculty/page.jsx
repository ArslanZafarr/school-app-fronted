"use client";
import AddFacultyCard from "@/app/components/Cards/AddFacultyCard";
import "./add-faculty.css";
import { useEffect, useState } from "react";
import {
  addFaculty,
  fethTutor,
  getPowerClassNotAssigned,
} from "@/services/admin/powerclass";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const initialFormData = {
    tutor_id: "",
    power_class_id: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [classes, setclasses] = useState([]);
  const [tutor, settutor] = useState([]);
  const { apiToken } = useSelector((state) => state.storeAuth);

  useEffect(() => {
    const getClasses = async () => {
      setisLoading(true);
      try {
        let response = await getPowerClassNotAssigned(apiToken);
        setclasses(response.data.data);
        setisLoading(false);
        console.log("21", response.data);
      } catch (e) {
        setisLoading(false);
        setclasses([]);
      }
    };
    const getTutor = async () => {
      try {
        let response = await fethTutor(apiToken);
        if (response.data.success) {
          settutor(response.data.data.items);
        } else {
          settutor([]);
        }
        setisLoading(false);
        console.log("21", response.data);
      } catch (e) {
        settutor([]);
      }
    };
    getClasses();
    getTutor();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.power_class_id)
      tempErrors.power_class_id = "Class is required";
    if (!formData.tutor_id) tempErrors.tutor_id = "Teacher is required";

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
        const response = await addFaculty(formPayload, apiToken);
        console.log("73", response);
        toast.success("Data submitted successfully.");
        setFormData(initialFormData);
        setErrors({});
        setisLoading(false);
        //   refetch(); // Refetch the data after successful creation
        //   router.push('/admin-panel/school-management');
      } catch (error) {
        setisLoading(false);
        const message = error.response?.data?.message || "Invalid data";
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
    <div className="add_faculty_div">
      <div className="add_faculty_heading d-flex justify-content-between align-items-center">
        <h2 className="medium_font font_size_24">
          {" "}
          Add Faculty To Power Classes{" "}
        </h2>
      </div>
      <div className="add_faculty_content_div mt-4">
        <AddFacultyCard
          classes={classes}
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          tutor={tutor}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Page;
