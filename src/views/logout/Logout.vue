<template>
  <div></div>
</template>

<script>
export default {
  name: "Logout",
  created() {
    localStorage.clear();
    this.$router.push("/");
  },
};
</script>

<style></style>
