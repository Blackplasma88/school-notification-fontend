<template>
  <main id="class-read-page">
    <ReadClassComponent />
  </main>
</template>

<script>
import ReadClassComponent from "@/components/classdata/ReadClassComponent.vue";
export default {
  name: "Read",
  components: {
    ReadClassComponent,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
