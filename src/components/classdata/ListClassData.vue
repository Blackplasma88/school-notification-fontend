<template>
  <div>
    <h2>List of Class</h2>
    <div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ชั้นปี</th>
            <th scope="col">ห้อง</th>
            <th scope="col">จำนวนนักเรียน</th>
            <th scope="col">จำนวนคอร์ส</th>
            <th scope="col">ที่ปรึกษา</th>
            <th scope="col">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in dataForPagination" :key="c.class_id">
            <td>ม.{{ c.year }}</td>
            <td>{{ c.room }}</td>
            <td>{{ c.count_of_students }}</td>
            <td>{{ c.count_of_courses }}</td>
            <td>{{ c.advisor }}</td>
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
export default {
  data() {
    return {
      classes: [
        {
          class_id: 1,
          year: 1,
          room: 1,
          count_of_students: 10,
          count_of_courses: 5,
          advisor: "อาจารย์ 1",
          student_list: [
            {
              student_id: 1,
              student_name: "A",
            },
            {
              student_id: 2,
              student_name: "B",
            },
            {
              student_id: 3,
              student_name: "C",
            },
            {
              student_id: 4,
              student_name: "D",
            },
            {
              student_id: 5,
              student_name: "E",
            },
            {
              student_id: 6,
              student_name: "F",
            },
            {
              student_id: 7,
              student_name: "G",
            },
            {
              student_id: 8,
              student_name: "H",
            },
            {
              student_id: 9,
              student_name: "I",
            },
            {
              student_id: 10,
              student_name: "J",
            },
          ],
        },
        {
          class_id: 2,
          year: 1,
          room: 2,
          count_of_students: 5,
          count_of_courses: 1,
          advisor: "อาจารย์ 2",
          student_list: [
            {
              student_id: 1,
              student_name: "A",
            },
            {
              student_id: 2,
              student_name: "B",
            },
            {
              student_id: 3,
              student_name: "C",
            },
            {
              student_id: 4,
              student_name: "D",
            },
            {
              student_id: 5,
              student_name: "E",
            },
          ],
        },
        {
          class_id: 3,
          year: 2,
          room: 2,
          count_of_students: 4,
          count_of_courses: 5,
          advisor: "อาจารย์ 3",
          student_list: [
            {
              student_id: 1,
              student_name: "A",
            },
            {
              student_id: 2,
              student_name: "B",
            },
            {
              student_id: 3,
              student_name: "C",
            },
            {
              student_id: 4,
              student_name: "D",
            },
          ],
        },
      ],
      dataForPagination: [],
      elementPerpage: 10,
      currentPage: 1,
    };
  },
  mounted() {
    this.getDataPagination(1);
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
