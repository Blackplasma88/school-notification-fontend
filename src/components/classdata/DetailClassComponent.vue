<template>
  <div>
    <div
      class="d-flex flex-nowrap p-2 m-2 justify-content-center align-items-center"
    >
      <div v-if="role == 'teacher'">
        <div class="card p-2 m-2" style="width: 50rem">
          <div class="card-body gap-2">
            <h2 class="card-title">
              ห้อง : ม.{{ profile_teacher.class_name }}
            </h2>
            <h4 class="card-text">ปีการศึกษา : {{ classData.year }}</h4>
            <h4 class="card-text">ภาคการศึกษา : {{ classData.term }}</h4>
            <h4 class="card-text">
              จำนวนนักเรียน : {{ classData.number_of_student }}
            </h4>

            <h4 class="card-text"></h4>
          </div>
        </div>
        <div v-if="classData.slot != null" class="m-2 p-2">
          <h4>ตารางเรียน</h4>
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
              <tr v-for="slot in classData.slot" :key="slot.day">
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
            <h2 class="card-title">
              ห้อง : ม.{{ profile_student.class_name }}
            </h2>

            <h4 class="card-text">
              อาจารย์ที่ปรึกษา : {{ classData.advisor_name }}
            </h4>
            <h4 class="card-text">ปีการศึกษา : {{ classData.year }}</h4>
            <h4 class="card-text">ภาคการศึกษา : {{ classData.term }}</h4>
            <h4 class="card-text">
              จำนวนนักเรียน : {{ classData.number_of_student }}
            </h4>
          </div>
        </div>
        <div v-if="classData.slot != null" class="m-2 p-2">
          <h4>ตารางเรียน</h4>
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
              <tr v-for="slot in classData.slot" :key="slot.day">
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DetailClassComponent",
  data() {
    return {
      role: "",
      profile_id: "",

      profile_teacher: {
        profile_id: "",
        subject_id: "",
        class_in_counseling: "",
        class_name: "",
        subject_name: "",
      },

      profile_student: {
        profile_id: "",
        class_id: "",
        class_name: "",
      },
      classData: {
        id: "",
        class_year: "",
        class_room: "",
        advisor_id: "",
        status: "",
        year: "",
        term: "",
        number_of_student: "",
        student_id_list: [],

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
        student_name_list: [],
        advisor_name: "",
      },
    };
  },
  async created() {
    this.role = localStorage.getItem("role");
    this.profile_id = localStorage.getItem("profile_id");

    await axios(
      "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
        this.profile_id +
        "&role=" +
        this.role
    ).then((res) => {
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
              this.classData = response.data.data.class;
              console.log("class name :", this.profile_teacher.class_name);
            });
        } else {
          this.profile_teacher.class_name = "ไม่มีชั้นเรียน";
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

            this.classData = response.data.data.class;
            console.log("class data :", this.classData);

            axios
              .get(
                "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
                  this.classData.advisor_id +
                  "&role=teacher"
              )
              .then((response) => {
                console.log("advisor");
                console.log("name", response.data.data.profile.name);
                this.classData.advisor_name = response.data.data.profile.name;
              });
          });
      }
    });
  },
};
</script>

<style></style>
