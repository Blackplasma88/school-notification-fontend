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
      <button
        type="button"
        class="btn btn-secondary"
        @click="TogglePopup('buttonPopup')"
      >
        Create Class
      </button>
    </div>
    <ListClassData />
  </section>
</template>

<script>
import ListClassData from "@/components/classdata/ListClassData.vue";
export default {
  name: "ClassForm",
  components: {
    ListClassData,
  },
  data() {
    return {
      popupTriggers: {
        buttonPopup: false,
      },
      class: {
        class_id: "",
        year: "",
        room: "",
        count_of_students: "",
        count_of_courses: "",
        advisor: "",
        student_list: [
          {
            student_id: "",
            student_name: "",
          },
        ],
      },
    };
  },
  methods: {
    TogglePopup() {
      console.log("TogglePopup");
    },
  },
};
</script>

<style></style>
