<template>
  <div>
    <h3>Name :{{ name }}</h3>
    <h3>Description :{{ description }}</h3>
    <h3>Category :{{ category }}</h3>
  </div>
</template>

<script>
export default {
  name: "InformationData",
  components: {},
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      //   required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
