<template>
  <main>
    <h1>New Location</h1>
    <CreateLocationComponent />
  </main>
</template>

<script>
import CreateLocationComponent from "@/components/location/CreateLocationComponent.vue";
export default {
  name: "Create",
  components: {
    CreateLocationComponent,
  },
};
</script>

<style></style>
