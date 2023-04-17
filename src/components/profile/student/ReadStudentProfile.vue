<template>
  <div>
    <div
      class="d-flex flex-nowrap p-2 m-5 justify-content-center align-items-center"
    >
      <div>
        <div class="card p-2 m-2" style="width: 50rem">
          <div class="card-body gap-2">
            <h2 class="card-title">
              {{ profile_student.name }}
            </h2>
            <h4 class="card-text">
              รหัสนักเรียน : {{ profile_student.profile_id }}
            </h4>
            <h4 class="card-text">
              ชั้น : ม.{{ this.profile_student.class_name }}
            </h4>
            <div v-if="profile_student.all_credit != 0">
              <h4 class="card-text">
                หน่วยกิตสะสม : {{ profile_student.all_credit }}
              </h4>
              <h4 class="card-text">
                เกรดเฉลี่ยสะสม : {{ profile_student.gpa }}
              </h4>
            </div>
          </div>
        </div>
        <div class="p-4 m-2">
          <div v-if="profile_student.term_score != null">
            <div v-for="(score, i) in profile_student.term_score" :key="score">
              <h5>
                ปีการศึกษา {{ profile_student.term_score[i].year }} /
                {{ profile_student.term_score[i].term }}
              </h5>
              <h5>
                หน่วยกิตภาคเรียน :
                {{ profile_student.term_score[i].all_credit }}
              </h5>
              <h5>
                เกรดเฉลี่ยประจำภาคเรียน :
                {{ profile_student.term_score[i].gpa }}
              </h5>

              <h5>
                จำนวนวิชาที่เรียน :
                {{ profile_student.term_score[i].course_list.length }}
              </h5>
            </div>
          </div>
        </div>
      </div>
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
      profile_student: {
        profile_id: "",
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
        class_name: "",
        parent_name: "",
      },
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
        this.profile_student = response.data.data.profile;

        axios
          .get(
            "http://127.0.0.1:8080/class/id?class_id=" +
              this.profile_student.class_id
          )
          .then((response) => {
            console.log("class");
            console.log(
              "M." +
                response.data.data.class.class_year +
                "/" +
                response.data.data.class.class_room
            );
            this.profile_student.class_name =
              response.data.data.class.class_year +
              "/" +
              response.data.data.class.class_room;
            console.log("class name :", this.profile_student.class_name);
          });
      });
  },
};
</script>

<style></style>
