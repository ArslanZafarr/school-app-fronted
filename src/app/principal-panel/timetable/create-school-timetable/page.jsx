"use client";
import CreateSchoolTimetableTabs from "@/app/components/Tabs/school-timetable-page/CreateSchoolTimetableTabs";
import "./create-school-timetable.css";
import { useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import {
  createTimeTable,
  fetchSubjectbyClassId,
} from "@/services/principal/dashboard";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { base_url } from "@/bootapi";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const initialFormData = {
    class_id: searchParams.get("id"),
    // subject_id: "",
    start_time: "",
    // end_time: "",
    no_of_hours: "",
    // image: "",
  };
  const [errors, setErrors] = useState({});
  const [subjects, setsubjects] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const { apiToken, userData } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    console.log("29", userData);
    if (searchParams.get("id")) {
      getSubjects();
    }
  }, []);
  const getSubjects = async () => {
    try {
      let res = await fetchSubjectbyClassId(searchParams.get("id"), apiToken);
      setsubjects(res.data.subjects);
    } catch (e) {
      setsubjects([]);
    }
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "class_id") {
    }
  };
  const handleFiles = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.files[0],
    });
  };
  const validateForm = () => {
    let tempErrors = {};

    if (!formData.class_id) tempErrors.class_id = "Class is required";
    // if (!formData.subject_id) tempErrors.subject_id = "Subject is required";
    if (!formData.start_time) tempErrors.start_time = "Start Time is required";
    // if (!formData.end_time) tempErrors.end_time = "End Time is required";
    if (!formData.no_of_hours) tempErrors.no_of_hours = "Hours is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subjects.length === 0) {
      toast.error("Add and Save a subject to continue");
      return;
    }
    if (validateForm()) {
      setisLoading(true);
      const formPayload = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          formPayload.append(key, formData[key]);
        }
      }
      try {
        const response = await createTimeTable(formPayload, apiToken);
        console.log("73", response);
        if (response.data.success) {
          toast.success(response.data.message);
          setFormData(initialFormData);
          setErrors({});
        } else {
          toast.error(response.data.message);
        }
        setisLoading(false);
      } catch (error) {
        setisLoading(false);
        const message = error.response?.data?.message || "Invalid data";
        toast.error(message);
        console.log(error);
      }
    }
  };
  const createsubject = (val) => {
    if (!val) {
      toast.error("Enter Subject to Continue");
      return;
    }
    let formdata = new FormData();
    formdata.append("class_id", Number(searchParams.get("id")));
    formdata.append("subject_name", val);

    setisLoading(true);
    axios
      .post(`${base_url}/principal/subjects`, formdata, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          getSubjects();
        } else {
          toast.error(res.data.message);
        }

        setisLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something Went Wrong");
        setisLoading(false);
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
  return (
    <div className="padding tablet_padding">
      <h3 className="medium_font font_size_24">Create Timetable</h3>
      <div className="create_school_timetable_div">
        <CreateSchoolTimetableTabs
          handleChange={handleChange}
          formData={formData}
          errors={errors}
          handleSubmit={handleSubmit}
          subjects={subjects}
          handleFiles={handleFiles}
          createsubject={createsubject}
        />
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
