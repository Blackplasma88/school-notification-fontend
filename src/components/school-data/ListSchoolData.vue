<template>
  <div>
    <h2>List of School Data</h2>
    <!-- {{ school_datas }} -->
    <div v-show="isShow == true">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ปีการศึกษา</th>
            <th scope="col">ภาคเรียน</th>
            <th scope="col">สถานะ</th>
            <th scope="col">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="school in school_datas" :key="school">
            <td>{{ school.year }}</td>
            <td>{{ school.term }}</td>
            <td>{{ school.status }}</td>
            <td>
              <button>อัพเดต</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-show="isShow == false">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ลำดับ</th>
            <th scope="col">ประเภท</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(school, i) in school_datas" :key="school">
            <td>{{ i + 1 }}</td>
            <td>{{ school.subject_category }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <nav aria-label="Page navigation example">
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
    </nav> -->
  </div>
</template>

<script>
export default {
  name: "ListSchoolData",
  data() {},
  props: {
    filterValue: String,
    filterOptions: String,
    school_datas: Array,
    isShow: Boolean,
  },
  methods: {
    // totalPage() {
    //   return Math.ceil(this.schoolDatas.length / this.elementPerpage);
    // },
    // getDataPagination(NumberPage) {
    //   this.currentPage = NumberPage;
    //   this.dataForPagination = [];
    //   let start = (NumberPage - 1) * this.elementPerpage;
    //   let end = NumberPage * this.elementPerpage;
    //   this.dataForPagination = this.teachers.slice(start, end);
    // },
    // getPreviousPage() {
    //   if (this.currentPage > 1) {
    //     this.currentPage--;
    //     this.getDataPagination(this.currentPage);
    //   }
    // },
    // getNextPage() {
    //   if (this.currentPage < this.totalPage()) {
    //     this.currentPage++;
    //     this.getDataPagination(this.currentPage);
    //   }
    // },
    // isActive(NumberPage) {
    //   return NumberPage == this.currentPage ? "active" : "";
    // },
  },
};
</script>

<style></style>
