<template>
  <div>
    <h2>List of students</h2>
    <!-- {{ students }} -->
    <div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">รหัสนักเรียน</th>
            <th scope="col">ชื่อ - สกุล</th>
            <th scope="col">ชั้นปี</th>
            <th scope="col">ผู้ปกครอง</th>
            <th scope="col">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, i) in dataForPagination" :key="student.id">
            <td>{{ student.profile_id }}</td>
            <td>{{ student.name }}</td>
            <td>
              <div v-if="student.class_id != ''">
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
              <div v-if="student.parent_id != ''">
                <td>
                  {{ student.parent_id }}
                </td>
              </div>
              <div v-else>
                <td>ไม่มี</td>
              </div>
            </td>
            <td>
              <button
                class="btn btn-primary"
                @click="viewData(student.profile_id)"
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
  name: "ListStudentProfile",
  data() {
    return {
      students: [],
      dataForPagination: [],
      elementPerpage: 10,
      currentPage: 1,
      class_name: "",
      class_name_list: [],
    };
  },
  mounted() {
    axios.get("http://127.0.0.1:8080/profile/all?role=student").then((res) => {
      console.log("student_list", res.data.data.profile_list);
      this.students = res.data.data.profile_list;
      console.log("student_list", this.students);
      this.getDataPagination(1);
      console.log("this.dataForPagination", this.dataForPagination);

      for (var i = 0; i < this.students.length; i++) {
        let indexI = i;
        this.class_name_list.push("");
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
  methods: {
    totalPage() {
      return Math.ceil(this.students.length / this.elementPerpage);
    },
    getDataPagination(NumberPage) {
      this.currentPage = NumberPage;
      this.dataForPagination = [];
      let start = (NumberPage - 1) * this.elementPerpage;
      let end = NumberPage * this.elementPerpage;
      this.dataForPagination = this.students.slice(start, end);
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
      this.$router.push("/profile/student/" + profile_id);
    },
  },
};
</script>

<style></style>
