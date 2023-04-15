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
      <div>
        <select
          class="form-select"
          aria-label="Select"
          name="class_year"
          id="class_year"
          v-model="this.class_year"
          @change="press"
        >
          <option selected disabled value="">ชั้นปี</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      &nbsp;
      <button type="button" class="btn btn-secondary" @click="submitForm">
        Create Class
      </button>
    </div>
    <ListClassData
      :filterOptions="filterOptions"
      :filterValue="filterValue"
      :classes="classes"
      :advisors="advisor_name_list"
    />
  </section>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import ListClassData from "@/components/classdata/ListClassData.vue";
export default {
  name: "ClassForm",
  components: {
    ListClassData,
  },
  data() {
    return {
      popupTriggers: ref({
        buttonPopup: false,
      }),
      classes: [],
      class: {
        id: "",
        class_year: "",
        class_room: "",
        number_of_student: "",
        advisor_id: "",
        student_id_list: [],
      },
      class_year: "",

      filterOptions: "",
      filterValue: "",
      class_filter: "",

      advisor: {
        class_id: "",
        year: "",
        room: "",
        advisor_id: "",
        advisor_name: "",
      },
      advisor_list: [],
      advisor_list_id: [],
      advisor_name_list: [],
    };
  },
  created() {
    axios
      // .get("http://127.0.0.1:8080/class/all?class_year=" + this.class_year)
      .get("http://127.0.0.1:8080/class/all?class_year=1")
      .then((response) => {
        console.log("classes_list");
        console.log(response.data.data.class_list);
        this.classes = response.data.data.class_list;

        console.log("this.dataForPagination", this.dataForPagination);
        console.log("this.advisor_name_list", this.advisor_name_list);
        for (var i = 0; i < this.classes.length; i++) {
          let indexI = i;
          this.advisor_name_list.push("");
          console.log(this.classes[i].advisor_id);
          if (this.classes[i].advisor_id != "") {
            console.log("advisor", this.classes[i].advisor_id);
            axios
              .get(
                "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
                  this.classes[indexI].advisor_id +
                  "&role=teacher"
              )
              .then((response) => {
                this.advisor_name_list[indexI] =
                  response.data.data.profile.name;
                console.log(response.data.data.profile.name);
              });
          }
          console.log("this.advisor_name_list", this.advisor_name_list);
        }
      });
  },

  methods: {
    async submitForm() {
      console.log("create Location", this.location);

      try {
        await axios
          .post("http://127.0.0.1:8080/class/create", this.class)
          .then((response) => {
            console.log(response);
            this.$swal("Success", response.data.message, "success").then(() => {
              window.location.reload();
            });
          });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    press() {
      console.log("press");
      console.log(this.class_year === "1");
      console.log(this.class_year);
    },
  },
  computed: {},
};
</script>

<style></style>
