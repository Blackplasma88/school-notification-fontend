import { createRouter, createWebHistory } from "vue-router";

import Information from "@/views/information/Information.vue";
import Location from "@/views/location/Location.vue";
import Subject from "@/views/subject/Subject.vue";
import Profile from "@/views/profiles/Profile.vue";
import Class from "@/views/class/Class.vue";
import Course from "@/views/course/Course.vue";
import Login from "@/views/login/Login.vue";
import Score from "@/views/score/Score.vue";
import CheckName from "@/views/check-name/CheckName.vue";
import Summary from "@/views/summary/Summary.vue";
import SchoolManage from "@/views/school-mange/SchoolManage.vue";

import informationCreate from "@/views/information/Create.vue";
import informationRead from "@/views/information/Read.vue";
import informationUpdate from "@/views/information/Update.vue";

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
      path: "/courses",
      name: "Courses",
      component: Course,
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
  ],
});

export default router;
