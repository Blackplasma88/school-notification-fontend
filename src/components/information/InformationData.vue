<template>
  <CardInfo>
    <template v-slot:card-header>
      <div>
        <h3>{{ name }}</h3>
        <p>{{ description }}</p>
        <p>{{ category }}</p>
      </div>
    </template>
    <template v-slot:card-content>
      <div class="content">
        <p>create at</p>
        <p>by</p>
        <p>username</p>
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
    },
    content: {
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
