<template>
  <div>
    <h2>List of students</h2>
    <!-- {{ students }} -->
    <!-- List {{ filterOptions }} List {{ filterValue }} -->
    <!-- {{ classes }} -->
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
          <tr v-for="(student) in students" :key="student.id">
            <td>{{ student.profile_id }}</td>
            <td>{{ student.name }}</td>
            <td>
              <div v-if="student.class_id != ''">
                <td>ม.{{ classes[student.class_name_index] }}</td>
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
export default {
  name: "ListStudentProfile",
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
    students: Array,
    filterValue: String,
    filterOptions: String,
    classes: Array,
  },
  mounted() {},
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
      console.log("student profile id ", profile_id);
      this.$router.push("/profile/student/" + profile_id + "");
    },
  },
};
</script>

<style></style>
