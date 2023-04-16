<template>
  <main id="update-page">
    <UpdateInfoComponent />
  </main>
</template>
<script>
import axios from "axios";
import UpdateInfoComponent from "@/components/information/UpdateInfoComponent.vue";
export default {
  name: "Update",
  components: {
    UpdateInfoComponent,
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
