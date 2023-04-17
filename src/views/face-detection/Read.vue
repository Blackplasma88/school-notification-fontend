<template>
  <div class="w-100">
    <Navbar />
    <div class="d-flex w-100">
      <Sidebar />
      <div class="w-100 px-5" style="padding-top: 5%">
        <ReadFaceDetected />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ReadFaceDetected from "@/components/face-detection/ReadFaceDetected.vue";
import Navbar from "@/components/main/Navbar.vue";
import Sidebar from "@/components/main/Sidebar.vue";

export default {
  name: "Read",
  components: {
    ReadFaceDetected,
    Navbar,
    Sidebar,
  },
  created() {
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
