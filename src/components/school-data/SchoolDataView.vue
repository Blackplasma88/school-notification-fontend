<template>
  <section>
    <h2>Manage with</h2>
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
          v-model="this.manage_with"
          @change="selectManageWith()"
        >
          <option selected disabled value="">manage by</option>
          <option value="year_term">term year</option>
          <option value="subject_category">subject category</option>
        </select>
      </div>
      &nbsp;
      <div class="btnEndTerm">
        <button
          type="button"
          class="btn btn-secondary"
          @click="togglePopupEndTerm()"
        >
          end term
        </button>
      </div>
      &nbsp;
      <div class="btnAddSubjectCategory">
        <button
          type="button"
          class="btn btn-secondary"
          @click="togglePopupAddSubjectCategory()"
        >
          Add
        </button>
      </div>
    </div>
    <CreatePopup v-if="popupTriggers.buttonPopupEndTerm">
      <form @submit.prevent="submitFormEndTerm">
        <div class="form-control">
          <label for="select"> ปีการศึกษา : 2566</label>

          <label for="select"> เทอม : 1</label>

          <label for="select"> สถานะ : กำลังดำเนินการ</label>

          <div class="button-group">
            <button class="popup-close btn btn-success">Confirm</button>
            &nbsp;
            <button
              type="button"
              class="popup-close btn btn-danger"
              @click="togglePopupEndTerm()"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </CreatePopup>
    <CreatePopup v-if="popupTriggers.buttonPopupAddSubjectCategory">
      <form @submit.prevent="submitFormAddSubjectCategory">
        <div class="form-control">
          <label for="name">category :</label>
          <input
            type="text"
            class="form-control"
            placeholder="category"
            v-model="this.category"
          />

          <div class="button-group">
            <button class="popup-close btn btn-success">Confirm</button>
            &nbsp;
            <button
              type="button"
              class="popup-close btn btn-danger"
              @click="togglePopupAddSubjectCategory()"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </CreatePopup>

    <ListSchoolData :school_datas="school_datas" :isShow="isShow" />
  </section>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import CreatePopup from "@/components/main/CreatePopup.vue";
import ListSchoolData from "@/components/school-data/ListSchoolData.vue";
export default {
  name: "SchoolDataView",
  components: {
    CreatePopup,
    ListSchoolData,
  },
  data() {
    return {
      role:"",
      popupTriggers: ref({
        buttonPopupAddSubjectCategory: false,
        buttonPopupEndTerm: false,
      }),
      manage_with: "",
      category: "",
      filterValue: "",
      filterOptions: "",
      sort_filter: "",
      school_datas: [],
      school_datas_year_term: [],
      school_datas_subject_category: [],
      isShow: Boolean,
    };
  },
<<<<<<< HEAD
  mounted(){
    this.role = localStorage.getItem("role")
  },
=======

>>>>>>> origin/arm
  methods: {
    togglePopupAddSubjectCategory() {
      this.popupTriggers.buttonPopupAddSubjectCategory =
        !this.popupTriggers.buttonPopupAddSubjectCategory;

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
    togglePopupEndTerm() {
      this.popupTriggers.buttonPopupEndTerm =
        !this.popupTriggers.buttonPopupEndTerm;
    },
    endTerm() {
      axios
        .post("http://127.0.0.1:8080/school-data/end-term")
        .then(() => {
          this.popupTriggers.buttonPopupEndTerm =
            !this.popupTriggers.buttonPopupEndTerm;
          // console.log(response.data.data.school_data);
          // this.subject_list = response.data.data.subject_list;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async submitFormEndTerm() {
      this.endTerm();
    },
    async submitFormAddSubjectCategory() {
      axios
        .post("http://127.0.0.1:8080/school-data/add-subject-category", {
          category: this.category,
        })
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

    async selectManageWith() {
      console.log("this.manage_with", this.manage_with);
      if (this.manage_with == "year_term") {
        this.isShow = true;
        axios
          .get("http://127.0.0.1:8080/school-data/term-year-data")
          .then((res) => {
            console.log("school_data", res.data.data.school_data);
            this.school_datas = res.data.data.school_data;
            console.log("this.school_data", this.school_datas);
          });
      } else if (this.manage_with == "subject_category") {
        this.isShow = false;
        axios
          .get("http://127.0.0.1:8080/school-data/subject-category")
          .then((res) => {
            console.log("school_data", res.data.data.school_data);
            this.school_datas = res.data.data.school_data;
            console.log("this.school_data", this.school_datas);
          });
      }
    },
  },
};
</script>

<style></style>
