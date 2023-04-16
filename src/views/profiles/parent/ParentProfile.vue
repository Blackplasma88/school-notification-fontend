<template>
  <main id="parent-profile-page">
    <ParentProfileForm />
  </main>
</template>

<script>
import axios from "axios";
import ParentProfileForm from "@/components/profile/parent/ParentProfileForm.vue";
export default {
  name: "ParentProfile",
  components: {
    ParentProfileForm,
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
