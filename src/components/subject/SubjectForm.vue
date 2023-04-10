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
    <div class="rightContent">
      <button type="button" class="btn btn-secondary" @click="createSubject">
        Create
      </button>
    </div>

    <ListSubjectData />
  </section>
</template>

<script>
import ListSubjectData from "@/components/subject/ListSubjectData.vue";
export default {
  name: "SubjectForm",
  components: {
    ListSubjectData,
  },
  methods: {
    createSubject() {
      console.log("createSubject");
      // this.$router.push("/subject/create");
    },
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
