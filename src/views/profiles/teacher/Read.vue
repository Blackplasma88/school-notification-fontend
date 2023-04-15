<template>
  <main id="teacher-profile-read-page">
    <ReadTeacherProfile />
  </main>
</template>

<script>
import ReadTeacherProfile from "@/components/profile/teacher/ReadTeacherProfile.vue";
export default {
  name: "Read",
  components: {
    ReadTeacherProfile,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
