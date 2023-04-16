<template>
  <div>
    <h2>Profile</h2>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {};
  },
  mounted() {
    
    localStorage.getItem("token")
  },
};
</script>

<style></style>
