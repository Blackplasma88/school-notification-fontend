<template>
  <CardInfo v-if="filepath">
    <template v-slot:card-image>
      <button class="card-button" @click="viewdata">
        <img v-bind:src="'http://127.0.0.1:8080' + filepath" width="200" />
      </button>
    </template>
    <template v-slot:card-header>
      <button class="card-button" @click="viewdata">
        <h3>{{ name }}</h3>
        <p>{{ description }}</p>
        <p>{{ category }}</p>
      </button>
    </template>
    <template v-slot:card-content>
      <div class="content">
        <p>Create : {{ created_at }}</p>
        &nbsp; &nbsp;
        <p>Name: Admin</p>
      </div>
    </template>
  </CardInfo>
  <CardInfo v-else>
    <template v-slot:card-header>
      <button class="card-button" @click="viewdata">
        <h3>{{ name }}</h3>
        <p>{{ description }}</p>
        <p>{{ category }}</p>
      </button>
    </template>
    <template v-slot:card-content>
      <div class="content">
        <p>Create : {{ created_at }}</p>
        &nbsp;
        <p>by</p>
        &nbsp;
        <p>Name: Admin</p>
      </div>
    </template>
  </CardInfo>
</template>

<script>
import CardInfo from "@/components/information/CardInfo.vue";
export default {
  name: "InformationData",
  components: {
    CardInfo,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
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
    filepath: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    created_at: {
      type: String,
      required: true,
    },
    updated_at: {
      type: String,
      required: true,
    },
  },
  methods: {
    viewdata() {
      console.log("viewdata");
      console.log(this.id);
      this.$router.push("/information/" + this.id + "");
    },
  },
};
</script>

<style>
.content {
  display: flex;
}
.card-button {
  background-color: transparent;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-align: left;
}
</style>
