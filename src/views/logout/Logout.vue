<template>
  <main>
  </main>
</template>

<script>

export default {
  name: "Logout",
  mounted(){
    localStorage.clear()
    this.$router.push("/login");
  }
};
</script>

<style></style>
