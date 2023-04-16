<template>
  <main>
    <ProfileForm />
  </main>
</template>

<script>
import axios from "axios";
import ProfileForm from "@/components/profile/ProfileForm.vue";
export default {
  name: "Profile",
  components: {
    ProfileForm,
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
