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
      <div  v-if="this.course_list.length !== 0 || (this.term !== '' && this.year !== '')">
        <select v-if="this.role === 'teacher'"
          class="form-select"
          aria-label="Select"
          v-model="this.course_name"
          @change="getCheckNamaList()"
        >
          <option selected disabled value="">select course name</option>
          <option v-for="item in this.course_list" :key="item.id">
            {{ item.name }}
          </option>
        </select>

        <select v-if="this.role === 'student'"
        class="form-select"
        aria-label="Select"
        v-model="this.course_name"
        @change="getCheckNamaOfStudent()"
      >
        <option selected disabled value="">select course name</option>
        <option v-for="item in this.course_list" :key="item.id">
          {{ item.name }}
        </option>
      </select>
      </div>
      &nbsp;
      <div v-if="this.date_list.length !== 0">
        <select
          class="form-select"
          aria-label="Select"
          v-model="this.date"
          @change="getCheckNameDateData()"
        >
          <option selected disabled value="">select date</option>
          <option v-for="item in this.date_list" :key="item.id">
            {{ item }}
          </option>
        </select>
      </div>
      &nbsp;
      <div class="btnAddDate" v-if="role === 'teacher' && this.course_name !== ''">
        <button
          v-if="this.role === 'teacher'"
          type="button"
          class="btn btn-secondary"
          @click="togglePopupAddDate()"
        >
          add date
        </button>
      </div>
      &nbsp;
      <div>
        <button 
          v-if="this.role === 'teacher' && this.date !== '' && this.date_data.status === 'progress'"
          type="button"
          class="btn btn-secondary"
          @click="openCamera()"
        >
          open camera
        </button>
      </div>
      &nbsp;
      <div>
        <button 
          v-if="this.role === 'teacher' && this.date !== '' && this.date_data.status === 'progress'"
          type="button"
          class="btn btn-secondary"
          @click="endDate()"
        >
          end date
        </button>
      </div>
    </div>
    <CreatePopup v-if="popupTriggers.buttonPopupAddDate">
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="select"> date :</label>
          <input
            type="date"
            class="form-control"
            placeholder="date"
            v-model="this.check_name_data_new.date"
          />

          <label for="select"> time late :</label>
          <input
            type="number"
            class="form-control"
            placeholder="time late"
            v-model="this.check_name_data_new.time_late"
          />

          <div class="button-group">
            <button class="popup-close btn btn-success">Confirm</button>
            &nbsp;
            <button
              type="button"
              class="popup-close btn btn-danger"
              @click="togglePopupAddDate()"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </CreatePopup>
    <ListCheckNameManage
      :check_names="this.check_name_data_list"
      :student_names="this.student_name_list"
      :course_list="this.course_list"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import CreatePopup from "@/components/main/CreatePopup.vue";
import ListCheckNameManage from "@/components/check-name/ListCheckNameManage.vue";
export default {
  name: "CheckNamaManage",
  components: {
    CreatePopup,
    ListCheckNameManage,
  },
  data() {
    return {
      role: "",
      profile_id: "",
      popupTriggers: ref({
        buttonPopupAddDate: false,
        buttonPopupOpenCamera: false,
      }),
      year: "",
      term: "",
      term_year: [],
      course_list: [],
      course_id: "",
      course_name: "",
      date_list: [],
      date: "",
      date_data: {},
      check_name_data_list: [],
      check_name_data_new: {
        date: "",
        time_late: 0,
      },
      model_ready: false,
      student_name_list: [],
    };
  },
  created() {
    this.profile_id = localStorage.getItem("profile_id");
    this.role = localStorage.getItem("role");
    axios
      .get("http://127.0.0.1:8080/school-data/term-year-data")
      .then((response) => {
        // console.log(response.data.data.school_data);
        this.term_year = response.data.data.school_data;
        // console.log(  this.term_year);
      })
      .catch((error) => {
        console.log(error);
        this.$swal("Error!", error.response.data.message, "error");
      });
  },
  methods: {
    togglePopupOpenCamera() {
      this.popupTriggers.buttonPopupOpenCamera =
        !this.popupTriggers.buttonPopupOpenCamera;
    },
    togglePopupAddDate() {
      this.popupTriggers.buttonPopupAddDate =
        !this.popupTriggers.buttonPopupAddDate;
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
    async getCheckNamaList() {
      console.log(this.course_name);
      for (let i = 0; i < this.course_list.length; i++) {
        if (this.course_list[i].name == this.course_name) {
          this.course_id = this.course_list[i].id;
          break;
        }
      }
      console.log(this.course_id);
      console.log(this.role);
      console.log(this.profile_id);
      axios
        .get(
          "http://127.0.0.1:8080/check-name/check-name-in-course?course_id=" +
            this.course_id +
            "&role=" +
            this.role +
            "&id=" +
            this.profile_id
        )
        .then((response) => {
          console.log(response.data.data);
          this.date_list = response.data.data.date_list;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getCheckNameDateData() {
      axios
        .get(
          "http://127.0.0.1:8080/check-name/check-name-data?course_id=" +
            this.course_id +
            "&date=" +
            this.date 
        )
        .then((response) => {
          console.log(response.data.data.date_data);
          this.date_data = response.data.data.date_data;
          console.log(response.data.data.date_data.check_name_data);
          console.log(this.date_data);
          this.check_name_data_list =
            response.data.data.date_data.check_name_data;

          console.log(this.check_name_data_list);
          for (var i = 0; i < this.check_name_data_list.length; i++) {
            let indexI = i;
            axios
              .get(
                "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
                  this.check_name_data_list[indexI].student_id +
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
      this.check_name_data_new.course_id = this.course_id;
      console.log(this.course_id);
      console.log(this.check_name_data_new.course_id);
      console.log(this.check_name_data_new);
      axios
        .post(
          "http://127.0.0.1:8080/check-name/add-date",
          this.check_name_data_new
        )
        .then(() => {
          this.popupTriggers.buttonPopupAddDate =
            !this.popupTriggers.buttonPopupAddDate;
          window.location.reload();

          // console.log(response.data.data.school_data);
          // this.subject_list = response.data.data.subject_list;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async openCamera() {
      axios
        .get("http://127.0.0.1:8080/course/id?course_id=" + this.course_id)
        .then((res) => {
          let class_id = res.data.data.course.class_id;
          axios
            .get(
              "http://127.0.0.1:8080/face-detection/class_id?class_id=" +
                res.data.data.course.class_id
            )
            .then((res) => {
              if (res.data.data.data.status === "yes") {
                axios
                  .get(
                    "http://127.0.0.1:8080/face-detection/open-camera?class_id=" +
                      class_id +
                      "&course_id=" +
                      this.course_id
                  )
                  .then((res) => {
                    console.log(res.data.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async endDate(){
      for (let i = 0; i < this.course_list.length; i++) {
        if (this.course_list[i].name == this.course_name) {
          this.course_id = this.course_list[i].id;
          break;
        }
      }

      await axios
        .post("http://127.0.0.1:8080/check-name/end-date",{
          course_id: this.course_id,
          date:this.date
        })
        .then((response) => {
            this.$swal("Success!", response.data.message, "success").then(
              () => {
                window.location.reload();
              }
            );
        })
        .catch((error) => {
          console.log(error);
          this.$swal("Error!", error.response.data.message, "error");
        });
    },
    getCheckNamaOfStudent(){
      console.log(this.course_name);
      for (let i = 0; i < this.course_list.length; i++) {
        if (this.course_list[i].name == this.course_name) {
          this.course_id = this.course_list[i].id;
          break;
        }
      }

      axios
      .get(
          "http://127.0.0.1:8080/check-name/check-name-data?course_id=" +
            this.course_id 
        )
        .then((response) => {
          console.log(response.data.data.date_data);
          this.check_name_data_list = response.data.data.date_data;
          // console.log(response.data.data.date_data.check_name_data);
          // console.log(this.date_data);
          // this.check_name_data_list =
          //   response.data.data.date_data.check_name_data;

          // console.log(this.check_name_data_list);
          // for (var i = 0; i < this.check_name_data_list.length; i++) {
          //   let indexI = i;
          //   axios
          //     .get(
          //       "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
          //         this.check_name_data_list[indexI].student_id +
          //         "&role=student"
          //     )
          //     .then((response) => {
          //       console.log(response.data.data.profile.name);
          //       this.student_name_list[indexI] =
          //         response.data.data.profile.name;
          //       console.log(this.student_name_list);
              // });
          // }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style></style>
