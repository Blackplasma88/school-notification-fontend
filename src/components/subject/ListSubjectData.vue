<template>
  <div>
    <h2>List of Subject</h2>
    <!-- {{ subjects }} -->
    <div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">รหัสวิชา</th>
            <th scope="col">หมวดหมู่</th>
            <th scope="col">ชื่อวิชา</th>
            <th scope="col">หน่วยกิต</th>
            <th scope="col">ชั้นปี</th>
            <th scope="col">ผู้สอน</th>
            <th scope="col">ผู้สอน</th>
            <th scope="col">ผู้สอน</th>
            <th scope="col">หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in dataForPagination" :key="subject.id">
            <td>{{ subject.subject_id }}</td>
            <td>{{ subject.category }}</td>
            <td>{{ subject.name }}</td>
            <td>{{ subject.credit }}</td>
            <td>ม.{{ subject.class_year }}</td>
            <td>{{ subject.instructor_id }}</td>
            <td>{{ subject.instructor_id }}</td>
            <td>{{ subject.instructor_id }}</td>

            <td>
              <!-- <router-link :to="'/subject/edit/' + subject.id"> -->
              <button class="btn btn-primary">อัพเดตผู้สอน</button>
              <!-- </router-link> -->
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
  name: "ListSubjectData",
  components: {},
  data() {
    return {
      subjects: [],
      dataForPagination: [],
      elementPerpage: 10,
      currentPage: 1,
    };
  },
  mounted() {
    axios.get("http://127.0.0.1:8080/subject/all").then((response) => {
      console.log("subject_list");
      console.log(response.data.data.subject_list);
      this.subjects = response.data.data.subject_list;
      console.log("this.subjects", this.subjects);
      this.getDataPagination(1);
      console.log("this.dataForPagination", this.dataForPagination);
    });
  },
  methods: {
    totalPage() {
      return Math.ceil(this.subjects.length / this.elementPerpage);
    },
    getDataPagination(NumberPage) {
      this.currentPage = NumberPage;
      this.dataForPagination = [];
      let start = (NumberPage - 1) * this.elementPerpage;
      let end = NumberPage * this.elementPerpage;
      this.dataForPagination = this.subjects.slice(start, end);
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
  },
};
</script>

<style></style>
