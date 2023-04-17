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
            <td v-if="role === 'admin'">
              <div v-if="course.status == 'create'">
                <button @click="updateCourseStatus(course.id)">อัพเดต</button>
              </div>
              <div v-else-if="course.status == 'finish'">เสร็จสิ้น</div>
              <div v-else>กำลังดำเนินการ</div>
            </td>
            <td  v-if="role === 'teacher'">
              <div v-if="course.status == 'progress'">
                <button @click="summaryCourse(course.id)">สรุปผล</button>
              </div>
              <div v-else-if="course.status == 'summary'">
                <button @click="updateCourseStatus(course.id)">แก้ไข</button>
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
import axios from 'axios';
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
    role:String,
  },
  methods:{
    async updateCourseStatus(id){
      // console.log(id);
      await axios.post("http://127.0.0.1:8080/course/change-to-progress",{
        id:id
      }).then((res)=>{
        this.$swal("Success!", res.data.message, "success").then(
              () => {
                window.location.reload();
              }
            );
      }).catch((err)=>{
        console.log(err);
        this.$swal("Error!", err.response.data.message, "error");
      })
    },
    async summaryCourse(id){
      // console.log(id);
      await axios.post("http://127.0.0.1:8080/summary/course-id  ",{
        course_id:id
      }).then((res)=>{
        this.$swal("Success!", res.data.message, "success").then(
              () => {
                window.location.reload();
              }
            );
      }).catch((err)=>{
        console.log(err);
        this.$swal("Error!", err.response.data.message, "error");
      })
    }
  }
};
</script>

<style></style>
