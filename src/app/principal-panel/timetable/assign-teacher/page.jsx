"use client";
import Button from "@/app/components/Button";
import {
  assignTimetable,
  fetchFullTeachers,
  fetchFullTimeTable,
} from "@/services/principal/dashboard";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const initialFormData = {
    teacher_id: "",
    class_id: searchParams.get("id"),
    timetable_id: "",
  };
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [classes, setclasses] = useState([]);
  const [teachers, setteachers] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const { apiToken, userData } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getTeachers();
    getTimeTable();
  }, []);
  const getTeachers = async () => {
    try {
      let res = await fetchFullTeachers(
        userData?.["profile"]?.["role_profile"]?.["id"],
        apiToken
      );
      if (res.data.success) {
        setteachers(res.data.teachers);
      } else {
        setteachers([]);
      }
    } catch (e) {
      setteachers([]);
    }
  };
  const getTimeTable = async () => {
    try {
      let res = await fetchFullTimeTable(searchParams.get("id"), apiToken);
      if (res.data.success) {
        setclasses(res.data.timetables);
      } else {
        toast.error(res.data.message);
        setclasses([]);
      }
    } catch (e) {
      setclasses([]);
      toast.error("Create Timetable to Assign Teacher");
    }
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.teacher_id) tempErrors.teacher_id = "Teacher is required";
    if (!formData.timetable_id) tempErrors.timetable_id = "Subject is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setisLoading(true);
      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }
      try {
        const response = await assignTimetable(formPayload, apiToken);
        if (response.data.success) {
          toast.success(response.data.message);
          setFormData(initialFormData);
          setErrors({});
        } else if (response.data.open_url) {
          window.open(response.data.open_url, "_blank");
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
    <div>
      <div className="padding tablet_padding">
        <h3 className="medium_font font_size_24 heading_margin">
          Assign Teacher
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="assign_subject_div">
            <div className="assign_subject_card card_border rounded p-4 mt-4">
              <div>
                <label className="medium_font font_size_16 mb-2">
                  Add Teacher
                </label>
                <select
                  className="form-select form-select-lg mb-4"
                  aria-label=".form-select-lg example"
                  value={formData.teacher_id}
                  onChange={handleChange}
                  name="teacher_id"
                >
                  <option value="">Select teacher</option>
                  {teachers.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item?.profile?.full_name}
                    </option>
                  ))}
                </select>
                {errors.teacher_id && (
                  <span className="text-danger">{errors.teacher_id}</span>
                )}
              </div>
              {classes.length > 0 && (
                <div>
                  <label className="medium_font font_size_16 mb-2">
                    Add Subject
                  </label>
                  <select
                    className="form-select form-select-lg mb-4"
                    aria-label=".form-select-lg example"
                    value={formData.timetable_id}
                    onChange={handleChange}
                    name="timetable_id"
                  >
                    <option value="">Select Subject</option>
                    {classes.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.subject?.name}
                      </option>
                    ))}
                  </select>
                  {errors.timetable_id && (
                    <span className="text-danger">{errors.timetable_id}</span>
                  )}
                </div>
              )}

              <div className="btn_div">
                <Button text="Save" className="my-4" />
              </div>
            </div>
          </div>
        </form>
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
