<template>
  <li>
    <div>
      <img
        src="https://img.freepik.com/free-photo/group-asian-diverse-people-volunteer-teamwork-environment-conservationvolunteer-help-picking-plastic-foam-garbage-park-areavolunteering-world-environment-day_640221-303.jpg?w=996&t=st=1680959403~exp=1680960003~hmac=6d528056d821b451012dcf6f9b57d8c78ec2b052f5ae6754911904676f306844"
        alt=""
      />
    </div>
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
img {
  width: 200px;
  height: 150px;
  border-radius: 5px;
}
</style>
