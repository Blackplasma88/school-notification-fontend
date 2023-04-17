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
            <option value="name">ชื่อคอร์ส</option>
            <option value="subject_id">ชื่อวิชา</option>
            <option value="instructor_id">ผู้สอน</option>
            <option value="credit">หน่วยกิต</option>
            <option value="class_id">ชั้นปี/ห้อง</option>
            <option value="number_of_student">จำนวนนักเรียน</option>
            <option value="location_id">สถานที่</option>
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
            <option value="name">ชื่อคอร์ส</option>
            <!-- <option value="subject_id">ชื่อวิชา</option>
            <option value="instructor_id">ผู้สอน</option> -->
            <option value="credit">หน่วยกิต</option>
            <!-- <option value="class_id">ชั้นปี/ห้อง</option> -->
            <option value="number_of_student">จำนวนนักเรียน</option>
            <!-- <option value="location_id">สถานที่</option> -->
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
      <!-- &nbsp;
      <div>
        <select
          class="form-select"
          aria-label="Select"
          name="status_filter"
          id="status_filter"
          v-model="filterOptions"
        >
          <option selected disabled value="">Status</option>
          <option value="true">In Use</option>
          <option value="false">FREE</option>
        </select>
      </div> -->
      <div class="btnCreateCourse">
        <button
          v-if="this.role === 'admin'"
          type="button"
          class="btn btn-secondary"
          @click="togglePopupCreateCourse()"
        >
          Create course
        </button>
      </div>
    </div>
    <CreatePopup v-if="popupTriggers.buttonPopup">
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="select"> หมวดหมู่ :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.category"
            @change="getSubjectList()"
          >
            <option selected disabled>Select</option>
            <option v-for="item in this.school_data" :key="item.id">
              {{ item.subject_category }}
            </option>
          </select>

          <label for="select"> วิชา :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.subject_name"
            @change="getInstructorlist()"
          >
            <option selected disabled>Select</option>
            <option v-for="item in this.subject_list" :key="item.id">
              {{ item.name }}
            </option>
          </select>

          <label for="select"> ผู้สอน :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.instructor_name"
          >
            <option selected disabled>Select</option>
            <option v-for="item in this.instructor_list" :key="item.id">
              {{ item.name }}
            </option>
          </select>

          <label for="select"> ชั้น :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.class_year"
            @change="getClassByClassYear()"
          >
            <option selected disabled>Select</option>
            <option value="1">ม.1</option>
            <option value="2">ม.2</option>
            <option value="3">ม.3</option>
            <option value="4">ม.4</option>
            <option value="5">ม.5</option>
            <option value="6">ม.6</option>
          </select>

          <label for="select"> ห้อง :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.class_room"
          >
            <option selected disabled>Select</option>
            <option v-for="item in this.class_list" :key="item.id">
              {{ item.class_room }}
            </option>
          </select>

          <label for="select"> สถานที่ :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.location_name"
          >
            <option selected disabled>Select</option>
            <option v-for="item in this.location_list" :key="item.id">
              {{ item.location_id }}
            </option>
          </select>

          <label for="select"> วัน :</label>
          <select class="form-select" aria-label="Select" v-model="this.day_1">
            <option selected disabled>Select</option>
            <option value="monday">จันทร์</option>
            <option value="tuesday">อังคาร</option>
            <option value="wednesday">พุธ</option>
            <option value="thursday">พฤหัสบดี</option>
            <option value="friday">ศุกร์</option>
          </select>

          <label for="name">เวลา :</label>
          <input
            type="text"
            class="form-control"
            placeholder="กรอกเวลา"
            v-model="this.time_1"
          />

          <!-- <label for="select"> วัน :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.day_2"
          >
            <option selected disabled>Select</option>
          </select>

          <label for="name">เวลา :</label>
          <input
            type="text"
            class="form-control"
            placeholder="กรอกเวลา"
            v-model="this.time_2"
          /> -->

          <div class="button-group">
            <button class="popup-close btn btn-success">Confirm</button>
            &nbsp;
            <button
              type="button"
              class="popup-close btn btn-danger"
              @click="togglePopupCreateCourse()"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </CreatePopup>
    <ListCourseData
      :filterOptions="filterOptions"
      :filterValue="filterValue"
      :courses="filterList"
      :subjects="subject_name_list"
      :instructors="instructor_name_list"
      :classes="class_name_list"
      :locations="location_name_list"
    />
  </section>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import CreatePopup from "@/components/main/CreatePopup.vue";
import ListCourseData from "@/components/course/ListCourseData.vue";
export default {
  name: "CourseAdmin",
  components: {
    CreatePopup,
    ListCourseData,
  },
  data() {
    return {
      role: "",
      profile_id: "",
      popupTriggers: ref({
        buttonPopup: false,
      }),
      filterOptions: "",
      filterValue: "",
      sortOption: "Asc",
      sortBy: "",
      term_year: [],
      year: "",
      term: "",
      course_list: [],
      class_year: "",
      class_room: "",
      class_list: [],
      school_data: [],
      instructor_list: [],
      category: "",
      subject_list: [],
      instructor_name: "",
      subject_name: "",
      subject_name_list: [],
      instructor_name_list: [],
      class_name_list: [],
      location_name_list: [],
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
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    filterList() {
      if (this.filterValue.trim().length > 0) {
        if (this.filterOptions == "" || this.filterOptions == "name") {
          return this.course_list.filter((course) =>
            course.name
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        } else if (
          this.filterOptions == "" ||
          this.filterOptions == "class_id"
        ) {
          let tmp = [];
          for (var i = 0; i < this.class_name_list.length; i++) {
            if (
              this.class_name_list[i].class_name
                .trim()
                .toLowerCase()
                .includes(this.filterValue.trim().toLowerCase())
            ) {
              tmp.push(this.course_list[this.class_name_list[i].index]);
            }
          }
          return tmp;
        } else if (
          this.filterOptions == "" ||
          this.filterOptions == "instructor_id"
        ) {
          let tmp = [];
          for (i = 0; i < this.instructor_name_list.length; i++) {
            if (
              this.instructor_name_list[i].name
                .trim()
                .toLowerCase()
                .includes(this.filterValue.trim().toLowerCase())
            ) {
              tmp.push(this.course_list[this.instructor_name_list[i].index]);
            }
          }
          return tmp;
        } else if (
          this.filterOptions == "" ||
          this.filterOptions == "subject_id"
        ) {
          let tmp = [];
          for (i = 0; i < this.subject_name_list.length; i++) {
            if (
              this.subject_name_list[i].name
                .trim()
                .toLowerCase()
                .includes(this.filterValue.trim().toLowerCase())
            ) {
              tmp.push(this.course_list[this.subject_name_list[i].index]);
            }
          }
          return tmp;
        } else if (
          this.filterOptions == "" ||
          this.filterOptions == "location_id"
        ) {
          let tmp = [];
          for (i = 0; i < this.location_name_list.length; i++) {
            if (
              this.location_name_list[i].location_id
                .trim()
                .toLowerCase()
                .includes(this.filterValue.trim().toLowerCase())
            ) {
              tmp.push(this.course_list[this.location_name_list[i].index]);
            }
          }
          console.log(tmp);
          return tmp;
        } else if (this.filterValue.trim().length > 0) {
          if (this.filterOptions == "" || this.filterOptions == "credit") {
            return this.course_list.filter((course) =>
              course.credit.includes(this.filterValue.trim().toLowerCase())
            );
          } else if (this.filterValue.trim().length > 0) {
            if (
              this.filterOptions == "" ||
              this.filterOptions == "number_of_student"
            ) {
              return this.course_list.filter(
                (course) =>
                  String(course.number_of_student) ===
                  this.filterValue.trim().toLowerCase()
              );
            }
          }
        }
      }

      return this.course_list;
    },
  },
  methods: {
    sortValue() {
      if (this.sortOption == "Asc") {
        if (this.sortBy === "name") {
          this.course_list.sort((a, b) => (a.name > b.name ? 1 : -1));
        } else if (this.sortBy === "credit") {
          this.course_list.sort((a, b) => (a.credit > b.credit ? 1 : -1));
        } else if (this.sortBy === "number_of_student") {
          this.course_list.sort((a, b) =>
            a.number_of_student > b.number_of_student ? 1 : -1
          );
        }
      } else if (this.sortOption == "Desc") {
        if (this.sortBy === "name") {
          this.course_list.sort((a, b) => (a.name < b.name ? 1 : -1));
        } else if (this.sortBy === "credit") {
          this.course_list.sort((a, b) => (a.credit < b.credit ? 1 : -1));
        } else if (this.sortBy === "number_of_student") {
          this.course_list.sort((a, b) =>
            a.number_of_student < b.number_of_student ? 1 : -1
          );
        }
      }
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

          for (var i = 0; i < this.course_list.length; i++) {
            let indexI = i;
            this.class_name_list.push({
              index: i,
            });
            this.course_list[i].class_id_index = indexI;
            axios
              .get(
                "http://127.0.0.1:8080/class/id?class_id=" +
                  this.course_list[indexI].class_id
              )
              .then((res) => {
                this.class_name =
                  res.data.data.class.class_year +
                  "/" +
                  res.data.data.class.class_room;
                // this.class_name_list[indexI] = this.class_name;
                this.class_name_list[indexI].class_name = this.class_name;
                console.log("this.class_name", this.class_name);
              });
            this.course_list[i].subject_id_index = indexI;
            this.subject_name_list.push({
              index: i,
            });
            axios
              .get(
                "http://127.0.0.1:8080/subject/id?subject_id=" +
                  this.course_list[indexI].subject_id
              )
              .then((res) => {
                console.log(res.data.data.subject.name);
                // this.subject_name_list[indexI] = res.data.data.subject.name;
                this.subject_name_list[indexI].name =
                  res.data.data.subject.name;
                console.log("this.subject_name_list", this.subject_name_list);
              });
            this.course_list[i].instructor_id_index = indexI;
            this.instructor_name_list.push({
              index: i,
            });
            axios
              .get(
                "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
                  this.course_list[indexI].instructor_id +
                  "&role=teacher"
              )
              .then((response) => {
                // this.instructor_name_list[indexI] =response.data.data.profile.name;
                this.instructor_name_list[indexI].name =
                  response.data.data.profile.name;
                console.log(response.data.data.profile.name);
              });
            this.course_list[i].location_id_index = indexI;
            this.location_name_list.push({
              index: i,
            });
            axios
              .get(
                "http://127.0.0.1:8080/location/id?location_id=" +
                  this.course_list[indexI].location_id
              )
              .then((response) => {
                // this.location_name_list[indexI] =response.data.data.location.location_id;
                this.location_name_list[indexI].location_id =
                  response.data.data.location.location_id;
                console.log(response.data.data.location.location_id);
              });
          }
          console.log(this.subject_name_list);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    togglePopupCreateCourse() {
      this.instructor_list = [];
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;

      axios
        .get("http://127.0.0.1:8080/school-data/subject-category")
        .then((response) => {
          // console.log(response.data.data.school_data);
          this.school_data = response.data.data.school_data;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://127.0.0.1:8080/location/all")
        .then((response) => {
          // console.log(response.data.data.school_data);
          this.location_list = response.data.data.location_list;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async submitForm() {
      // check
      // if (this.subject_id == "" || ins)

      for (let i = 0; i < this.instructor_list.length; i++) {
        if (this.instructor_list[i].name == this.instructor_name) {
          this.instructor_id = this.instructor_list[i].profile_id;
          break;
        }
      }

      for (let i = 0; i < this.class_list.length; i++) {
        if (this.class_list[i].class_room == this.class_room) {
          this.class_id = this.class_list[i].id;
          break;
        }
      }

      for (let i = 0; i < this.location_list.length; i++) {
        if (this.location_list[i].location_id == this.location_name) {
          this.location_id = this.location_list[i].location_id;
          break;
        }
      }

      let create_req = {
        subject_id: this.subject_id,
        instructor_id: this.instructor_id,
        class_id: this.class_id,
        location_id: this.location_id,
        date_time: [
          {
            day: this.day_1,
            time: [this.time_1],
          },
        ],
      };

      console.log(create_req);

      try {
        await axios
          .post("http://127.0.0.1:8080/course/create", create_req)
          .then((response) => {
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
    getSubjectList() {
      this.instructor_list = [];
      axios
        .get("http://127.0.0.1:8080/subject/category?category=" + this.category)
        .then((response) => {
          // console.log(response.data.data.school_data);
          this.subject_list = response.data.data.subject_list;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getInstructorlist() {
      this.instructor_list = [];
      for (let i = 0; i < this.subject_list.length; i++) {
        if (this.subject_list[i].name === this.subject_name) {
          this.subject_id = this.subject_list[i].subject_id;
          if (this.subject_list[i].instructor_id === null) {
            return;
          }
          for (let j = 0; j < this.subject_list[i].instructor_id.length; j++) {
            axios
              .get(
                "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
                  this.subject_list[i].instructor_id[j] +
                  "&role=teacher"
              )
              .then((response) => {
                // this.instructor_list = response.data.data.subject_list;
                this.instructor_list.push(response.data.data.profile);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          break;
        }
      }
    },
    getClassByClassYear() {
      axios
        .get("http://127.0.0.1:8080/class/all?class_year=" + this.class_year)
        .then((response) => {
          // console.log(response.data.data.school_data);
          this.class_list = response.data.data.class_list;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          this.class_list = [];
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
