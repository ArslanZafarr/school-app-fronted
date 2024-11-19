import { base_url } from "@/bootapi";
import axios from "axios";

export const fetchAllPowerClass = async (page, token) => {
  let response = await axios.get(
    `${base_url}/admin/power-classes/classes?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const createPowerClass = async (formdata, token) => {
  let response = await axios.post(
    `${base_url}/admin/power-classes/classes`,
    formdata,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const updatePowerClass = async (formdata, id, token) => {
  let response = await axios.put(
    `${base_url}/admin/power-classes/classes/${id}`,
    formdata,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const deletePowerClass = async (id, token) => {
  let response = await axios.delete(
    `${base_url}/admin/power-classes/classes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const fetchStudentApplication = async (page, token) => {
  let response = await axios.get(
    `${base_url}/admin/power-classes/student-applications?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updateStatus = async (id, formdata, token) => {
  let response = await axios.put(
    `${base_url}/admin/power-classes/student-applications/${id}/action`,
    formdata,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const getPowerClassNotAssigned = async (
  token,
  status = "not_assigned"
) => {
  let response = await axios.get(`${base_url}/admin/power-classes/classes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const fethTutor = async (token) => {
  let response = await axios.get(`${base_url}/admin/power-classes/tutors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const addFaculty = async (data, token) => {
  let response = await axios.post(
    `${base_url}/admin/power-classes/classes/assign-faculty`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const getPowerClassAssigned = async (
  currentpage,
  token,
  status = "assigned"
) => {
  let response = await axios.get(
    `${base_url}/admin/power-classes/classes?status=${status}&page=${currentpage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const fetchPayments = async (date, currentpage, token) => {
  let response = await axios.get(
    `${base_url}/admin/payments/${date}?page=${currentpage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updatepaymentstatus = async (status, id, token) => {
  let formdata = new FormData();
  formdata.append("status", status);
  let response = await axios.put(`${base_url}/admin/payments/${id}`, formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const fetchRecentContent = async (token) => {
  let res = await axios.get(`${base_url}/admin/homepage/recent-content`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchRecentClass = async (token) => {
  let res = await axios.get(`${base_url}/admin/homepage/recent-power-classes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchContentMaterial = async (page, token) => {
  let res = await axios.get(`${base_url}/admin/content-upload?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchContentMaterialDetail = async (id, token) => {
  let res = await axios.get(`${base_url}/admin/content-upload/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const deleteContentUpload = async (id, token) => {
  let res = await axios.delete(
    `${base_url}/admin/content-upload/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchAllPowerTutor = async (page, token) => {
  let res = await axios.get(
    `${base_url}/admin/power-classes/tutors?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const updateTutor = async (id, data, token) => {
  let res = await axios.put(
    `${base_url}/admin/power-classes/tutors/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    }
  );
  return res;
};

export const addTutor = async (data, token) => {
  let res = await axios.post(`${base_url}/admin/power-classes/tutors`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const deleteTutor = async (id, token) => {
  let res = await axios.delete(`${base_url}/admin/power-classes/tutors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchAllPowerSubject = async (page, token) => {
  let res = await axios.get(
    `${base_url}/admin/power-classes/subjects?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const updatePowerSubject = async (id, data, token) => {
  let res = await axios.put(
    `${base_url}/admin/power-classes/subjects/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    }
  );
  return res;
};

export const addPowerSubject = async (data, token) => {
  let res = await axios.post(`${base_url}/admin/power-classes/subjects`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const deletePowerSubject = async (id, token) => {
  let res = await axios.delete(
    `${base_url}/admin/power-classes/subjects/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchPowerSubjectbyGrade = async (grade, token) => {
  let res = await axios.get(
    `${base_url}/admin/power-classes/subjects/default?class_grade=${grade}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};
