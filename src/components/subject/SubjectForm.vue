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
    <CreateSubject
      v-if="popupTriggers.buttonPopup"
      @close="TogglePopup('buttonPopup')"
    >
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="name">รหัสวิชา :</label>
          <input
            type="text"
            class="form-control"
            id="subject_code"
            placeholder="Type Name"
            v-model="subject.subject_code"
          />
          <label for="name">ชื่อวิชา :</label>
          <input
            type="text"
            class="form-control"
            id="subject_name"
            placeholder="Type Name"
            v-model="subject.subject_name"
          />
          <label for="select"> หน่วยกิต :</label>
          <select
            class="form-select"
            aria-label="Select"
            name="credit"
            id="credit"
            v-model="subject.credit"
          >
            <option selected disabled>Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
          </select>
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

          <label for="select"> ครูผู้สอน 1:</label>
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
          </select>

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
    </CreateSubject>
    <ListSubjectData />
  </section>
</template>

<script>
import { ref } from "vue";
import ListSubjectData from "@/components/subject/ListSubjectData.vue";
import CreateSubject from "@/components/subject/CreateSubject.vue";
export default {
  name: "SubjectForm",
  components: {
    ListSubjectData,
    CreateSubject,
  },
  data() {
    return {
      popupTriggers: ref({
        buttonPopup: false,
      }),
      subject: {
        subject_code: "",
        subject_name: "",
        credit: "",
        category: "",
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
    submitForm() {
      console.log(this.subject);
      console.log("submit");
      this.resetForm();
    },
    resetForm() {
      console.log("reset");
      this.subject.subject_code = "";
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
