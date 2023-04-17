<template>
  <div>
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
            <option value="student_id">ชื่อนักเรียน</option>
            <option value="status">สถานะ</option>
            <option value="score_get">คะแนนที่ได้</option>
          </select>
        </div>
        &nbsp;
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="class_sort"
            id="class_sort"
            v-model="sortBy"
            @change="sortValue()"
          >
            <option selected disabled value="">Sort by</option>
            <option value="status">สถานะ</option>
            <option value="score_get">คะแนนที่ได้</option>
          </select>
        </div>
        &nbsp;
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="sortyBy"
            id="sortyBy"
            v-model="sortOption"
            @change="sortValue()"
          >
            <option selected disabled value="">{{ sortOption }}</option>
            <option value="Asc">Asc</option>
            <option value="Desc">Desc</option>
          </select>
        </div>
      </div>
    </div>
    <div class="rightContent gap-1">
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
      <div>
        <select
          class="form-select"
          aria-label="Select"
          v-model="this.course_name"
          @change="getScoreNameList()"
        >
          <option selected disabled value="">select course name</option>
          <option v-for="item in this.course_list" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div>
        <select
          class="form-select"
          aria-label="Select"
          v-model="this.score_name"
          @change="getScoreData()"
        >
          <option selected disabled value="">select score name</option>
          <option v-for="item in this.score_name_list" :key="item.id">
            {{ item }}
          </option>
        </select>
      </div>
      <div v-if="score_name_list != ''" class="btnAddScore">
        <button
          v-if="this.role === 'teacher'"
          type="button"
          class="btn btn-secondary"
          @click="togglePopupAddScore()"
        >
          add score
        </button>
      </div>
    </div>
    <CreatePopup v-if="popupTriggers.buttonPopupAddScore">
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="select"> name :</label>
          <input
            type="text"
            class="form-control"
            placeholder="name"
            v-model="this.score_new.name"
          />

          <label for="select"> type :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.score_new.type"
          >
            <option selected disabled>Select</option>
            <option value="work">work</option>
            <option value="midterm">midterm</option>
            <option value="fianl">fianl</option>
          </select>

          <label for="select"> score_full :</label>
          <input
            type="number"
            class="form-control"
            placeholder="category"
            v-model="this.score_new.score_full"
          />

          <div class="button-group">
            <button class="popup-close btn btn-success">Confirm</button>
            &nbsp;
            <button
              type="button"
              class="popup-close btn btn-danger"
              @click="togglePopupAddScore()"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </CreatePopup>
    <div v-if="score_name != ''">
      <ListScoreManage
        :scores="filterList"
        :scores_name="this.score_name_list"
        :courses="this.course_list"
        :students="this.student_name_list"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import CreatePopup from "@/components/main/CreatePopup.vue";
import ListScoreManage from "./ListScoreManage.vue";
export default {
  name: "ScoreManage",
  components: {
    CreatePopup,
    ListScoreManage,
  },
  data() {
    return {
      role: "",
      profile_id: "",
      popupTriggers: ref({
        buttonPopupAddScore: false,
      }),
      filterValue: "",
      filterOptions: "",
      sortOption: "Asc",
      sortBy: "",
      year: "",
      term: "",
      term_year: [],
      course_list: [],
      course_id: "",
      course_name: "",
      score_name: "",
      score_name_list: [],
      score: {},
      score_information: [],
      score_new: {
        name: "",
        type: "",
        score_full: 0,
      },
      student_name_list: [],
    };
  },
  computed: {
    filterList() {
      if (this.filterValue.trim().length > 0) {
        if (this.filterOptions == "" || this.filterOptions == "status") {
          return this.score_information.filter((score) =>
            score.status
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        } else if (this.filterValue.trim().length > 0) {
          if (this.filterOptions == "" || this.filterOptions == "score_get") {
            return this.score_information.filter(
              (score) =>
                String(score.score_get) ===
                this.filterValue.trim().toLowerCase()
            );
          } else if (
            this.filterOptions == "" ||
            this.filterOptions == "student_id"
          ) {
            let tmp = [];
            for (var i = 0; i < this.score_name_list.length; i++) {
              if (
                this.score_name_list[i].student_id
                  .trim()
                  .toLowerCase()
                  .includes(this.filterValue.trim().toLowerCase())
              ) {
                tmp.push(this.score_information[i]);
              }
            }
            return tmp;
          }
        }
      }

      return this.score_information;
    },
  },
  created() {
    this.role = localStorage.getItem("role");
    this.profile_id = localStorage.getItem("profile_id");
    console.log(localStorage.getItem("profile_id"));
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
    sortValue() {
      if (this.sortOption == "Asc") {
        if (this.sortBy === "status") {
          this.score_information.sort((a, b) => (a.status > b.status ? 1 : -1));
        } else if (this.sortBy === "score_get") {
          this.score_information.sort((a, b) =>
            a.score_get > b.score_get ? 1 : -1
          );
        }
      } else if (this.sortOption == "Desc") {
        if (this.sortBy === "status") {
          this.score_information.sort((a, b) => (a.status < b.status ? 1 : -1));
        } else if (this.sortBy === "score_get") {
          this.score_information.sort((a, b) =>
            a.score_get < b.score_get ? 1 : -1
          );
        }
      }
    },
    togglePopupAddScore() {
      this.popupTriggers.buttonPopupAddScore =
        !this.popupTriggers.buttonPopupAddScore;

      // axios
      //   .get("http://127.0.0.1:8080/school-data/subject-category")
      //   .then((response) => {
      //     // console.log(response.data.data.school_data);
      //     this.school_data = response.data.data.school_data;
      //     //   console.log(  this.school_data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
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
          console.log(this.course_list);

          axios.get("");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getScoreNameList() {
      console.log(this.course_name);
      for (let i = 0; i < this.course_list.length; i++) {
        if (this.course_list[i].name == this.course_name) {
          this.course_id = this.course_list[i].id;
          break;
        }
      }

      axios
        .get(
          "http://127.0.0.1:8080/score/score-in-course?course_id=" +
            this.course_id +
            "&role=" +
            this.role +
            "&id=" +
            this.profile_id
        )
        .then((response) => {
          // console.log(response.data.data.score.name);
          this.score_name_list = response.data.data.score_name_list;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getScoreData() {
      axios
        .get(
          "http://127.0.0.1:8080/score/score-data?course_id=" +
            this.course_id +
            "&name=" +
            this.score_name +
            "&role=" +
            this.role +
            "&id=" +
            this.profile_id
        )
        .then((response) => {
          console.log(response.data.data.score_data);
          this.score = response.data.data.score_data;
          this.score_information =
            response.data.data.score_data.score_information;
          console.log(this.score_information);
          console.log(this.score_information[0].student_id);
          for (var i = 0; i < this.score_information.length; i++) {
            let indexI = i;
            this.score_information[i].index = i;
            axios
              .get(
                "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
                  this.score_information[indexI].student_id +
                  "&role=student"
              )
              .then((response) => {
                console.log(response.data.data.profile.name);
                this.student_name_list[indexI] =
                  response.data.data.profile.name;
                console.log(this.student_name_list);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async submitForm() {
      this.score_new.course_id = this.course_id;
      console.log(this.score_new);
      axios
        .post("http://127.0.0.1:8080/score/create", this.score_new)
        .then(() => {
          this.popupTriggers.buttonPopupAddSubjectCategory =
            !this.popupTriggers.buttonPopupAddSubjectCategory;
          // console.log(response.data.data.school_data);
          // this.subject_list = response.data.data.subject_list;
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
