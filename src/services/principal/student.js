import { base_url } from "@/bootapi";
import axios from "axios";

export const fetchClasses = async (id, token) => {
  let response = await axios.get(`${base_url}/principal/classes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const fetchAllStudents = async (id, token) => {
  let response = await axios.get(
    `${base_url}/principal/students?school_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const fetchAllStudentsByClass = async (id, token, page) => {
  let response = await axios.get(
    `${base_url}/principal/students/class/${id}?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const addStudent = async (data, token) => {
  let response = await axios.post(`${base_url}/principal/students`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return response;
};
