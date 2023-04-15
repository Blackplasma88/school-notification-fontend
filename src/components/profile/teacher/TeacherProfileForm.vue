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
        &nbsp;
        <button type="button" class="btn btn-secondary">
          <font-awesome-icon icon="fa-solid fa-search" />
        </button>
        {{ filterValue }}
      </div>
      <div class="filter">
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="class_filter"
            id="class_filter"
            v-model="class_filter"
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
            name="class_sort"
            id="class_sort"
            v:model:value="class_sort"
          >
            <option selected disabled value="">Sort by</option>
            <option value="class_year">ชั้นปี</option>
            <option value="class_room">ห้อง</option>
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
        Create Profile
      </button>
    </div>
    <CreatePopup
      v-if="popupTriggers.buttonPopup"
      @close="TogglePopup('buttonPopup')"
    >
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="name">รหัสอาจารย์ :</label>
          <input
            type="text"
            class="form-control"
            id="profile_id"
            placeholder="กรอกรหัสอาจารย์"
            v-model="profile.profile_id"
          />

          <label for="name">ชื่อ - สกุล :</label>
          <input
            type="text"
            class="form-control"
            id="profile_id"
            placeholder="กรอกชื่อ - สกุล"
            v-model="profile.name"
          />

          <label for="select"> หมวดหมู่ :</label>
          <select
            class="form-select"
            aria-label="Select"
            name="category"
            id="category"
            v-model="profile.category"
          >
            <option v-for="index in subject_category_list" :key="index">
              {{ index }}
            </option>
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
    <ListTeacherProfile
      :filterOptions="filterOptions"
      :filterValue="filterValue"
      :teachers="teachers"
      :classes="class_name_list"
      :subjects="subject_name_list"
    />
  </section>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import ListTeacherProfile from "@/components/profile/teacher/ListTeacherProfile.vue";
import CreatePopup from "@/components/main/CreatePopup.vue";
export default {
  name: "TeacherProfileForm",
  components: {
    ListTeacherProfile,
    CreatePopup,
  },
  data() {
    return {
      popupTriggers: ref({
        buttonPopup: false,
      }),
      filterOptions: "",
      filterValue: "",
      class_filter: "",
      teachers: [],
      profile: {
        profile_id: "",
        name: "",
        role: "",
        category: "",
      },
      subject_category_list: [],
      class_name_list: [],
      subject_name_list: [],
    };
  },
  created() {
    axios.get("http://127.0.0.1:8080/profile/all?role=teacher").then((res) => {
      console.log("teacher_list", res.data.data.profile_list);
      this.teachers = res.data.data.profile_list;
      console.log("this.teachers", this.teachers);

      for (var i = 0; i < this.teachers.length; i++) {
        let indexI = i;
        this.class_name_list.push("");
        console.log(this.teachers[i].class_in_counseling);
        console.log(this.teachers[i].subject_id);
        axios
          .get(
            "http://127.0.0.1:8080/class/id?class_id=" +
              this.teachers[indexI].class_in_counseling
          )
          .then((res) => {
            this.class_name =
              res.data.data.class.class_year +
              "/" +
              res.data.data.class.class_room;
            this.class_name_list[indexI] = this.class_name;
            console.log("this.class_name", this.class_name);
          });

        axios
          .get(
            "http://127.0.0.1:8080/subject/id?subject_id=" +
              this.teachers[indexI].subject_id
          )
          .then((res) => {
            console.log(res.data.data.subject.name);
            this.subject_name_list[indexI] = res.data.data.subject.name;
            console.log("this.subject_name_list", this.subject_name_list);
          });
      }
      console.log("this.class_name_list", this.class_name_list);
    });
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
      console.log(this.subject_category_list);
    },

    async submitForm() {
      console.log("Create Profile", this.profile);
      console.log("submit");
      try {
        this.profile.role = "teacher";
        console.log("Create Profile", this.profile);
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
      this.profile.category = "";
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
