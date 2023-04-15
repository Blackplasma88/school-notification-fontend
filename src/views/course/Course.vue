<template>
  <main id="course-page">
    <h1>Course</h1>
    <CourseAdmin></CourseAdmin>
  </main>
</template>

<script>
import CourseAdmin from "@/components/course/CourseAdmin.vue";
export default {
  name: "Course",
  components: {
    CourseAdmin,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
}
</script>

<style>

</style>