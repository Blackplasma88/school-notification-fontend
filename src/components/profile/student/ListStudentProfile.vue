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
          <tr v-for="student in students" :key="student.id">
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
  </div>
</template>

<script>
export default {
  name: "ListStudentProfile",
  data() {
    return {
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
    viewData(profile_id) {
      console.log("student profile id ", profile_id);
      this.$router.push("/profile/student/" + profile_id + "");
    },
  },
};
</script>

<style></style>
