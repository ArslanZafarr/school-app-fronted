import { base_url } from "@/bootapi";
import axios from "axios";

export const fetchTutorPowerClass = async (id, token) => {
  let res = await axios.get(
    `${base_url}/tutor/power-classes/classes?tutor_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchTutorUpcomingClass = async (id, page, token) => {
  let res = await axios.get(
    `${base_url}/tutor/power-classes/upcoming-class/${id}?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};
