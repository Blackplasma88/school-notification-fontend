<template>
  <div>
    <h2>List of Class</h2>
    <div>
      <!-- {{ classes }} -->
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ชั้นปี</th>
            <th scope="col">ห้อง</th>
            <th scope="col">จำนวนนักเรียน</th>
            <th scope="col">ที่ปรึกษา</th>
            <th scope="col">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in dataForPagination" :key="c.id">
            <td>ม.{{ c.class_year }}</td>
            <td>{{ c.class_room }}</td>
            <td>{{ c.number_of_student }}</td>
            <td>{{ c.advisor_id }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
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
  name: "ListClassData",
  data() {
    return {
      classes: [],
      dataForPagination: [],
      elementPerpage: 10,
      currentPage: 1,
    };
  },
  mounted() {
    axios.get("http://127.0.0.1:8080/class/all?class_year=1").then((res) => {
      console.log("classes_list");
      console.log(res.data.data.class_list);
      this.classes = res.data.data.class_list;
      this.getDataPagination(1);
    });
  },
  methods: {
    totalPage() {
      return Math.ceil(this.classes.length / this.elementPerpage);
    },
    getDataPagination(NumberPage) {
      this.currentPage = NumberPage;
      this.dataForPagination = [];
      let start = (NumberPage - 1) * this.elementPerpage;
      let end = NumberPage * this.elementPerpage;
      this.dataForPagination = this.classes.slice(start, end);
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
