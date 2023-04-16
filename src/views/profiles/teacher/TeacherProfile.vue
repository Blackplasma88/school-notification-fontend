<template>
  <main id="teacher-profile-page">
    <TeacherProfileForm />
  </main>
</template>

<script>
import axios from "axios";
import TeacherProfileForm from "@/components/profile/teacher/TeacherProfileForm.vue";
export default {
  name: "TeacherProfile",
  components: {
    TeacherProfileForm,
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
