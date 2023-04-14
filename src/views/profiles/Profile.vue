<template>
  <main>
    <h1>Profile</h1>
    <p>This is profile page</p>
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
};
</script>

<style></style>
