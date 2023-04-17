<template>
  <div class="m-1 p-3">
    <!-- {{ school_datas }} -->
    <div v-show="isShow == true">
      <h2>ตารางการจัดการ</h2>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ปีการศึกษา</th>
            <th scope="col">ภาคเรียน</th>
            <th scope="col">สถานะ</th>
            <!-- <th scope="col">การจัดการ</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="school in school_datas" :key="school">
            <td>{{ school.year }}</td>
            <td>{{ school.term }}</td>
            <td>
              <div v-if="school.status != true">
                <td>กำลังดำเนินการ</td>
              </div>
              <div v-else>
                <td>จบการเรียนการสอน</td>
              </div>
            </td>
            <!-- <td>
              <button>อัพเดต</button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <div v-show="isShow == false">
      <h2>ตารางการจัดการ</h2>
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
  methods: {},
};
</script>

<style></style>
