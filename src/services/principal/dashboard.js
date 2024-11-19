import { base_url } from "@/bootapi";
import axios from "axios";

export const fetchStatistics = async (id, token) => {
  console.log("5", id);
  let res = await axios.get(`${base_url}/principal/statistics/homepage/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchClasses = async (id, token) => {
  console.log("15", id);
  let res = await axios.get(`${base_url}/principal/classes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchStudent = async (id, token) => {
  console.log("15", id);
  let res = await axios.get(`${base_url}/principal/students?school_id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const createPTM = async (data, token) => {
  console.log("25", data);
  let res = await axios.post(
    `${base_url}/principal/meetings/parent-teacher-meeting`,
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

export const createPM = async (data, token) => {
  console.log("25", data);
  let res = await axios.post(
    `${base_url}/principal/meetings/personal-meeting`,
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

export const assignTimetable = async (data, token) => {
  console.log("25", data);
  let res = await axios.post(`${base_url}/principal/assign-timetable`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const fetchTeachers = async (id, token) => {
  let res = await axios.get(`${base_url}/principal/teachers?school_id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const editTeachers = async (id, data, token) => {
  let res = await axios.put(`${base_url}/principal/teachers/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const fetchTeacherDetail = async (id, token) => {
  let res = await axios.get(`${base_url}/principal/teachers/details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchFullTeachers = async (id, token) => {
  let res = await axios.get(
    `${base_url}/principal/teachers/default?school_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchTimeTable = async (id, token, page = 1) => {
  let res = await axios.get(
    `${base_url}/principal/timetables/all/${id}?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchFullTimeTable = async (id, token) => {
  let res = await axios.get(`${base_url}/principal/timetables/default/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchAssignedTimeTable = async (id, token) => {
  let res = await axios.get(
    `${base_url}/principal/timetables/${id}?status=assigned`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const createTimeTable = async (data, token) => {
  let res = await axios.post(`${base_url}/principal/timetables`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const createAnnouncement = async (data, token) => {
  let res = await axios.post(`${base_url}/principal/announcements`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const fetchSubjectbyClassId = async (id, token) => {
  let res = await axios.get(`${base_url}/principal/subjects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchPayment = async (id, page, token) => {
  let res = await axios.get(
    `${base_url}/principal/payments/${id}?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const updatepaymentstatus = async (id, data, token) => {
  let res = await axios.put(`${base_url}/principal/payments/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const teacherBulkUpload = async (data, token) => {
  let res = await axios.post(
    `${base_url}/principal/teachers/bulk-upload`,
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

export const fetchOnlineClasses = async (id, token) => {
  let res = await axios.get(
    `${base_url}/principal/statistics/homepage/classes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};
