<template>
  <div class="w-100">
    <Navbar /> 
    <div class="d-flex w-100">
      <Sidebar />
      <div class="w-100 px-5" style="padding-top:5%;">
        <ProfileForm />
      </div>
    </div>
   </div>
 
</template>

<script>
import Navbar from "@/components/main/Navbar.vue";
import Sidebar from "@/components/main/Sidebar.vue";
import axios from "axios";
import ProfileForm from "@/components/profile/ProfileForm.vue";
export default {
  name: "Profile",
  components: {
    ProfileForm,
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
