<template>
  <section>
    <div class="filter">
      <div class="search-wrapper d-flex">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          v-model="filterValue"
        />
      </div>

      <div class="filter">
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="class_filter"
            id="class_filter"
            v-model="filterOptions"
          >
            <option selected disabled value="">Filter</option>
            <option value="class_year">ชั้นปี</option>
            <option value="class_room">ห้อง</option>
          </select>
        </div>
        &nbsp;
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="sort_filter"
            id="sort_filter"
            v:model:value="sort_filter"
          >
            <option selected disabled value="">Sort by</option>
            <option value="class_year">ชั้นปี</option>
            <option value="class_room">ห้อง</option>
          </select>
        </div>
      </div>
    </div>
    <div class="rightContent">
      <div>
        <select
          class="form-select"
          aria-label="Select"
          v-model="this.year"
          @change="getCourseList()"
        >
          <option selected disabled value="">select year</option>
          <option v-for="item in this.term_year" :key="item.id">
            {{ item.year }}
          </option>
        </select>
      </div>
      &nbsp;
      <div>
        <select
          class="form-select"
          aria-label="Select"
          v-model="this.term"
          @change="getCourseList()"
        >
          <option selected disabled value="">select term</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      &nbsp;
      <div>
        <select
          class="form-select"
          aria-label="Select"
          v-model="this.course_name"
          @change="getCourseSummaryList()"
        >
          <option selected disabled value="">select course</option>
          <option v-for="item in this.course_list" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
    <ListSummary :filterOptions="filterOptions" :filterValue="filterValue" />
  </section>
</template>

<script>
import axios from "axios";
import ListSummary from "./ListSummary.vue";
export default {
  name: "CheckNamaManage",
  components: {
    ListSummary,
  },
  data() {
    return {
      year: "",
      term: "",
      term_year: [],
      course_list: [],
      course_id: "",
      course_name: "",
      course_summary: [],
      filterValue: "",
      filterOptions: "",
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8080/school-data/term-year-data")
      .then((response) => {
        console.log(response.data.data.school_data);
        this.term_year = response.data.data.school_data;
        console.log(this.term_year);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  created() {
    // axios
    //   .get(
    //     "http://127.0.0.1:8080/course-summary?course_id=" +
    //       "643a9237aa7b8382c2624fe8" +
    //       "&role=" +
    //       "student" +
    //       "&student_id=" +
    //       "s001"
    //   )
    //   .then((response) => {
    //     console.log(response.data.data.course_summary);
    //     this.course_summary = response.data.data.course_summary;
    //     //   console.log(  this.school_data);
    //   });
  },
  methods: {
    async getCourseList() {
      if (this.year === "" || this.term === "") {
        return;
      }
      axios
        .get(
          "http://127.0.0.1:8080/course/year-term?profile_id=t1&role=teacher&year=" +
            this.year +
            "&term=" +
            this.term
        )
        .then((response) => {
          console.log(response.data.data.course_list);
          this.course_list = response.data.data.course_list;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getCourseSummaryList() {
      console.log(this.course_name);
      for (let i = 0; i < this.course_list.length; i++) {
        if (this.course_list[i].name == this.course_name) {
          this.course_id = this.course_list[i].id;
          break;
        }
      }

      axios
        .get(
          "http://127.0.0.1:8080/course-summary?course_id=" +
            this.course_id +
            "&role=teacher"
        )
        .then((response) => {
          console.log(response.data.data.course_summary);
          this.course_summary = response.data.data.course_summary;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
