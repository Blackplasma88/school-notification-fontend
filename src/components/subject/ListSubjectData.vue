<template>
  <div>
    <h2>List of Subject</h2>
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
            <td>{{ subject.subject_code }}</td>
            <td>{{ subject.subject_category }}</td>
            <td>{{ subject.subject_name }}</td>
            <td>{{ subject.credit }}</td>
            <td>ม.{{ subject.year }}</td>
            <td>{{ subject.instructor[0] }}</td>
            <td>{{ subject.instructor[1] }}</td>
            <td>{{ subject.instructor[2] }}</td>
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
export default {
  name: "ListSubjectData",
  components: {},
  data() {
    return {
      subjects: [
        {
          id: 1,
          subject_code: "011528",
          subject_category: "วิทยาศาสตร์",
          subject_name: "วิทยาศาสตร์ 1",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 2,
          subject_code: "011529",
          subject_category: "วิทยาศาสตร์",
          subject_name: "วิทยาศาสตร์ 2",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 2"],
        },
        {
          id: 3,
          subject_code: "011530",
          subject_category: "คณิตศาสตร์",
          subject_name: "คณิตศาสตร์ 1",
          credit: 4,
          year: 2,
          instructor: ["อาจารย์ 1", "อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 4,
          subject_code: "011531",
          subject_category: "ภาษาอังกฤษ",
          subject_name: "ภาษาอังกฤษ 1",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 3"],
        },
        {
          id: 5,
          subject_code: "011532",
          subject_category: "ภาษาไทย",
          subject_name: "ภาษาอังกฤษ 1",
          credit: 2,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 6,
          subject_code: "011533",
          subject_category: "สังคม",
          subject_name: "สังคม 1",
          credit: 1,
          year: 1,
          instructor: ["อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 7,
          subject_code: "011528",
          subject_category: "วิทยาศาสตร์",
          subject_name: "วิทยาศาสตร์ 1",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 9,
          subject_code: "011530",
          subject_category: "คณิตศาสตร์",
          subject_name: "คณิตศาสตร์ 1",
          credit: 4,
          year: 2,
          instructor: ["อาจารย์ 1", "อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 10,
          subject_code: "011531",
          subject_category: "ภาษาอังกฤษ",
          subject_name: "ภาษาอังกฤษ 1",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 3"],
        },
        {
          id: 11,
          subject_code: "011528",
          subject_category: "วิทยาศาสตร์",
          subject_name: "วิทยาศาสตร์ 1",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 12,
          subject_code: "011529",
          subject_category: "วิทยาศาสตร์",
          subject_name: "วิทยาศาสตร์ 2",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 2"],
        },
        {
          id: 13,
          subject_code: "011530",
          subject_category: "คณิตศาสตร์",
          subject_name: "คณิตศาสตร์ 1",
          credit: 4,
          year: 2,
          instructor: ["อาจารย์ 1", "อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 14,
          subject_code: "011531",
          subject_category: "ภาษาอังกฤษ",
          subject_name: "ภาษาอังกฤษ 1",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 3"],
        },
        {
          id: 15,
          subject_code: "011532",
          subject_category: "ภาษาไทย",
          subject_name: "ภาษาอังกฤษ 1",
          credit: 2,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 16,
          subject_code: "011533",
          subject_category: "สังคม",
          subject_name: "สังคม 1",
          credit: 1,
          year: 1,
          instructor: ["อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 17,
          subject_code: "011528",
          subject_category: "วิทยาศาสตร์",
          subject_name: "วิทยาศาสตร์ 1",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 18,
          subject_code: "011529",
          subject_category: "วิทยาศาสตร์",
          subject_name: "วิทยาศาสตร์ 2",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 2"],
        },
        {
          id: 19,
          subject_code: "011530",
          subject_category: "คณิตศาสตร์",
          subject_name: "คณิตศาสตร์ 1",
          credit: 4,
          year: 2,
          instructor: ["อาจารย์ 1", "อาจารย์ 2", "อาจารย์ 3"],
        },
        {
          id: 20,
          subject_code: "011531",
          subject_category: "ภาษาอังกฤษ",
          subject_name: "ภาษาอังกฤษ 1",
          credit: 3,
          year: 1,
          instructor: ["อาจารย์ 1", "อาจารย์ 3"],
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
