<template>
  <div class="info-detail">
    <h2>Information Details</h2>

    <div class="info-w-i" v-if="information.filepath">
      <div class="d-flex">
        <img
          v-bind:src="'http://127.0.0.1:8080' + information.filepath"
          width="400"
        />
        <div class="info-cate-i">
          <p>Create at : {{ information.created_at }}</p>
          <p>Update at : {{ information.updated_at }}</p>
          <p>Category : {{ information.category }}</p>
        </div>
      </div>
      <div class="info-name-i">
        <h2>
          {{ information.name }}
        </h2>
        <p>Description: {{ information.description }}</p>

        <p>Content: {{ information.content }}</p>
      </div>
    </div>
    <div class="info" v-else>
      <div class="info-name">
        <h2>
          {{ information.name }}
        </h2>
      </div>
      <div class="info-data">
        <p>Category : {{ information.category }}</p>
        <p>Create at : {{ information.created_at }}</p>
        <p>Update at : {{ information.updated_at }}</p>
        <p>Description: {{ information.description }}</p>
        <p>Content: {{ information.content }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      information: [],
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8080/information/id?id=" + this.$route.params.id)
      .then((response) => {
        console.log("information_id", this.$route.params.id);
        console.log("information");
        console.log(response.data.data.information);
        this.information = response.data.data.information;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.info-detail {
  display: flex;
  flex-direction: column;
  margin: 2rem;
}
.info-w-i {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}
.info-cate-i {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  justify-content: center;
}
.info-name-i {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  justify-content: center;
}

.info {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}
.info-name {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  justify-content: center;
}
.info-data {
  display: flex;
  flex-direction: column;
  margin: 2rem 0 2rem 2rem;
  justify-content: center;
}
</style>
