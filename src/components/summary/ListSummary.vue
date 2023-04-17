<template>
  <div>
    <h2>ตารางสรุปผล</h2>
    <!-- {{ course_summary }}
    {{ student_names }} -->

    <div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th  v-if="role === 'teacher'" scope="col">รหัสนักเรียน</th>
            <th  v-if="role === 'student'" scope="col">ชื่อคอร์ส</th>
            <th v-if="role === 'teacher'" scope="col">ชื่อ - นามสกุล</th>

            <th scope="col">คะแนนเก็บ</th>
            <th scope="col">คะแนนสอบกลางภาค</th>
            <th scope="col">คะแนนสอบปลายภาค</th>
            <th scope="col">คะแนนรวม</th>

            <th scope="col">จำนวนครั้งที่เข้าเรียน</th>
            <th scope="col">จำนวนที่ขาดเรียน</th>
            <th scope="col">จำนวนครั้งที่เข้าเรียนสาย</th>
            <th scope="col">เกรด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, i) in course_summary" :key="course.id">
            <td v-if="role === 'teacher'">{{ course.student_id }}</td>
            <td v-if="role === 'student'">{{ course.course_name }}</td>
            <td  v-if="role === 'teacher'">{{ student_names[i] }}</td>

            <td>{{ course.score_work_get }}</td>
            <td>{{ course.score_mid_get }}</td>
            <td>{{ course.score_final_get }}</td>
            <td>{{ course.score_work_full }}</td>

            <td>{{ course.check_name_attend_count }}</td>
            <td>{{ course.check_name_absent_count }}</td>
            <td>{{ course.check_name_late_count }}</td>
            <td>{{ course.grade }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListSummary",
  props: {
    filterOptions: String,
    filterValue: String,
    student_names: Array,
    course_summary: Array,
    role:String,
  },
};
</script>

<style></style>
