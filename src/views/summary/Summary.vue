<template>
  <main id="summary-page">
    <h1>Summary</h1>
    <SummaryView></SummaryView>
  </main>
</template>

<script>
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
  },
}
</script>

<style>

</style>