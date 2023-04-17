<template>
  <div class="info-detail">
    <div class="card-info-detail">
      <div class="info-w-i" v-if="information.filepath">
        <form @submit.prevent="submitForm">
          <div class="info-head">
            <div>
              <button type="button" class="btn btn-success" @click="CreateInfo">
                Confirm
              </button>
              &nbsp;
              <button type="button" class="btn btn-danger" @click="cancel">
                Cancel
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <img
              v-bind:src="'http://127.0.0.1:8080' + information.filepath"
              width="400"
            />
            <div class="info-cate-i">
              <label for="formFileSm" class="form-label">Image :</label>
              <input
                class="form-control form-control-sm"
                id="image"
                type="file"
                ref="file"
                @change="selectFile"
              />
              <label for="select"> Category :</label>
              <select
                class="form-select"
                aria-label="Select"
                name="category"
                id="category"
                v-model="information.category"
              >
                <option selected disabled>select</option>
                <option value="News">News</option>
                <option value="Announce">Announce</option>
                <option value="Activity">Activity</option>
              </select>
            </div>
          </div>

          <div class="info-name-i">
            <label for="name">Name :</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Type Name"
              v-model.trim="information.name"
            />
            <label for="description">Description :</label>
            <input
              type="text"
              class="form-control"
              id="description"
              placeholder="Type description"
              v-model.trim="information.description"
            />

            <label for="content">Content :</label>
            <textarea
              class="form-control"
              aria-label="With textarea"
              id="content"
              placeholder="Type content"
              v-model="information.content"
            ></textarea>
          </div>
        </form>
      </div>
      <div class="info" v-else>
        <form @submit.prevent="submitForm">
          <div class="form-control">
            <label for="name">Name :</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Type Name"
              v-model.trim="information.name"
            />

            <label for="description">Description :</label>
            <input
              type="text"
              class="form-control"
              id="description"
              placeholder="Type description"
              v-model.trim="information.description"
            />

            <label for="select"> Category :</label>
            <select
              class="form-select"
              aria-label="Select"
              name="category"
              id="category"
              v-model="information.category"
            >
              <option selected disabled>select</option>
              <option value="News">News</option>
              <option value="Announce">Announce</option>
              <option value="Activity">Activity</option>
            </select>

            <label for="formFileSm" class="form-label">Image :</label>
            <input
              class="form-control form-control-sm"
              id="image"
              type="file"
              ref="file"
              @change="selectFile"
            />

            <label for="content">Content :</label>
            <textarea
              class="form-control"
              aria-label="With textarea"
              id="content"
              placeholder="Type content"
              v-model="information.content"
            ></textarea>
            <div class="info-head">
              <div>
                <button
                  type="button"
                  class="btn btn-success"
                  @click="CreateInfo"
                >
                  Confirm
                </button>
                &nbsp;
                <button type="button" class="btn btn-danger" @click="cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UpdateInfoComponent",
  data() {
    return {
      information: {
        id: "",
        name: "",
        description: "",
        category: "",
        filepath: "",
        content: "",
      },
    };
  },

  async created() {
    await axios
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
  methods: {
    async submitForm() {
      console.log("submitForm");
      console.log("create", this.information);

      const formData = new FormData();
      formData.append("id", this.information.id);
      formData.append("name", this.information.name);
      formData.append("description", this.information.description);
      formData.append("category", this.information.category);
      formData.append("file", this.file);
      formData.append("content", this.information.content);
      console.log("formData", formData);

      try {
        await axios
          .post("http://127.0.0.1:8080/information/update", formData)
          .then((response) => {
            console.log("response", response);
            console.log("response.data", response.data);
            this.$router.push("/information/" + this.$route.params.id);
            this.$swal("Success", response.data.message, "success");
          });
      } catch (error) {
        console.log("error", error);
        this.$swal("Error", error.response.data.message, "error");
      }
    },
    CreateInfo() {
      console.log("Create");
      this.submitForm();
    },
    cancel() {
      console.log("cancel");
      this.$router.push("/information/" + this.$route.params.id);
      this.resetForm();
    },
    resetForm() {
      this.information.name = "";
      this.information.description = "";
      this.information.category = "";
      this.information.file = "";
      this.information.content = "";
    },

    selectFile(event) {
      console.log("event", event);
      this.file = this.$refs.file.files[0];
      console.log("file_name", this.file);
    },
  },
};
</script>
<style>
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
