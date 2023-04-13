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
            <option value="class_year">ชั้นปี</option>
            <option value="class_room">ห้อง</option>
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
            <option value="class_year">ชั้นปี</option>
            <option value="class_room">ห้อง</option>
          </select>
        </div>
      </div>
    </div>
    <div class="rightContent">
      <button type="button" class="btn btn-secondary" @click="submitForm">
        Create Class
      </button>
    </div>
    <ListClassData />
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
  },
};
</script>

<style></style>
