<template>
  <div>
    <div class="rightContent">
      <h2>Manage with</h2>
      <select
        class="form-select"
        aria-label="Select"
        v-model="this.manage_with"
      >
        <option selected disabled>manage by</option>
        <option value="year_term">term year</option>
        <option value="subject_category">subject category</option>
      </select>
      <div class="btnEndTerm">
        <button type="button" class="btn btn-secondary" @click="togglePopupEndTerm()">
          end term
        </button>
      </div>
      <div class="btnAddSubjectCategory">
        <button type="button" class="btn btn-secondary" @click="togglePopupAddSubjectCategory()">
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
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import CreatePopup from "@/components/main/CreatePopup.vue";
export default {
  name: "SchoolDataView",
  components: {
    CreatePopup,
  },
  data() {
    return {
      popupTriggers: ref({
        buttonPopupAddSubjectCategory: false,
        buttonPopupEndTerm: false,
      }),
      manage_with: "",
      category:"",
    };
  },
  methods: {
    togglePopupAddSubjectCategory() {
      this.popupTriggers.buttonPopupAddSubjectCategory = !this.popupTriggers.buttonPopupAddSubjectCategory;

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
      this.popupTriggers.buttonPopupEndTerm = !this.popupTriggers.buttonPopupEndTerm;

    },
    endTerm() {
      axios
        .post("http://127.0.0.1:8080/school-data/end-term")
        .then(() => {
          this.popupTriggers.buttonPopupEndTerm = !this.popupTriggers.buttonPopupEndTerm;
          // console.log(response.data.data.school_data);
          // this.subject_list = response.data.data.subject_list;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async submitFormEndTerm() {
      this.endTerm()
    },
    async submitFormAddSubjectCategory() {
      axios
        .post("http://127.0.0.1:8080/school-data/add-subject-category",{
          category:this.category
        })
        .then(() => {
          this.popupTriggers.buttonPopupAddSubjectCategory = !this.popupTriggers.buttonPopupAddSubjectCategory;
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
