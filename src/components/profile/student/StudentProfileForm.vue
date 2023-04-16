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
            <option value="profile_id">รหัสนักเรียน</option>
            <option value="name">ชื่อ - สกุล</option>
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
            <option value="profile_id">รหัสอาจารย์</option>
            <option value="name">ชื่อ - สกุล</option>
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
      <button
        v-if="role === 'admin'"
        type="button"
        class="btn btn-secondary"
        @click="TogglePopup('buttonPopup')"
      >
        Create Profile
      </button>
    </div>
    <CreatePopup
      v-if="popupTriggers.buttonPopup"
      @close="TogglePopup('buttonPopup')"
    >
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="name">รหัสนักเรียน :</label>
          <input
            type="text"
            class="form-control"
            id="profile_id"
            placeholder="กรอกรหัสนักเรียน"
            v-model="profile.profile_id"
          />

          <label for="name">ชื่อ - สกุล :</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="กรอกชื่อ - สกุล"
            v-model="profile.name"
          />

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

    <ListStudentProfile
      :filterOptions="filterOptions"
      :filterValue="filterValue"
      :students="filterList"
      :classes="class_name_list"
    />
  </section>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import ListStudentProfile from "@/components/profile/student/ListStudentProfile.vue";
import CreatePopup from "@/components/main/CreatePopup.vue";
export default {
  name: "StudentProfileForm",
  components: {
    ListStudentProfile,
    CreatePopup,
  },
  data() {
    return {
      role: "",
      popupTriggers: ref({
        buttonPopup: false,
      }),
      filterOptions: "",
      filterValue: "",
      sortOption:"Asc",
      sortBy:"",
      class_filter: "",
      students: [],
      profile: {
        profile_id: "",
        name: "",
        role: "",
        class_id: "",
      },
      class_name: "",
      class_name_list: [],
      class_id_list: [],
      class_list: [],
    };
  },
  created() {
    this.role = localStorage.getItem("role");
    axios.get("http://127.0.0.1:8080/profile/all?role=student").then((res) => {
      console.log("student_list", res.data.data.profile_list);
      this.students = res.data.data.profile_list;
      console.log("student_list", this.students);
      console.log("this.dataForPagination", this.dataForPagination);

      for (var i = 0; i < this.students.length; i++) {
        let indexI = i;
        this.class_name_list.push("");
        this.students[i].class_name_index = indexI
        console.log(this.students[i].class_id);
        axios
          .get(
            "http://127.0.0.1:8080/class/id?class_id=" +
              this.students[indexI].class_id
          )
          .then((res) => {
            this.class_name =
              res.data.data.class.class_year +
              "/" +
              res.data.data.class.class_room;
            this.class_name_list[indexI] = this.class_name;
            console.log("this.class_name", this.class_name);
          });
      }
      console.log("this.class_name_list", this.class_name_list);
    });
  },
  computed: {
    filterList() {
      if (this.filterValue.trim().length > 0) {
        if (this.filterOptions == "" || this.filterOptions == "profile_id") {
          return this.students.filter((student) =>
            student.profile_id
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        } else if (this.filterOptions == "name") {
          return this.students.filter((student) =>
            student.name
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        }
      }
      return this.students;
    },
  },
  methods: {
    sortValue() {
      if (this.sortOption == "Asc") {
        if (this.sortBy === "profile_id") {
          this.students.sort((a, b) => (a.profile_id > b.profile_id ? 1 : -1));
        } else if (this.sortBy === "name") {
          this.students.sort((a, b) => (a.name > b.name ? 1 : -1));
        } 
      } else if (this.sortOption == "Desc") {
        if (this.sortBy === "profile_id") {
          this.students.sort((a, b) => (a.profile_id < b.profile_id ? 1 : -1));
        } else if (this.sortBy === "name") {
          this.students.sort((a, b) => (a.name < b.name ? 1 : -1));
        } 
      }
    },
    TogglePopup(trigger) {
      console.log(trigger);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      console.log(this.popupTriggers.buttonPopup);

      // axios
      //   .get("http://127.0.0.1:8080/class/all?class_year=1")
      //   .then((response) => {
      //     console.log(response.data.data.class_list);
      //     for (let i = 0; i < response.data.data.class_list.length; i++) {
      //       this.class_name =
      //         response.data.data.class_list[i].class_year +
      //         "/" +
      //         response.data.data.class_list[i].class_room;
      //       this.class_name_list.push(this.class_name);
      //       this.class_id_list.push(response.data.data.class_list[i].id);
      //     }
      //     console.log(this.class_name_list);
      //   });
    },
    ToggleClose(trigger) {
      console.log(trigger);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      console.log(this.popupTriggers.buttonPopup);
      this.resetForm();
    },

    async submitForm() {
      console.log("Create Profile", this.profile);
      console.log("submit");
      console.log(this.class_id_list);
      console.log(this.class_name);
      let class_id = "";
      for (let i = 0; i < this.class_list.length; i++) {
        if (this.class_room == this.class_list[i].class_room) {
          class_id = this.class_list[i].id;
          break;
        }
      }
      console.log(class_id);
      try {
        this.profile.role = "student";
        console.log("Create Profile", this.profile);
        this.profile.class_id = class_id;
        console.log(this.profile);
        await axios
          .post("http://127.0.0.1:8080/profile/create", this.profile)
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
      this.profile.profile_id = "";
      this.profile.name = "";
      this.profile.role = "";
      this.profile.class_id = "";
      this.class_name = "";
      this.class_name_list = [];
      this.class_id_list = [];
      this.class_list = [];
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
