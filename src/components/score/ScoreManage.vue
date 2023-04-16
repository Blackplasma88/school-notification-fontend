<template>
  <div>
<<<<<<< HEAD
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
      @change="getScoreNameList()"
    >
      <option selected disabled>select</option>
      <option v-for="item in this.course_list" :key="item.id">
        {{ item.name}}
      </option>
    </select>
    <select
      class="form-select"
      aria-label="Select"
      v-model="this.score_name"
      @change="getScoreData()"
    >
      <option selected disabled>select</option>
      <option v-for="item in this.score_name_list" :key="item.id">
        {{ item }}
      </option>
    </select>
    <div class="btnAddScore">
      <button v-if='this.role === "teacher"'
        type="button"
        class="btn btn-secondary"
        @click="togglePopupAddScore()"
      >
        add score
      </button>
=======
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
            name="filterOptions"
            id="filterOptions"
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
>>>>>>> origin/arm
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
          @change="getScoreNameList()"
        >
          <option selected disabled value="">select course name</option>
          <option v-for="item in this.course_list" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      &nbsp;
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
      &nbsp;
      <div class="btnAddScore">
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
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import CreatePopup from "@/components/main/CreatePopup.vue";
export default {
  name: "ScoreManage",
  components: {
    CreatePopup,
  },
  data() {
    return {
<<<<<<< HEAD
      role:"",
      profile_id:"",
=======
      role: "",
      profile_id: "",
>>>>>>> origin/arm
      popupTriggers: ref({
        buttonPopupAddScore: false,
      }),
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
    };
  },
<<<<<<< HEAD
  mounted(){
    this.role = localStorage.getItem("role")
    this.profile_id = localStorage.getItem("profile_id")
=======
  mounted() {
    this.role = localStorage.getItem("role");
    this.profile_id = localStorage.getItem("profile_id");
>>>>>>> origin/arm
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
          this.score_name_list = response.data.data.score.name;
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
          //   console.log(  this.school_data);
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
