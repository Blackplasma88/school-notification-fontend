<template>
  <main>
    <ProfileForm />
  </main>
</template>

<script>
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
  },
};
</script>

<style></style>
