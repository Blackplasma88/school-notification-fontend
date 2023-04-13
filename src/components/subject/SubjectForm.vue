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
            name="filter"
            id="filter"
          >
            <option selected disabled>Filter</option>
            <option value="subject_code">รหัสวิชา</option>
            <option value="category">หมวดหมู่</option>
            <option value="subject_name">ชื่อวิชา</option>
            <option value="news">ชั้นปี</option>
          </select>
        </div>
        &nbsp;
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="sortyBy"
            id="sortyBy"
          >
            <option selected disabled>Sort by</option>
            <option value="subject_code">รหัสวิชา</option>
            <option value="category">หมวดหมู่</option>
            <option value="subject_name">ชื่อวิชา</option>
            <option value="news">ชั้นปี</option>
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
        Create Subject
      </button>
    </div>
    <CreatePopup
      v-if="popupTriggers.buttonPopup"
      @close="TogglePopup('buttonPopup')"
    >
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="name">รหัสวิชา :</label>
          <input
            type="text"
            class="form-control"
            id="subject_id"
            placeholder="กรอกรหัสวิชา"
            v-model="subject.subject_id"
          />

          <label for="select"> หมวดหมู่ :</label>
          <select
            class="form-select"
            aria-label="Select"
            name="category"
            id="category"
            v-model="subject.category"
          >
            <option selected disabled>Select</option>
            <option value="คณิตศาสตร์">คณิตศาสตร์</option>
            <option value="วิทยาศาสตร์">วิทยาศาสตร์</option>
            <option value="ภาษาไทย">ภาษาไทย</option>
            <option value="ภาษาต่างประเทศ">ภาษาต่างประเทศ</option>
            <option value="สังคมศึกษา">สังคมศึกษา</option>
            <option value="สุขศึกษา">สุขศึกษา</option>
            <option value="ศิลปะ">ศิลปะ</option>
            <option value="การงานอาชีพ">การงานอาชีพ</option>
          </select>
          
          <label for="name">ชื่อวิชา :</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="กรอกชื่อวิชา"
            v-model="subject.name"
          />
          <label for="select"> ชั้นปี :</label>
          <select
            class="form-select"
            aria-label="Select"
            name="class_year"
            id="class_year"
            v-model="subject.class_year"
          >
            <option selected disabled>Select</option>
            <option value="1">ม.1</option>
            <option value="2">ม.2</option>
            <option value="3">ม.3</option>
            <option value="4">ม.4</option>
            <option value="5">ม.5</option>
            <option value="6">ม.6</option>
          </select>
          <label for="select"> หน่วยกิต :</label>
          <input
            type="number"
            class="form-control"
            id="credit"
            placeholder="กรอกหน่วยกิต Ex. 4"
            v-model="subject.credit"
          />

          <!-- <label for="select"> ครูผู้สอน 1:</label>
          <select
            class="form-select"
            aria-label="Select"
            name="instructor1"
            id="instructor1"
            v-model="subject.instructor1"
          >
            <option selected disabled>Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
          </select>

          <label for="select"> ครูผู้สอน 2:</label>
          <select
            class="form-select"
            aria-label="Select"
            name="instructor2"
            id="instructor2"
            v-model="subject.instructor2"
          >
            <option selected disabled>Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
          </select>

          <label for="select"> ครูผู้สอน 3:</label>
          <select
            class="form-select"
            aria-label="Select"
            name="instructor3"
            id="instructor3"
            v-model="subject.instructor3"
          >
            <option selected disabled>Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
          </select> -->

          <button class="popup-close btn btn-success">Confirm</button>
          &nbsp;
          <button
            type="button"
            class="popup-close btn btn-danger"
            @click="TogglePopup('buttonPopup')"
          >
            Cancel
          </button>
        </div>
      </form>
    </CreatePopup>
    <ListSubjectData />
  </section>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import ListSubjectData from "@/components/subject/ListSubjectData.vue";
import CreatePopup from "@/components/main/CreatePopup.vue";
export default {
  name: "SubjectForm",
  components: {
    ListSubjectData,
    CreatePopup,
  },
  data() {
    return {
      popupTriggers: ref({
        buttonPopup: false,
      }),
      subject: {
        subject_id: "",
        category: "",
        name: "",
        credit: "",
        class_year: "",
        instructor1: "",
        instructor2: "",
        instructor3: "",
      },
    };
  },
  methods: {
    TogglePopup(trigger) {
      console.log(trigger);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      console.log(this.popupTriggers.buttonPopup);
    },
    async submitForm() {
      console.log("create Class", this.subject);
      try {
        await axios
          .post("http://127.0.0.1:8080/subject/create", this.subject)
          .then((response) => {
            console.log(response);
            this.resetForm();
            this.popupTriggers.buttonPopup = false;
            this.$swal("Success!", "สำเร็จ", "success").then(() => {
              window.location.reload();
            });
          });
      } catch (error) {
        console.log(error);
        this.$swal("Error!", "กรอกข้อมูลให้ครบ", "error");
      }
    },
    resetForm() {
      console.log("reset");
      this.subject.subject_id = "";
      this.subject.subject_name = "";
      this.subject.credit = "";
      this.subject.category = "";
      this.subject.instructor1 = "";
      this.subject.instructor2 = "";
      this.subject.instructor3 = "";
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
