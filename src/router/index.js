import { createRouter, createWebHistory } from "vue-router";

import Information from "@/views/information/Information.vue";
import Location from "@/views/location/Location.vue";
import Subject from "@/views/subject/Subject.vue";
import Profile from "@/views/profiles/Profile.vue";
import Class from "@/views/classData/Class.vue";
import Course from "@/views/course/Course.vue";
import Login from "@/views/login/Login.vue";
import Score from "@/views/score/Score.vue";
import CheckName from "@/views/check-name/CheckName.vue";
import Summary from "@/views/summary/Summary.vue";
import SchoolManage from "@/views/school-mange/SchoolManage.vue";

import informationCreate from "@/views/information/Create.vue";
import informationRead from "@/views/information/Read.vue";
import informationUpdate from "@/views/information/Update.vue";

import LocationRead from "@/views/location/Read.vue";
import ClassRead from "@/views/classData/Read.vue";

import SchoolData from "@/views/school-data/SchoolData.vue";
import FaceDetection from "@/views/face-detection/FaceDetection.vue";

import Chat from "@/views/chat/ChatView.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/profile/:id",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/",
      name: "Informations",
      component: Information,
    },
    {
      path: "/information/create",
      name: "InformationCreate",
      component: informationCreate,
    },
    {
      path: "/information/:id",
      name: "InformationRead",
      component: informationRead,
    },
    {
      path: "/information/update/:id",
      name: "InformationUpdate",
      component: informationUpdate,
    },
    {
      path: "/locations",
      name: "Locations",
      component: Location,
    },
    {
      path: "/location/:id",
      name: "LocationRead",
      component: LocationRead,
    },
    {
      path: "/subjects",
      name: "Subjects",
      component: Subject,
    },
    {
      path: "/profiles",
      name: "Profiles",
      component: Profile,
    },
    {
      path: "/classes",
      name: "Classes",
      component: Class,
    },
    {
      path: "/class/:id",
      name: "ClassRead",
      component: ClassRead,
    },
    {
      path: "/courses",
      name: "Courses",
      component: Course,
    },
    {
      path: "/school-data",
      name: "SchoolData",
      component: SchoolData,
    },
    {
      path: "/scores",
      name: "Scores",
      component: Score,
    },
    {
      path: "/check-names",
      name: "CheckNames",
      component: CheckName,
    },
    {
      path: "/summary",
      name: "Summary",
      component: Summary,
    },
    {
      path: "/school-manage",
      name: "SchoolManage",
      component: SchoolManage,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat,
    },
    {
      path: "/face-detection",
      name: "FaceDetection",
      component: FaceDetection,
    },
  ],
});

export default router;
