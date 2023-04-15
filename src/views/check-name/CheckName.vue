<template>
  <main id="check-name-page">
    <h1>Check Name</h1>
    <CheckNamaManage></CheckNamaManage>
  </main>
</template>

<script>
import CheckNamaManage from "@/components/check-name/CheckNamaManage.vue";
export default {
  name: "CheckNama",
  components: {
    CheckNamaManage,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
}
</script>

<style>

</style>