<template>
  <main>
    <h1>Face Detection</h1>
    <FaceDetectionManage></FaceDetectionManage>
  </main>
</template>

<script>
import FaceDetectionManage from "@/components/face-detection/FaceDetectionManage.vue";
export default {
  name: "FaceDetection",
  components: {
    FaceDetectionManage,
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