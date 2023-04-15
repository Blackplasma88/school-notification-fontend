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
            name="category"
            id="category"
          >
            <option selected disabled>Filter</option>
            <option value="news">News</option>
            <option value="announce">Announce</option>
            <option value="activity">Activity</option>
          </select>
        </div>
        &nbsp;
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="category"
            id="category"
          >
            <option selected disabled>Sort by</option>
            <option value="news">News</option>
            <option value="announce">Announce</option>
            <option value="activity">Activity</option>
          </select>
        </div>
      </div>
    </div>
    <div class="rightContent">
      <button v-if='role === "admin"'
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
    <ListTeacherProfile />
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
      role:"",
      popupTriggers: ref({
        buttonPopup: false,
      }),
      profile: {
        profile_id: "",
        name: "",
        role: "",
        category: "",
      },
      subject_category_list: [],
    };
  },
  mounted(){
    this.role = localStorage.getItem("role")
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
