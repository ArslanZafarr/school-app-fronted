import { base_url } from "@/bootapi";
import axios from "axios";

export const fetchTeacherProfile = async (token) => {
  let res = await axios.get(`${base_url}/teacher/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchTeacherStatistics = async (token) => {
  let res = await axios.get(
    `${base_url}/teacher/statistics/class-students-stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchTeacherClasses = async (id, token) => {
  let res = await axios.get(`${base_url}/teacher/classes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchTeacherSubjectClasses = async (id, classid, token) => {
  let res = await axios.get(`${base_url}//teacher/subjects/${id}/${classid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const contentUpload = async (data, token) => {
  let res = await axios.post(`${base_url}/teacher/content-upload`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const editcontentUpload = async (id, data, token) => {
  let res = await axios.put(`${base_url}/teacher/content-upload/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const fetchTeacherTimetable = async (id, token) => {
  let res = await axios.get(`${base_url}/teacher/timetable/assigned/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchTeacherTimetableDetail = async (id, token) => {
  let res = await axios.get(`${base_url}/teacher/timetable/details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const addStudent = async (data, token) => {
  let res = await axios.post(`${base_url}/teacher/students`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const createAssignment = async (data, token) => {
  let res = await axios.post(`${base_url}/teacher/assignments`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const createquiz = async (data, token) => {
  let res = await axios.post(`${base_url}/teacher/quizzes`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const createannouncements = async (data, token) => {
  let res = await axios.post(`${base_url}/teacher/announcements`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const createFeedback = async (data, token) => {
  let res = await axios.post(`${base_url}/teacher/feedbacks`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const getAssignments = async (id, token) => {
  let res = await axios.get(`${base_url}/teacher/assignments?class_id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getQuizzes = async (id, token) => {
  let res = await axios.get(`${base_url}/teacher/quizzes?class_id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getSubjectClassId = async (id, classid, token) => {
  let res = await axios.get(`${base_url}/teacher/subjects/${id}/${classid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchTodayActivity = async (id, token) => {
  let res = await axios.get(
    `${base_url}/teacher/statistics/today-activity/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchClassStudentStat = async (id, token) => {
  let res = await axios.get(
    `${base_url}/teacher/statistics/class-students-stats/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchdashboardUpcomingClass = async (id, token) => {
  let res = await axios.get(
    `${base_url}/teacher/statistics/upcoming-classes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchAttendanceTracking = async (
  id,
  sub_id,
  date,
  page,
  token
) => {
  let res = await axios.get(
    `${base_url}/teacher/attendance?class_id=${id}&subject_id=${sub_id}&date=${date}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};
export const updateAttendanceTracking = async (data, token) => {
  let res = await axios.put(`${base_url}/teacher/attendance`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  return res;
};

export const fetchTeacherStudent = async (id, page, token) => {
  let res = await axios.get(`${base_url}/teacher/students/${id}?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchAverageGrade = async (id, token) => {
  let res = await axios.get(
    `${base_url}/teacher/student-performance/average-grade/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchAverageAttendance = async (id, token) => {
  let res = await axios.get(
    `${base_url}/teacher/student-performance/attendance/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchClassContent = async (classid, schoolid, token) => {
  let res = await axios.get(
    `${base_url}/teacher/content-upload/class?class=${classid}&school_id=${schoolid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchParticularClassContent = async (id, token) => {
  let res = await axios.get(`${base_url}/teacher/content-upload/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
