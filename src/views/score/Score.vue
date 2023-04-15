<template>
  <main id="course-page">
    <h1>Manage Score</h1>
    <ScoreManage></ScoreManage>
  </main>
</template>

<script>
import ScoreManage from "@/components/score/ScoreManage.vue";
export default {
  name: "Score",
  components: {
    ScoreManage,
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