<template>
  <div>
    <h2>List of Teachers</h2>
    <!-- {{ teachers }} -->
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
          <tr v-for="(teacher, i) in dataForPagination" :key="teacher.id">
            <td>{{ teacher.profile_id }}</td>
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.category }}</td>
            <td>
              <div v-if="teacher.class_in_counseling != ''">
                <td>
                  ม.{{
                    this.class_name_list[
                      (this.currentPage - 1) * this.elementPerpage + i
                    ]
                  }}
                </td>
              </div>
              <div v-else>
                <td>ไม่มี</td>
              </div>
            </td>
            <td>
              <div v-if="teacher.subject_id != ''">
                <td>{{ teacher.subject_id }}</td>
              </div>
              <div v-else>
                <td>ไม่มี</td>
              </div>
            </td>
            <td>
              <div v-if="teacher.course_teaches_list.course_id_list != null">
                <td>{{ teacher.course_id_list.course_id_list.length - 1 }}</td>
              </div>
              <div v-else>
                <td>{{ 0 }}</td>
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
import axios from "axios";
export default {
  name: "ListTeacherProfile",
  data() {
    return {
      teachers: [],
      dataForPagination: [],
      elementPerpage: 10,
      currentPage: 1,
      class_name: "",
      class_name_list: [],
    };
  },
  mounted() {
    axios.get("http://127.0.0.1:8080/profile/all?role=teacher").then((res) => {
      console.log("teacher_list", res.data.data.profile_list);
      this.teachers = res.data.data.profile_list;
      console.log("this.teachers", this.teachers);
      this.getDataPagination(1);

      console.log("this.dataForPagination", this.dataForPagination);

      for (var i = 0; i < this.teachers.length; i++) {
        let indexI = i;
        this.class_name_list.push("");
        console.log(this.teachers[i].class_in_counseling);
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
      }
      console.log("this.class_name_list", this.class_name_list);
    });
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
      this.$router.push("/profile/teacher/" + profile_id);
    },
  },
};
</script>

<style></style>
