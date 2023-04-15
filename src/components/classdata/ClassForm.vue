<template>
  <section>
    <div class="filter">
      <div class="search-wrapper d-flex">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          v-model="searchValue"
        />
        <!-- &nbsp;
        <button class="btn btn-secondary" type="button">
          <font-awesome-icon icon="fa-solid fa-search" />
        </button> -->
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
          name="class_yaer"
          id="class_yaer"
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
      <button type="button" class="btn btn-secondary" @click="submitForm">
        Create Class
      </button>
    </div>
    <div v-if="this.class_year === '1'">
      <ListClassData :class_year="this.class_year"  />
    </div>
    <div v-else-if="this.class_year === '2'">
      <ListClassData :class_year="this.class_year" />
    </div>
    <div v-else-if="this.class_year === '3'">
      <ListClassData :class_year="this.class_year" />
    </div>
    <div v-else-if="this.class_year === '4'">
      <ListClassData :class_year="this.class_year" />
    </div>
    <div v-else-if="this.class_year === '5'">
      <ListClassData :class_year="this.class_year" />
    </div>
    <div v-else-if="this.class_year === '6'">
      <ListClassData :class_year="this.class_year" />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ListClassData from "@/components/classdata/ListClassData.vue";
export default {
  name: "ClassForm",
  components: {
    ListClassData,
  },
  data() {
    return {
      searchValue: "",
      class_filter: "",
      class_sort: "",
      popupTriggers: {
        buttonPopup: false,
      },
      class: {
        id: "",
        class_year: "",
        class_room: "",
        number_of_student: "",
        advisor_id: "",
        student_id_list: [],
      },
      class_year: "",
    };
  },

  methods: {
    async submitForm() {
      console.log("create Location", this.location);

      try {
        await axios
          .post("http://127.0.0.1:8080/class/create", this.class)
          .then((response) => {
            console.log(response);
            this.$swal("Success", "สร้างห้องใหม่สำเร็จ", "success").then(() => {
              window.location.reload();
            });
          });
      } catch (error) {
        console.log(error);
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
