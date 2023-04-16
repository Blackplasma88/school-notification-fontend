<template>
  <div></div>
</template>

<script>

export default {
  name: "Logout",
  mounted(){
    localStorage.clear()
    this.$router.push("/");
  }
};
</script>

<style></style>
