<template>
  <main id="location-page">
    <h1>Location</h1>
    <LocationForm />
  </main>
</template>

<script>
import LocationForm from "@/components/location/LocationForm.vue";
export default {
  components: {
    LocationForm,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
