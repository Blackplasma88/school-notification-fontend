<template>
  <div>
    <h2>test</h2>
    <div class="rightContent">
      <select
        class="form-select"
        aria-label="Select"
        v-model="this.year"
        @change="getCourseList()"
      >
        <option selected disabled>select</option>
        <option v-for="item in this.term_year" :key="item.id">
          {{ item.year }}
        </option>
      </select>
      <select
        class="form-select"
        aria-label="Select"
        v-model="this.term"
        @change="getCourseList()"
      >
        <option selected disabled>select</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <select
        class="form-select"
        aria-label="Select"
        v-model="this.course_name"
        @change="getCourseSummaryList()"
      >
        <option selected disabled>select</option>
        <option v-for="item in this.course_list" :key="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CheckNamaManage",
  data() {
    return {
      role: "",
      profile_id: "",
      year: "",
      term: "",
      term_year: [],
      course_list: [],
      course_id: "",
      course_name: "",
      course_summary: [],
    };
  },
  mounted() {
    this.role = localStorage.getItem("role");
    this.profile_id = localStorage.getItem("profile_id");
    axios
      .get("http://127.0.0.1:8080/school-data/term-year-data")
      .then((response) => {
        // console.log(response.data.data.school_data);
        this.term_year = response.data.data.school_data;
        // console.log(  this.term_year);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async getCourseList() {
      if (this.year === "" || this.term === "") {
        return;
      }
      axios
        .get(
          "http://127.0.0.1:8080/course/year-term?profile_id=" +
            this.profile_id +
            "&role=" +
            this.role +
            "&year=" +
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
            "&role=" +
            this.role
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
