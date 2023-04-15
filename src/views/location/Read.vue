<template>
  <main id="location-read-page">
    <ReadLocationComponent />
  </main>
</template>

<script>
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
  },
};
</script>

<style></style>
