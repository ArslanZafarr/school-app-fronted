// import TeacherPanelWidget from '../components/Widgets/TeacherPanelWidget'
// import TotalStudentsWidget from '../components/Widgets/TotalStudentsWidget'
// import TeacherPanelUpcomingClasses from '../components/Widgets/TeacherPanelUpcomingClassesWidget'
"use client";
import TeacherPanelUpcomingClassesWidget from "@/app/components/Widgets/TeacherPanelUpcomingClassesWidget";
import TeacherPanelWidget from "@/app/components/Widgets/TeacherPanelWidget";
import TotalStudentsWidget from "@/app/components/Widgets/TotalStudentsWidget";
import { setTeacherDataFromApi } from "@/redux/features/auth/authSlice";
import { store } from "@/redux/store";
import {
  fetchClassStudentStat,
  fetchdashboardUpcomingClass,
  fetchTeacherProfile,
  fetchTeacherStatistics,
  fetchTodayActivity,
} from "@/services/teacher/teacherApiService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [activity, setactivity] = useState({});
  const [classes, setclasses] = useState([]);
  const [upcomingclasses, setupcomingclasses] = useState([]);
  const { apiToken, teacherProfile } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getTeacherProfile();
  }, []);
  useEffect(() => {
    console.log("24", teacherProfile);
    if (teacherProfile?.["teacher_profile"]) {
      getActivity();
      getStudentStat();
      getUpcomingClass();
    }
  }, [teacherProfile]);
  const getTeacherProfile = async () => {
    if (apiToken) {
      try {
        let res = await fetchTeacherProfile(apiToken);
        if (res.data.success) {
          store.dispatch(setTeacherDataFromApi(res.data.user));
        }
      } catch (e) {
        console.log("25", e);
      }
    }
  };
  const getActivity = async () => {
    if (apiToken) {
      try {
        let res = await fetchTodayActivity(
          teacherProfile?.["teacher_profile"]["id"],
          apiToken
        );
        setactivity(res.data.data);
      } catch (e) {
        setactivity({});
      }
    }
  };
  const getStudentStat = async () => {
    if (apiToken) {
      try {
        // ,
        let res = await fetchClassStudentStat(
          teacherProfile?.["teacher_profile"]["id"],
          apiToken
        );
        setclasses(res.data.classes);
      } catch (e) {
        setclasses([]);
      }
    }
  };
  const getUpcomingClass = async () => {
    if (apiToken) {
      try {
        let res = await fetchdashboardUpcomingClass(
          teacherProfile?.["teacher_profile"]["id"],
          apiToken
        );
        setupcomingclasses(res.data.upcoming_online_classes);
      } catch (e) {
        setupcomingclasses([]);
      }
    }
  };
  return (
    <div className="teacher_dashboard">
      <h3 className="medium_font font_size_24 ms-4 mb-3"> Dashboard </h3>
      <div className="widgets">
        <TeacherPanelWidget activity={activity} />
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-start">
        <TotalStudentsWidget classes={classes} />
        <TeacherPanelUpcomingClassesWidget classes={upcomingclasses} />
      </div>
    </div>
  );
};

export default Page;
