import { base_url } from "@/bootapi";
import axios from "axios";

export const uploadContent = async (body, token) => {
  let data = await axios.post(`${base_url}/admin/content-upload`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return data;
};

export const editContent = async (id, body, token) => {
  let data = await axios.put(`${base_url}/admin/content-upload/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return data;
};

export const fetchSchoolManagement = async (page, token) => {
  let res = await axios.get(`${base_url}/admin/schools?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const deleteSchoolUser = async (id, token) => {
  let res = await axios.delete(`${base_url}/admin/schools/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
