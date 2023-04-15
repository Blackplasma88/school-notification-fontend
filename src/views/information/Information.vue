<template>
  <main class="information-page">
    <h1>Information</h1>
    <InformationForm />
  </main>
</template>

<script>
import InformationForm from "@/components/information/InformationForm";
export default {
  name: "Information",
  components: {
    InformationForm,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
