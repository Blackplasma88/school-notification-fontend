<template>
  <div>
    <div>
      <!-- List {{ filterOptions }} List {{ filterValue }} -->
      <!-- {{ courses }} -->
      <!-- {{ categories }} -->
      <!-- {{ instructors }}
      {{ locations }}
      {{ classes }}
      {{ subjects }} -->
      <!-- {{ days }} -->
      <!-- {{ times }} -->

      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ชื่อคอร์ส</th>
            <th scope="col">ชื่อวิชา</th>
            <th scope="col">หน่วยกิต</th>
            <th scope="col">ผู้สอน</th>
            <th scope="col">ชั้นปี/ห้อง</th>
            <th scope="col">จำนวนนักเรียน</th>
            <th scope="col">วัน/เวลา</th>
            <th scope="col">สถานที่</th>
            <th scope="col">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course.id">
            <td>
              {{ course.name }}
            </td>
            <td>
              {{ subjects[course.subject_id_index].name }}
            </td>
            <td>
              {{ course.credit }}
            </td>
            <td>
              {{ instructors[course.instructor_id_index].name }}
            </td>
            <td>ม.{{ classes[course.class_id_index].class_name }}</td>
            <td>
              {{ course.number_of_student }}
            </td>
            <td>
              {{ course.date_time[0].day }} / {{ course.date_time[0].time[0] }}
            </td>
            <td>อาคาร {{ locations[course.location_id_index].location_id }}</td>
            <td>
              <div v-if="course.status == 'create'">
                <button>อัพเดต</button>
              </div>
              <div v-else>
                {{ course.status }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListCourseData",
  data() {},
  props: {
    filterValue: String,
    filterOptions: String,
    courses: Array,
    categories: Array,
    instructors: Array,
    locations: Array,
    classes: Array,
    subjects: Array,
    days: Array,
    times: Array,
  },
};
</script>

<style></style>
