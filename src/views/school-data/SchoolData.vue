<template>
  <main id="course-page">
    <SchoolDataView></SchoolDataView>
  </main>
</template>

<script>
import axios from "axios";
import SchoolDataView from "@/components/school-data/SchoolDataView.vue";
export default {
  name: "SchoolData",
  components: {
    SchoolDataView,
  },
  mounted() {
    if (
      localStorage.getItem("token") == null ||
      localStorage.getItem("token") == undefined
    ) {
      this.$router.push("/login");
    }
    axios.defaults.headers = {
      Authorization: localStorage.getItem("token"),
    };
  },
};
</script>

<style></style>
