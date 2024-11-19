import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthApi } from "./features/auth/authApi";
import authSlice from "./features/auth/authSlice";
// 'Admin-Panel'
import { ProfileApi } from "./features/admin-panel/profile/profileApi";
import { schoolManagementApi } from "./features/admin-panel/school-management/schoolManagementApi";
// 'Principal-Panel'
import { PrincipalProfileApi } from "./features/principal-panel/profile/profileApi";
import { TeachersApi } from "./features/principal-panel/teachers/TeachersApi";
import { StudentsApi } from "./features/principal-panel/students/StudentsApi";
import { ClassesApi } from "./features/principal-panel/classes/ClassesApi";
import { TeacherProfileApi } from "./features/teacher-panel/profile/profileApi";
import { TutorProfileApi } from "./features/tutor-panel/profile/profileApi";

export const store = configureStore({
  reducer: {
    storeAuth: authSlice,
    [AuthApi.reducerPath]: AuthApi.reducer,
    // 'Admin-Panel'
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [schoolManagementApi.reducerPath]: schoolManagementApi.reducer,
    // 'Principal-Panel'
    [PrincipalProfileApi.reducerPath]: PrincipalProfileApi.reducer,
    [TeachersApi.reducerPath]: TeachersApi.reducer,
    [StudentsApi.reducerPath]: StudentsApi.reducer,
    [ClassesApi.reducerPath]: ClassesApi.reducer,
    // 'Teacher-Panel'
    [TeacherProfileApi.reducerPath]: TeacherProfileApi.reducer,
    // 'Tutor-Panel'
    [TutorProfileApi.reducerPath]: TutorProfileApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(ProfileApi.middleware)
      .concat(schoolManagementApi.middleware)
      .concat(PrincipalProfileApi.middleware)
      .concat(TeachersApi.middleware)
      .concat(StudentsApi.middleware)
      .concat(ClassesApi.middleware)
      .concat(TeacherProfileApi.middleware)
      .concat(TutorProfileApi.middleware),
});

setupListeners(store.dispatch);
