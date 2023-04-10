<template>
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

      <button type="button" class="btn btn-success" @click="CreateInfo">
        Confirm
      </button>
      &nbsp;
      <button type="button" class="btn btn-danger" @click="cancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "Create",
  components: {},
  data() {
    return {
      information: {
        name: "",
        description: "",
        category: "",
        file: "",
        content: "",
      },
    };
  },
  methods: {
    async submitForm() {
      console.log("submitForm");
      console.log("create", this.information);

      const formData = new FormData();
      formData.append("name", this.information.name);
      formData.append("description", this.information.description);
      formData.append("category", this.information.category);
      formData.append("file", this.file);
      formData.append("content", this.information.content);
      console.log("formData", formData);

      try {
        await axios
          .post("http://127.0.0.1:8080/information/create", formData)
          .then((response) => {
            console.log("response", response);
            this.$router.push("/");
            this.$swal("Success", "Create Information Success", "success");
          });
      } catch (error) {
        console.log("error", error);
        this.$swal("Error", "Please try again", "error");
      }
    },
    CreateInfo() {
      console.log("Create");
      this.submitForm();
    },
    cancel() {
      console.log("cancel");
      this.$router.push("/");
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
.buttongroup {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}
</style>
