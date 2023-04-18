<template>
  <form class="container pt-5 " @submit.prevent="submitForm">
    <div class="row d-flex form-control w-75 mx-auto p-4">
      <div class="col-4 p-3 mx-auto" >
        <div>
          <label for="select"> หมวดหมู่ :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.category"
            @change="getSubjectList()"
          >
            <option selected disabled value="">Select</option>
            <option v-for="item in this.school_data" :key="item.id">
              {{ item.subject_category }}
            </option>
          </select>
        </div>
        <div class="p-1">
          <label for="select"> ชั้น :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.class_year"
            @change="getClassByClassYear()"
          >
            <option selected disabled value="">Select</option>
            <option value="1">ม.1</option>
            <option value="2">ม.2</option>
            <option value="3">ม.3</option>
            <option value="4">ม.4</option>
            <option value="5">ม.5</option>
            <option value="6">ม.6</option>
          </select>
        </div>
        <div class="p-1">
          <label for="select"> วันที่ 1 :</label>
          <select class="form-select" aria-label="Select" v-model="this.day_1">
            <option selected disabled value="">เลือกวัน</option>
            <option value="monday">จันทร์</option>
            <option value="tuesday">อังคาร</option>
            <option value="wednesday">พุธ</option>
            <option value="thursday">พฤหัสบดี</option>
            <option value="friday">ศุกร์</option>
          </select>
        </div>
        <div class="p-1">
          <label for="select"> วันที่ 2 :</label>
          <select class="form-select" aria-label="Select" v-model="this.day_2">
            <option selected disabled value="">เลือกวัน</option>
            <option value="monday">จันทร์</option>
            <option value="tuesday">อังคาร</option>
            <option value="wednesday">พุธ</option>
            <option value="thursday">พฤหัสบดี</option>
            <option value="friday">ศุกร์</option>
          </select>
        </div>
      </div>
      <div class="col-4 p-2">
        <div>
          <label for="select"> วิชา :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.subject_name"
            @change="getInstructorlist()"
          >
            <option selected disabled value="">Select</option>
            <option v-for="item in this.subject_list" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="select"> ห้อง :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.class_room"
          >
            <option selected disabled value="">Select</option>
            <option v-for="item in this.class_list" :key="item.id">
              {{ item.class_room }}
            </option>
          </select>
        </div>
        <div>
          <label for="name">เวลาเริ่มวันที่1 :</label>
          <input
            type="time"
            class="form-control"
            placeholder="กรอกเวลา"
            v-model="this.time_1_start"
          />
        </div>
        <div>
          <label for="name">เวลาเริ่มวันที่ 2 :</label>
          <input
            type="time"
            class="form-control"
            placeholder="กรอกเวลา"
            v-model="this.time_2_start"
          />
        </div>
      </div>
      <div class="col-4 p-2">
        <div>
          <label for="select"> ผู้สอน :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.instructor_name"
          >
            <option selected disabled value="">Select</option>
            <option v-for="item in this.instructor_list" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="select"> สถานที่ :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.location_name"
          >
            <option selected disabled value="">Select</option>
            <option v-for="item in this.location_list" :key="item.id">
              {{ item.location_id }}
            </option>
          </select>
        </div>
        <div>
          <label for="name">เวลาจบวันที่1 :</label>
          <input
            type="time"
            class="form-control"
            placeholder="กรอกเวลา"
            v-model="this.time_1_end"
            maxlength="16.00"
          />
        </div>
        <div>
          <label for="name">เวลาจบวันที่ 2 :</label>
          <input
            type="time"
            class="form-control"
            placeholder="กรอกเวลา"
            v-model="this.time_2_end"
          />
        </div>
      </div>

      <div class="button-group">
        <button class="popup-close btn btn-success">Confirm</button>
        &nbsp;
        <button
          type="button"
          class="popup-close btn btn-danger"
          @click="cancelCourse()"
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateCourseVue",
  data() {
    return {
      category: "",
      school_data: [],
      subject_name: "",
      subject_list: [],
      instructor_name: "",
      instructor_list: [],
      class_year: "",
      class_room: "",
      class_list: [],
      location_name: "",
      location_list: [],
      day_1: "",
      time_1_start: "",
      time_1_end: "",
      day_2: "",
      time_2_start: "",
      time_2_end: "",
    };
  },
  async created() {
    this.instructor_list = [];

    await axios
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

  methods: {
    getCourseList() {
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
    // togglePopupCreateCourse() {
    //   this.instructor_list = [];
    //   this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;

    //   axios
    //     .get("http://127.0.0.1:8080/school-data/subject-category")
    //     .then((response) => {
    //       // console.log(response.data.data.school_data);
    //       this.school_data = response.data.data.school_data;
    //       //   console.log(  this.school_data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    //   axios
    //     .get("http://127.0.0.1:8080/location/all")
    //     .then((response) => {
    //       // console.log(response.data.data.school_data);
    //       this.location_list = response.data.data.location_list;
    //       //   console.log(  this.school_data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    cancelCourse() {
      this.$router.push("/courses");
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
            this.$swal("Success!", response.data.message, "success");
            this.$router.push("/courses");
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
