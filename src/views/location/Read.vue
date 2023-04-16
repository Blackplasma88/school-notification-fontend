<template>
  <main id="location-read-page">
    <ReadLocationComponent />
  </main>
</template>

<script>
import axios from "axios";
import ReadLocationComponent from "@/components/location/ReadLocationComponent.vue";
export default {
  name: "Read",
  components: {
    ReadLocationComponent,
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
