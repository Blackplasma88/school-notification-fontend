<template>
  <main id="update-page">
    <UpdateInfoComponent />
  </main>
</template>
<script>
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
  },
};
</script>
<style></style>
