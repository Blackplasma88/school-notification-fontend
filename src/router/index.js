import { createRouter, createWebHistory } from "vue-router";

import Information from "@/views/Information.vue";
import Location from "@/views/Location.vue";
import Subject from "@/views/Subject.vue";
import Profile from "@/views/Profile.vue";
import Class from "@/views/Class.vue";
import Course from "@/views/Course.vue";
import Login from "@/views/Login.vue";
import CheckName from "@/views/CheckName.vue";
import Score from "@/views/Score.vue";

import informationCreate from "@/views/information/Create.vue";
import locationCreate from "@/views/location/Create.vue";

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
      path: "/locations",
      name: "Locations",
      component: Location,
    },
    {
      path: "/location/create",
      name: "LocationCreate",
      component: locationCreate,
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
      path: "/check-names",
      name: "CheckNames",
      component: CheckName,
    },
    {
      path: "/scores",
      name: "Scores",
      component: Score,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

export default router;
