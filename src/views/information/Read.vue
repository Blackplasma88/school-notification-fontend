<template>
  <main class="view-page">
    <ReadInfoComponent />
  </main>
</template>
<script>
import axios from "axios";
import ReadInfoComponent from "@/components/information/ReadInfoComponent.vue";
export default {
  name: "Read",
  components: {
    ReadInfoComponent,
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
