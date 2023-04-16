<template>
  <div class="w-100">
    <Navbar /> 
    <div class="d-flex w-100">
      <Sidebar />
      <div class="w-100 px-5" style="padding-top:5%;">
        <h1>Information</h1>
        <InformationForm />
      </div>
    </div>
   </div>
  <ReadStudentProfile />
</template>

<script>
import Navbar from "@/components/main/Navbar.vue";
import Sidebar from "@/components/main/Sidebar.vue";
import axios from "axios";
import ReadStudentProfile from "@/components/profile/student/ReadStudentProfile.vue";
export default {
  name: "Read",
  components: {
    ReadStudentProfile,
    Navbar,
    Sidebar,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
    axios.defaults.headers = {
        Authorization:localStorage.getItem("token"),
    }
  },
};
</script>

<style></style>
