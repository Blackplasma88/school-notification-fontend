<template>
  <CardInfo v-if="filepath">
    <template v-slot:card-image>
      <img v-bind:src="'http://127.0.0.1:8080' + filepath" width="200" />
    </template>
    <template v-slot:card-header>
      <div>
        <h3>{{ name }}</h3>
        <p>{{ description }}</p>
        <p>{{ category }}</p>
      </div>
    </template>
    <template v-slot:card-content>
      <div class="content">
        <p>Create : {{ created_at }}</p>
        &nbsp;
        <p>by</p>
        &nbsp;
        <p>Name: {{ id }}</p>
      </div>
    </template>
  </CardInfo>
  <CardInfo v-else>
    <template v-slot:card-header>
      <div>
        <h3>{{ name }}</h3>
        <p>{{ description }}</p>
        <p>{{ category }}</p>
      </div>
    </template>
    <template v-slot:card-content>
      <div class="content">
        <p>Create : {{ created_at }}</p>
        &nbsp;
        <p>by</p>
        &nbsp;
        <p>Name: {{ id }}</p>
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
};
</script>

<style>
.content {
  display: flex;
}
</style>
