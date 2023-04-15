<template>
  <section>
    <div class="filter">
      <div class="search-wrapper">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          v-model="filterValue"
        />
        {{ filterValue }}
      </div>
      <div class="filter">
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="filter"
            id="filter"
            v-model="filterOptions"
          >
            <option selected disabled>Filter</option>
            <option value="subject_id">รหัสวิชา</option>
            <option value="category">หมวดหมู่</option>
            <option value="name">ชื่อวิชา</option>
            <option value="credit">หน่วยกิต</option>
            <option value="class_year">ชั้นปี</option>
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
            <option value="subject_id">รหัสวิชา</option>
            <option value="category">หมวดหมู่</option>
            <option value="name">ชื่อวิชา</option>
            <option value="credit">หน่วยกิต</option>
            <option value="class_year">ชั้นปี</option>
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
            <option v-for="index in subject_category_list" :key="index">
              {{ index }}
            </option>
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
          <select
            class="form-select"
            aria-label="Select"
            name="credit"
            id="credit"
            v-model="credit"
          >
            <option selected disabled>Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <div class="button-group">
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
        </div>
      </form>
    </CreatePopup>
    <ListSubjectData :filterOptions="filterOptions" :filterValue="filterValue"/>
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
        credit: 0,
        class_year: "",
      },
      credit: 0,
      subject_category_list: [],
      filterOptions: "",
      filterValue: "",
    };
  },
  methods: {
    TogglePopup(trigger) {
      console.log(trigger);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      console.log(this.popupTriggers.buttonPopup);

      axios
        .get("http://127.0.0.1:8080/school-data/subject-category")
        .then((response) => {
          console.log(response.data.data.school_data.length);
          for (let i = 0; i < response.data.data.school_data.length; i++) {
            this.subject_category_list.push(
              response.data.data.school_data[i].subject_category
            );
          }
        });
    },
    async submitForm() {
      try {
        console.log(this.credit);
        this.subject.credit = parseInt(this.credit);
        console.log("create Class", this.subject);
        await axios
          .post("http://127.0.0.1:8080/subject/create", this.subject)
          .then((response) => {
            console.log(response);
            this.resetForm();
            this.popupTriggers.buttonPopup = false;
            this.$swal("Success!", response.data.message, "success").then(
              () => {
                window.location.reload();
              }
            );
          });
      } catch (error) {
        console.log(error);
        this.$swal("Error!", error.response.data.message, "error");
      }
    },
    resetForm() {
      console.log("reset");
      this.subject.subject_id = "";
      this.subject.subject_name = "";
      this.subject.credit = "";
      this.subject.category = "";
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

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
