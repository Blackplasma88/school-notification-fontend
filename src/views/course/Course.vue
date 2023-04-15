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
}
</script>

<style>

</style>