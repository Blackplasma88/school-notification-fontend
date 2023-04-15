<template>
  <main id="student-profile-read-page">
    <ReadStudentProfile />
  </main>
</template>

<script>
import ReadStudentProfile from "@/components/profile/student/ReadStudentProfile.vue";
export default {
  name: "Read",
  components: {
    ReadStudentProfile,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
