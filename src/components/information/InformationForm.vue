<template>
  <section>
    <div class="filter">
      <div class="search-wrapper">
        <input type="text" class="form-control" placeholder="Search" />
      </div>
      <div class="filter">
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="category"
            id="category"
          >
            <option selected disabled>Filter</option>
            <option value="news">News</option>
            <option value="announce">Announce</option>
            <option value="activity">Activity</option>
          </select>
        </div>
        &nbsp;
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="category"
            id="category"
          >
            <option selected disabled>Sort by</option>
            <option value="news">News</option>
            <option value="announce">Announce</option>
            <option value="activity">Activity</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="this.role == 'admin'" class="rightContent">
      <button type="button" class="btn btn-secondary" @click="createInfo">
        Create
      </button>
    </div>

    <ListInfoData />
  </section>
</template>

<script>
import ListInfoData from "@/components/information/ListInfoData.vue";
export default {
  name: "InformationForm",
  data() {
    return {
      user_id: "",
      role: "",
      profile_id: "",
    };
  },
  components: {
    ListInfoData,
  },
  methods: {
    createInfo() {
      console.log("createInfo");
      this.$router.push("/information/create");
    },
  },
  created() {
    // this.user_id = localStorage.getItem("user_id");
    this.role = localStorage.getItem("role");
    // this.profile_id = localStorage.getItem("profile_id");
  },
};
</script>

<style>
.filter {
  display: flex;
  justify-content: space-between;
  align-items: right;
  margin-bottom: 0.5rem;
}

.rightContent {
  display: flex;
  justify-content: right;
}
</style>
