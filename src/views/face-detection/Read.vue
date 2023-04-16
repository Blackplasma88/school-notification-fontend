<template>
  <main id="face-read-page">
    <ReadFaceDetected />
  </main>
</template>

<script>
import axios from "axios";
import ReadFaceDetected from "@/components/face-detection/ReadFaceDetected.vue";
export default {
  name: "Read",
  components: {
    ReadFaceDetected,
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
