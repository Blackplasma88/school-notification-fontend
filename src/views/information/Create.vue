<template>
  <main id="create-page">
    <h1>New Information</h1>
    <CreateInfoComponent />
  </main>
</template>

<script>
import CreateInfoComponent from '@/components/information/CreateInfoComponent.vue';
export default {
  name: "Create",
  components: {
    CreateInfoComponent
  },
};
</script>

<style></style>
