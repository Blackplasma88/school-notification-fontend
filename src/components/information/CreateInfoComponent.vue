<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="name">Name :</label>
      <input
        type="text"
        class="form-control"
        id="name"
        placeholder="Type Name"
        v-model.trim="informations.name"
      />
    </div>
    <div class="form-control">
      <label for="description">Description :</label>
      <input
        type="text"
        class="form-control"
        id="description"
        placeholder="Type description"
        v-model.trim="informations.description"
      />
    </div>
    <div class="form-control">
      <label for="select"> Category :</label>
      <select
        class="form-select"
        aria-label="Select"
        name="category"
        id="category"
        v-model="informations.category"
      >
        <option selected disabled>select</option>
        <option value="news">News</option>
        <option value="announce">Announce</option>
        <option value="activity">Activity</option>
      </select>
    </div>

    <div class="form-control">
      <label for="formFileSm" class="form-label">Image :</label>
      <input class="form-control form-control-sm" id="image" type="file" />
    </div>
    <div class="form-control">
      <label for="content">Content :</label>
      <textarea
        class="form-control"
        aria-label="With textarea"
        id="content"
        placeholder="Type content"
        v-model="informations.content"
      ></textarea>
    </div>

    <div class="form-control">
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
export default {
  name: "Create",
  components: {},
  data() {
    return {
      informations: {
        name: "",
        description: "",
        category: "",
        image: "",
        content: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log("submitForm");
      console.log("create", this.informations);
      this.$emit("create", this.informations);
      this.$router.push("/");
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
      this.employee.name = "";
      this.employee.salary = "";
      this.employee.department = "";
      this.employee.gender = "";
      this.employee.skill = [];
    },
  },
};
</script>

<style>
.create {
  display: flex;
  flex-direction: column;
  align-items: left !important;
  justify-content: center;
  margin: 2rem auto;
  width: 80%;
  height: 90%;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
}

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
