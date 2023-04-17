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
      <div v-if="this.role === 'teacher'">
        <select
          class="form-select"
          aria-label="Select"
          v-model="this.course_name"
          @change="getCourseSummaryList()"
        >
          <option selected disabled value="">select course name</option>
          <option v-for="item in this.course_list" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
    <ListSummary
      :course_summary="course_summary"
      :student_names="student_names"
      :role="this.role"
    />
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
      filterOptions: "",
      role: "",
      profile_id: "",
      year: "",
      term: "",
      term_year: [],
      course_list: [],
      course_id: "",
      course_name: "",
      course_summary: [],
      student_names: [],
    };
  },
  created() {
    this.role = localStorage.getItem("role");
    this.profile_id = localStorage.getItem("profile_id");
    axios
      .get("http://127.0.0.1:8080/school-data/term-year-data")
      .then((response) => {
        // console.log(response.data.data.school_data);
        this.term_year = response.data.data.school_data;
        // console.log(  this.term_year);
        if (
          localStorage.getItem("year_in_summary") === null ||
          localStorage.getItem("year_in_summary") === undefined
        ) {
          this.year = this.term_year[this.term_year.length - 1].year;
        } else {
          this.year = localStorage.getItem("year_in_summary");
        }

        if (
          localStorage.getItem("term_in_summary") === null ||
          localStorage.getItem("term_in_summary") === undefined
        ) {
          this.term = this.term_year[this.term_year.length - 1].term;
        } else {
          this.term = localStorage.getItem("term_in_summary");
        }

        if (this.term !== "" && this.year !== "" && this.role == "teacher") {
          this.getCourseList();
        }

        if (this.role == "student") {
          this.getStudentCourseSummaryList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async getCourseList() {
      this.course_summary = [];
      if (this.year === "" || this.term === "") {
        return;
      }
      localStorage.setItem("year_in_summary", this.year);
      localStorage.setItem("term_in_summary", this.term);
      if (this.role === "teacher") {
        this.course_list = [];
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

            console.log(this.course_list);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.role === "student") {
        this.getStudentCourseSummaryList();
      }
    },
    async getCourseSummaryList() {
      this.course_summary = [];
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

          console.log(this.course_summary);
          for (var i = 0; i < this.course_summary.length; i++) {
            let indexI = i;
            axios
              .get(
                "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
                  this.course_summary[indexI].student_id +
                  "&role=student"
              )
              .then((response) => {
                console.log(response.data.data.profile.name);
                this.student_names[indexI] = response.data.data.profile.name;
                console.log(this.student_names);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getStudentCourseSummaryList() {
      axios
        .get(
          "http://127.0.0.1:8080/course-summary/student?year=" +
            this.year +
            "&term=" +
            this.term
        )
        .then((response) => {
          console.log(response.data.data.course_summary);
          this.course_summary = response.data.data.course_summary;

          console.log(this.course_summary);
          for (var i = 0; i < this.course_summary.length; i++) {
            let indexI = i;
            axios
              .get(
                "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
                  this.course_summary[indexI].student_id +
                  "&role=student"
              )
              .then((response) => {
                console.log(response.data.data.profile.name);
                this.student_names[indexI] = response.data.data.profile.name;
                console.log(this.student_names);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
