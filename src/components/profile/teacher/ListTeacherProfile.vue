<template>
  <div>
    <h2>List of Teachers</h2>
    <!-- {{ teachers }} -->
    <!-- {{ classes }} -->
    <!-- {{ subjects }} -->
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
          <tr v-for="teacher in teachers" :key="teacher.id">
            <td>{{ teacher.profile_id }}</td>
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.category }}</td>
            <td>
              <div v-if="teacher.class_in_counseling != ''">
                <td>ม.{{ classes[teacher.class_name_index] }}</td>
              </div>
              <div v-else>
                <td>ไม่มี</td>
              </div>
            </td>
            <td>
              <div v-if="teacher.subject_id != ''">
                <td>
                  {{ subjects[teacher.subject_name_index] }}
                </td>
              </div>
              <div v-else>
                <td>ไม่มี</td>
              </div>
            </td>
            <td>
              <div
                v-if="
                  teacher.course_teaches_list[
                    teacher.course_teaches_list.length - 1
                  ].course_id_list != null
                "
              >
                {{
                  teacher.course_teaches_list[
                    teacher.course_teaches_list.length - 1
                  ].course_id_list.length
                }}
              </div>
              <div v-else>
                <td>ไม่มี</td>
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
  </div>
</template>

<script>
export default {
  name: "ListTeacherProfile",
  data() {
    return {
      class_name: "",
      class_name_list: [],
    };
  },
  props: {
    teachers: Array,
    filterValue: String,
    filterOptions: String,
    classes: Array,
    subjects: Array,
  },

  methods: {
    viewData(profile_id) {
      console.log("teacher profile id ", profile_id);
      this.$router.push("/profile/teacher/" + profile_id + "");
    },
  },
};
</script>

<style></style>
