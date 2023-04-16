<template>
  <main id="parent-profile-read-page">
    <ReadParentProfile />
  </main>
</template>

<script>
import axios from "axios";
import ReadParentProfile from "@/components/profile/parent/ReadParentProfile.vue";
export default {
  name: "Read",
  components: {
    ReadParentProfile,
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
