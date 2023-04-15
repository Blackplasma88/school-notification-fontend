<template>
  <div>
    <!-- {{ student_profile }} -->
    <div>
      <h4>รหัสนักเรียน : {{ student_profile.profile_id }}</h4>
      <h4>ชื่อ - สกุล : {{ student_profile.name }}</h4>
      <h4>ชั้น : ม.{{ this.class_name }}</h4>
      <h4>เกรดเฉลี่ย : {{ student_profile.gpa }}</h4>
      <h4>หน่วยกิตทั้งหมด : {{ student_profile.all_credit }}</h4>
      <h4>เกรดเฉลี่ยภาคเรียน : {{ student_profile.term_score[0].gpa }}</h4>
      <h4>
        หน่วยกิตภาคเรียน : {{ student_profile.term_score[0].term_credit }}
      </h4>
      <h4>ผู้ปกครอง : {{ student_profile.parent_id }}</h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ReadStudentProfile",
  components: {},
  data() {
    return {
      student_profile: {
        profile_id: "",
        name: "",
        role: "",
        class_id: "",
        parent_id: "",
        gpa: 0,
        all_credit: 0,
        term_score: [
          {
            term: "",
            year: "",
            gpa: 0,
            term_credit: 0,
            course_list: [],
          },
        ],
      },
      class_name: "",
      parent_name: "",
    };
  },
  created() {
    console.log("profile_id", this.$route.params.id);
    axios
      .get(
        "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
          this.$route.params.id +
          "&role=student"
      )
      .then((response) => {
        console.log("profile_id", this.$route.params.profile_id);
        console.log("profile");
        console.log(response.data.data.profile);
        this.student_profile = response.data.data.profile;

        axios
          .get(
            "http://127.0.0.1:8080/class/id?class_id=" +
              this.student_profile.class_id
          )
          .then((response) => {
            console.log("class");
            console.log(
              "M." +
                response.data.data.class.class_year +
                "/" +
                response.data.data.class.class_room
            );
            this.class_name =
              response.data.data.class.class_year +
              "/" +
              response.data.data.class.class_room;
            console.log("class name :", this.class_name);
          });
      });
  },
};
</script>

<style></style>
