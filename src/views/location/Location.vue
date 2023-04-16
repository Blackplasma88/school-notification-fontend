<template>
  <main id="location-page">
    <h1>Location</h1>
    <LocationForm />
  </main>
</template>

<script>
import axios from "axios";
import LocationForm from "@/components/location/LocationForm.vue";
export default {
  components: {
    LocationForm,
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
