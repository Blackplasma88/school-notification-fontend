<template>
  <main id="student-profile-page">
    <StudentProfileForm />
  </main>
</template>

<script>
import StudentProfileForm from "@/components/profile/student/StudentProfileForm.vue";
export default {
  name: "StudentProfile",
  components: {
    StudentProfileForm,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
