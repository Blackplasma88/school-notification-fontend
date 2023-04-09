<template>
  <li>
    <slot name="card-image"> </slot>
    &nbsp;
    <div>
      <slot name="card-header"> </slot>
      <slot name="card-content"> </slot>
    </div>
  </li>
</template>

<script>
export default {
  name: "CardInfo",
};
</script>

<style scoped>
li {
  list-style: none;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: left;
}

</style>
