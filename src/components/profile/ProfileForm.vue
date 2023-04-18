<template>
  <div>
    <!-- {{ profile }} -->
    <!-- {{ profile_student }} -->
    <div
      class="d-flex flex-nowrap p-2 m-5 justify-content-center align-items-center"
    >
      <div v-if="role == 'teacher'">
        <div class="card" style="width: 50rem">
          <div class="card-body gap-2">
            <h2 class="card-title">{{ profile.name }}</h2>
            <h4 class="card-text">
              รหัสอาจารย์ : {{ profile_teacher.profile_id }}
            </h4>
            <h4 class="card-text">ภาควิชา : {{ profile_teacher.category }}</h4>

            <div v-if="profile_teacher.subject_id != ''">
              <h4 class="card-text">
                รายวิชาที่สอน : {{ profile_teacher.subject_name }}
              </h4>
            </div>
            &nbsp;
            <h4 class="card-text">
              ชั้นที่ปรึกษา : ม.{{ profile_teacher.class_name }}
            </h4>
            <p class="card-text"></p>
          </div>
        </div>
        <div v-if="profile_teacher.slot != null">
          <h4>ตารางสอน</h4>
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">วัน</th>
                <th scope="col">8.30 - 9.00</th>
                <th scope="col">9.00 - 9.30</th>
                <th scope="col">9.30 - 10.00</th>
                <th scope="col">10.00 - 10.30</th>
                <th scope="col">10.30 - 11.00</th>
                <th scope="col">12.00 - 12.30</th>
                <th scope="col">12.30 - 13.00</th>
                <th scope="col">13.00 - 13.30</th>
                <th scope="col">13.30 - 14.00</th>
                <th scope="col">14.00 - 14.30</th>
                <th scope="col">14.30 - 15.00</th>
                <th scope="col">15.00 - 15.30</th>
                <th scope="col">15.30 - 16.00</th>
                <th scope="col">16.00 - 16.30</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="slot in profile_teacher.slot" :key="slot.day">
                <td>
                  <div>
                    {{ slot.day }}
                  </div>
                </td>
                <td v-for="time in slot.time_slot" :key="time.time">
                  <div v-if="time.status == true" style="color: green">
                    In Use
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else-if="role == 'student'">
        <div class="card p-2 m-2" style="width: 50rem">
          <div class="card-body gap-2">
            <h2 class="card-title">{{ profile.name }}</h2>
            <h4 class="card-text">
              รหัสนักเรียน : {{ profile_student.profile_id }}
            </h4>
            <h4 class="card-text">ชั้น : ม.{{ profile_student.class_name }}</h4>
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

        <div class="p-4 m-3">
          <div class="row" v-if="profile_student.term_score != null">
            <div
              class="card col m-3 p-2"
              v-for="score in profile_student.term_score"
              :key="score"
            >
              <div>
                <h5>
                  ปีการศึกษา {{ score.year }} /
                  {{ score.term }}
                </h5>
                <h5>
                  หน่วยกิตภาคเรียน :
                  {{ score.term_credit }}
                </h5>
                <h5>
                  เกรดเฉลี่ยประจำภาคเรียน :
                  {{ score.gpa }}
                </h5>
              </div>
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
        class_name: "",
        subject_name: "",
      },

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
  async created() {
    this.user_id = localStorage.getItem("user_id");
    this.role = localStorage.getItem("role");
    this.profile_id = localStorage.getItem("profile_id");

    await axios
      .get("http://127.0.0.1:8080/profile/id?id=" + this.user_id)
      .then((res) => {
        this.profile = res.data.data.profile;
        console.log(this.profile);
        console.log(this.profile_id, this.role);
        axios
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
                    this.profile_teacher.class_name =
                      response.data.data.class.class_year +
                      "/" +
                      response.data.data.class.class_room;
                    console.log(
                      "class name :",
                      this.profile_teacher.class_name
                    );
                  });
              } else {
                this.profile_teacher.class_name = "ไม่มีชั้นที่ปรึกษา";
              }
              if (this.profile_teacher.subject_id != "") {
                axios
                  .get(
                    "http://127.0.0.1:8080/subject/id?subject_id=" +
                      this.profile_teacher.subject_id
                  )
                  .then((response) => {
                    // console.log(response.data.data.subject.name);
                    this.profile_teacher.subject_name =
                      response.data.data.subject.name;
                    // console.log("subject name :", this.subject_name);
                  });
              }
            } else if (this.role == "student") {
              this.profile_student = res.data.data.profile;
              console.log(this.profile_student);

              axios
                .get(
                  "http://127.0.0.1:8080/class/id?class_id=" +
                    this.profile_student.class_id
                )
                .then((response) => {
                  this.profile_student.class_name =
                    response.data.data.class.class_year +
                    "/" +
                    response.data.data.class.class_room;
                  console.log("class name :", this.profile_student.class_name);
                });
            }
          });
      });

    console.log(this.profile_id, this.role);
  },
};
</script>

<style></style>
