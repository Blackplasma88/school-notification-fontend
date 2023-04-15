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
}
</script>

<style>

</style>