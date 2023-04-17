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
      <div class="filter gap-2">
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="filter"
            id="filter"
            v-model="filterOptions"
          >
            <option selected disabled value="">Filter</option>
            <option value="subject_id">รหัสวิชา</option>
            <option value="category">หมวดหมู่</option>
            <option value="name">ชื่อวิชา</option>
            <!-- <option value="credit">หน่วยกิต</option> -->
            <option value="class_year">ชั้นปี</option>
          </select>
        </div>
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="sortyBy"
            id="sortyBy"
            v-model="sortBy"
            @change="sortValue()"
          >
            <option selected disabled value="">Sort by</option>
            <option value="subject_id">รหัสวิชา</option>
            <option value="category">หมวดหมู่</option>
            <option value="name">ชื่อวิชา</option>
            <option value="credit">หน่วยกิต</option>
            <option value="class_year">ชั้นปี</option>
          </select>
        </div>
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
    <div class="rightContent">
      <button
        v-if="role === 'admin'"
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
            <option selected disabled value="">Select</option>
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
            <option selected disabled value="">Select</option>
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
            <option selected disabled value="">Select</option>
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
              @click="ToggleClose('buttonPopup')"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </CreatePopup>
    <ListSubjectData
      :filterOptions="filterOptions"
      :filterValue="filterValue"
      :subjects="subjectList"
      :instructors="instructor_name_list"
    />
  </section>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import ListSubjectData from "./ListSubjectData.vue";
import CreatePopup from "@/components/main/CreatePopup.vue";

export default {
  name: "SubjectForm",
  components: {
    ListSubjectData,
    CreatePopup,
  },
  data() {
    return {
      role: "",
      popupTriggers: ref({
        buttonPopup: false,
      }),
      subjects: [],
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
      sortBy: "",
      sortOption: "Asc",

      instructor: {
        subject_id: "",
        instructor_id: "",
        instructor_name: "",
      },
      instructor_list: [],
      instructor_list_id: [],
      instructor_name_list: [],
      // tmp: [],
    };
  },
  computed: {
    subjectList() {
      if (this.filterValue.trim().length > 0) {
        if (this.filterOptions == "" || this.filterOptions == "subject_id") {
          return this.subjects.filter((subject) =>
            subject.subject_id
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        } else if (this.filterOptions == "category") {
          return this.subjects.filter((subject) =>
            subject.category
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        } else if (this.filterOptions == "name") {
          return this.subjects.filter((subject) =>
            subject.name
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        } else if (this.filterOptions == "class_year") {
          return this.subjects.filter((subject) =>
            subject.class_year
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        }
      }
      return this.subjects;
    },
  },
  
  async created() {
    this.role = localStorage.getItem("role")
     await axios.get("http://127.0.0.1:8080/subject/all").then((response) => {
      this.subjects = response.data.data.subject_list;
      console.log("this.subjects", this.subjects);
      console.log("this.dataForPagination", this.dataForPagination);
      for (var i = 0; i < this.subjects.length; i++) {
        let indexI = i;

        this.instructor_name_list.push([null, null, null]);

        this.subjects[i].index = indexI;
        // let id = this.subjects[i].id;
        // let data = [null, null, null];

        if (this.subjects[i].instructor_id != null) {
          for (var j = 0; j < this.subjects[i].instructor_id.length; j++) {
            let indexJ = j;
            if (this.subjects[i].instructor_id[j] != null) {
              axios
                .get(
                  "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
                    this.subjects[i].instructor_id[j] +
                    "&role=teacher"
                )
                .then((response) => {
                  this.instructor_name_list[indexI][indexJ] =
                    response.data.data.profile.name;
                  // data[indexJ] = response.data.data.profile.name;
                  // console.log(this.instructor_name_list);
                });
            }
          }
        }
        // this.tmp.push({
        //   id: id,
        //   instructor_name_list: data,
        // });
      }
      // console.log("this.tmp", this.tmp);
    });
  },
  methods: {
    sortValue() {
      // น้อยไปมาก
      if (this.sortOption == "Asc") {
        if (this.sortBy === "subject_id") {
          this.subjects.sort((a, b) => (a.subject_id > b.subject_id ? 1 : -1));
        } else if (this.sortBy === "category") {
          this.subjects.sort((a, b) => (a.category > b.category ? 1 : -1));
        } else if (this.sortBy === "name") {
          this.subjects.sort((a, b) => (a.name > b.name ? 1 : -1));
        } else if (this.sortBy === "credit") {
          this.subjects.sort((a, b) => (a.credit > b.credit ? 1 : -1));
        } else if (this.sortBy === "class_year") {
          this.subjects.sort((a, b) => (a.class_year > b.class_year ? 1 : -1));
        }
      } else if (this.sortOption == "Desc") {
        if (this.sortBy === "subject_id") {
          this.subjects.sort((a, b) => (a.subject_id < b.subject_id ? 1 : -1));
        } else if (this.sortBy === "category") {
          this.subjects.sort((a, b) => (a.category < b.category ? 1 : -1));
        } else if (this.sortBy === "name") {
          this.subjects.sort((a, b) => (a.name < b.name ? 1 : -1));
        } else if (this.sortBy === "credit") {
          this.subjects.sort((a, b) => (a.credit < b.credit ? 1 : -1));
        } else if (this.sortBy === "class_year") {
          this.subjects.sort((a, b) => (a.class_year < b.class_year ? 1 : -1));
        }
      }
    },
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
    ToggleClose(trigger) {
      console.log(trigger);
      this.popupTriggers.buttonPopup = false;
      this.resetForm();
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
      this.subject_category_list = [];
      this.subject = {
        subject_id: "",
        category: "",
        name: "",
        credit: 0,
        class_year: "",
      };
      this.credit = 0;
    },
    // totalPage() {
    //   return Math.ceil(this.subjects.length / this.elementPerpage);
    // },
    // getDataPagination(NumberPage) {
    //   this.currentPage = NumberPage;
    //   this.dataForPagination = [];
    //   let start = (NumberPage - 1) * this.elementPerpage;
    //   let end = NumberPage * this.elementPerpage;
    //   this.dataForPagination = this.subjects.slice(start, end);
    //   // console.log(this.subjects)
    //   console.log(this.dataForPagination);
    // },
    // getPreviousPage() {
    //   if (this.currentPage > 1) {
    //     this.currentPage--;
    //     this.getDataPagination(this.currentPage);
    //   }
    // },
    // getNextPage() {
    //   if (this.currentPage < this.totalPage()) {
    //     this.currentPage++;
    //     this.getDataPagination(this.currentPage);
    //   }
    // },
    // isActive(NumberPage) {
    //   return NumberPage == this.currentPage ? "active" : "";
    // },
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
