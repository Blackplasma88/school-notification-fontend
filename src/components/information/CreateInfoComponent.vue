<template>
  <form class="create">
    <div class="input">
      <label for="name">Name :</label>
      <input
        type="text"
        class="form-control"
        id="name"
        placeholder="Type Name"
      />
    </div>
    <div class="input">
      <label for="description">Description :</label>
      <input
        type="text"
        class="form-control"
        id="description"
        placeholder="Type description"
      />
    </div>
    <div class="select">
      <label for="select"> Category :</label>
      <select
        class="form-select"
        aria-label="Select"
        name="category"
        id="category"
      >
        <option selected disabled>select</option>
        <option value="news">News</option>
        <option value="announce">Announce</option>
        <option value="activity">Activity</option>
      </select>
    </div>

    <div>
      <label for="formFileSm" class="form-label">Image :</label>
      <input class="form-control form-control-sm" id="image" type="file" />
    </div>
    <div>
      <label for="content">Content :</label>
      <textarea
        class="form-control"
        aria-label="With textarea"
        id="content"
        placeholder="Type content"
      ></textarea>
    </div>

    <div class="buttongroup">
      <button type="button" class="btn btn-success" @click="create">Confirm</button> &nbsp;
      <button type="button" class="btn btn-danger">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Create",
  components: {},
  data() {
    return {};
  },
  methods: {
    create() {
        console.log("create");
    }
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
