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
};
</script>

<style></style>
