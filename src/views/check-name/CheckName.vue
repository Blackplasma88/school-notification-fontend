<template>
  <main id="check-name-page">
    <h1>Check Name</h1>
    <CheckNamaManage></CheckNamaManage>
  </main>
</template>

<script>
import axios from "axios";
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
    axios.defaults.headers = {
            Authorization:localStorage.getItem("token"),
    }
  },
}
</script>

<style>

</style>