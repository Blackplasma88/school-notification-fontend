<template>
  <div>
    <h2>List of Score</h2>
    {{ scores }}
    <div></div>
  </div>
</template>

<script>
export default {
  name: "ListScoreManage",
  props: {
    filterValue: String,
    filterOptions: String,
    scores: Array,
  },
};
</script>

<style></style>
