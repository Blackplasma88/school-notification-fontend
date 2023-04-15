<template>
  <main id="create-page">
    <h1>New Information</h1>
    <CreateInfoComponent />
  </main>
</template>

<script>
import CreateInfoComponent from '@/components/information/CreateInfoComponent.vue';
export default {
  name: "Create",
  components: {
    CreateInfoComponent
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
