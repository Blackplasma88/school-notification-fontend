<template>
  <main id="summary-page">
    <h1>Summary</h1>
    <SummaryView></SummaryView>
  </main>
</template>

<script>
import axios from "axios";
import SummaryView from "@/components/summary/SummaryView.vue";
export default {
  name: "CheckNama",
  components: {
    SummaryView,
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