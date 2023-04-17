<template>
  <div>
    <h2>Profile</h2>
    <div
      class="d-flex flex-nowrap p-2 m-5 justify-content-center align-items-center"
    >
      <div v-if="role == 'teacher'">
        <div class="card" style="width: auto">
          <div class="card-body">
            <h5 class="card-title">ชื่อ - สกุล : {{ profile.name }}</h5>
            <p class="card-text">
              รหัสอาจารย์ : {{ profile_teacher.profile_id }}
            </p>
            <p class="card-text">ภาควิชา : {{ profile_teacher.category }}</p>
            <div v-if="profile_teacher.subject_id != ''">
              <p class="card-text">
                รายวิชาที่สอน : {{ profile_teacher.subject_id }}
              </p>
            </div>

            <p class="card-text">ชั้นที่ปรึกษา : {{ class_name }}</p>
            <p class="card-text">
             
            </p>
          </div>
        </div>
      </div>
      <div v-else-if="role == 'student'">student</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      //get from local storage
      user_id: "",
      role: "",
      profile_id: "",

      //get from database by hex
      profile: {
        id: "",
        name: "",
        role: "",
      },

      //get from database by profile_id
      profile_teacher: {
        profile_id: "",
        category: "",
        subject_id: "",
        class_in_counseling: "",
        course_teaches_list: {
          course_id_list: [],
          year: "",
          term: "",
        },
        slot: [
          {
            day: "",
            time_slot: [
              {
                time: "",
                status: "",
              },
            ],
          },
        ],
      },
      class_name: "",

      profile_student: {
        name: "",
        class_id: "",
        parent_id: "",
        gpa: 0,
        all_credit: 0,
        term_score: [],
      },
    };
  },
  async created() {
    this.user_id = localStorage.getItem("user_id");
    this.role = localStorage.getItem("role");
    this.profile_id = localStorage.getItem("profile_id");

    await axios
      .get("http://127.0.0.1:8080/profile/id?id=" + this.user_id)
      .then((res) => {
        this.profile = res.data.data.profile;
        console.log(this.profile);
      });

    await axios
      .get(
        "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
          this.profile_id +
          "&role=" +
          this.role
      )
      .then((res) => {
        console.log(res.data.data.profile);

        if (this.role == "teacher") {
          this.profile_teacher = res.data.data.profile;
          console.log(this.profile_teacher);
          if (this.profile_teacher.class_in_counseling != "") {
            axios
              .get(
                "http://127.0.0.1:8080/class/id?class_id=" +
                  this.profile_teacher.class_in_counseling
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
          } else {
            this.class_name = "ไม่มีชั้นที่ปรึกษา";
          }
          
        } else if (this.role == "student") {
          this.profile_student = res.data.data.profile;
          console.log(this.profile_student);
        }
      });
  },
};
</script>

<style></style>
