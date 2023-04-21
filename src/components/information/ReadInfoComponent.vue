<template>
  <div class="info-detail">
    <div class="card-info-detail">
      <div class="info-w-i" v-if="information.filepath">
        <div class="info-head" v-if="role === 'admin'">
          <button type="button" class="btn btn-secondary" @click="editInfo">
            Edit
          </button>
        </div>
        <div class="d-flex justify-content-center">
          <img
            v-bind:src="'http://127.0.0.1:8080' + information.filepath"
            width="400"
          />
          <div class="info-cate-i">
            <p>Create at : {{ format_date(information.created_at) }}</p>
            <p>Update at : {{ format_date(information.updated_at) }}</p>
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
        <div class="info-head">
          <button type="button" class="btn btn-secondary" @click="editInfo">
            Edit
          </button>
        </div>
        <div class="info-name">
          <h2>
            {{ information.name }}
          </h2>
        </div>
        <div class="info-data">
          <p>Category : {{ information.category }}</p>
          <p>Create at : {{ format_date(information.created_at) }}</p>
          <p>Update at : {{ format_date(information.updated_at) }}</p>
          <p>Description: {{ information.description }}</p>
          <p>Content: {{ information.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  name: "ReadInfoComponent",
  data() {
    return {
      information: [],
      role :""
    };
  },
  methods: {
    editInfo() {
      console.log("editInfo");
      console.log(this.$route.params.id);
      this.$router.push("/information/update/" + this.$route.params.id);
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
  async created() {
    this.role = localStorage.getItem("role");
    await axios
      .get("http://127.0.0.1:8080/information/id?id=" + this.$route.params.id)
      .then((response) => {
        console.log("information_id", this.$route.params.id);
        console.log("information");
        console.log(response.data.data.information);
        this.information = response.data.data.information;
      })
      .catch((error) => {
        this.$swal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log(error.response.data.message);
      });
  },
};
</script>
<style scoped>
.info-head {
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin: 2rem;
}
.card-info-detail {
  background-color: #f5f5f5;
  border-radius: 10px;
  align-content: center;
}
.info-detail {
  display: flex;
  flex-direction: column;
  margin: 2rem;
}
.info-w-i {
  display: flex;
  flex-direction: column;
  margin: 2rem;
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
