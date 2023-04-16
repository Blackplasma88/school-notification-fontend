<template>
  <div>
    <h2>List of Teachers</h2>
    <!-- {{ teachers }}
    {{ classes }} -->
    <!-- {{ subjects }} -->
    <div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">รหัสอาจารย์</th>
            <th scope="col">ชื่อ - สกุล</th>
            <th scope="col">ภาควิชา</th>
            <th scope="col">ชั้นปีที่ดูแล</th>
            <th scope="col">วิชาที่สอน</th>
            <th scope="col">คอร์สในภาคเรียนนี้</th>
            <th scope="col">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(teacher, i) in teachers" :key="teacher.id">
            <td>{{ teacher.profile_id }}</td>
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.category }}</td>
            <td>
              <div v-if="teacher.class_in_counseling != ''">
                <td>ม.{{ classes[i] }}</td>
              </div>
              <div v-else>
                <td>ไม่มี</td>
              </div>
            </td>
            <td>
              <div v-if="teacher.subject_id != ''">
                <td>
                  {{ subjects[i] }}
                </td>
              </div>
              <div v-else>
                <td>ไม่มี</td>
              </div>
            </td>
            <td>
              <div v-if="teacher.course_teaches_list[i] != null">
                {{ teacher.course_teaches_list[i].course_id_list.length }}
              </div>
              <div v-else>
                <td>ไม่มี</td>
              </div>
            </td>
            <td>
              <button
                class="btn btn-primary"
                @click="viewData(teacher.profile_id)"
              >
                รายละเอียด
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li v-on:click="getPreviousPage()" class="page-item">
          <a class="page-link">Previous</a>
        </li>
        <li
          v-for="indexPage in totalPage()"
          :key="indexPage"
          v-on:click="getDataPagination(indexPage)"
          class="page-item"
          :class="isActive(indexPage)"
        >
          <a class="page-link" href="#">{{ indexPage }}</a>
        </li>

        <li v-on:click="getNextPage()" class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "ListTeacherProfile",
  data() {
    return {
      dataForPagination: [],
      elementPerpage: 10,
      currentPage: 1,
      class_name: "",
      class_name_list: [],
    };
  },
  props: {
    teachers: Array,
    filterValue: String,
    filterOptions: String,
    classes: Array,
    subjects: Array,
  },

  methods: {
    totalPage() {
      return Math.ceil(this.teachers.length / this.elementPerpage);
    },
    getDataPagination(NumberPage) {
      this.currentPage = NumberPage;
      this.dataForPagination = [];
      let start = (NumberPage - 1) * this.elementPerpage;
      let end = NumberPage * this.elementPerpage;
      this.dataForPagination = this.teachers.slice(start, end);
    },
    getPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getDataPagination(this.currentPage);
      }
    },
    getNextPage() {
      if (this.currentPage < this.totalPage()) {
        this.currentPage++;
        this.getDataPagination(this.currentPage);
      }
    },
    isActive(NumberPage) {
      return NumberPage == this.currentPage ? "active" : "";
    },
    viewData(profile_id) {
      console.log("teacher profile id ", profile_id);
      this.$router.push("/profile/teacher/" + profile_id + "");
    },
  },
};
</script>

<style></style>
