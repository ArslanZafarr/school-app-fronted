import { base_url } from "@/bootapi";
import axios from "axios";

export const fetchAllFaqs = async (token, page) => {
  let response = await axios.get(`${base_url}/admin/faqs?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const addFaq = async (token, formdata) => {
  let response = await axios.post(`${base_url}/admin/faqs`, formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return response;
};

export const deleteFaq = async (token, id) => {
  let response = await axios.delete(`${base_url}/admin/faqs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const fetchAllFeedback = async (page, token) => {
  let response = await axios.get(`${base_url}/admin/feedbacks?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const fetchFeedbackDetails = async (id, token) => {
  let response = await axios.get(`${base_url}/admin/feedbacks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
