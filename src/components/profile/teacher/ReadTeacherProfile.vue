<template>
  <div
    class="d-flex flex-nowrap p-2 m-5 justify-content-center align-items-center"
  >
    <!-- {{ teacher_profile }} -->
    <div>
      <div class="card" style="width: 50rem">
        <div class="card-body gap-2">
          <h2 class="card-title">
            {{ teacher_profile.name }}
          </h2>
          <h4 class="card-text">
            รหัสอาจารย์ : {{ teacher_profile.profile_id }}
          </h4>
          <h4 class="card-text">ภาควิชา : {{ teacher_profile.category }}</h4>

          <div v-if="teacher_profile.subject_id != ''" class="gap-2">
            <h4 class="card-text">
              วิชาที่สอน : {{ teacher_profile.subject_id }}
            </h4>
          </div>
          <div>
            <div v-if="this.class_name != ''" class="gap-2">
              <h4 class="card-text">ชั้นปีที่ดูแล : ม.{{ this.class_name }}</h4>
            </div>
            <div v-else>
              <h4 class="card-text">ชั้นปีที่ดูแล : ไม่มี</h4>
            </div>
          </div>
        </div>
      </div>
      <div v-if="teacher_profile.slot != null" class="p-2 m-2">
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
            <tr v-for="slot in teacher_profile.slot" :key="slot.day">
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
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      teacher_profile: {
        profile_id: "",
        name: "",
        role: "",
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
      subject_name: "",
    };
  },
  async created() {
    console.log("profile_id", this.$route.params.id);
    await axios
      .get(
        "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
          this.$route.params.id +
          "&role=teacher"
      )
      .then((response) => {
        console.log("profile_id", this.$route.params.id);
        console.log("profile");
        console.log(response.data.data.profile);
        this.teacher_profile = response.data.data.profile;

        axios
          .get(
            "http://127.0.0.1:8080/class/id?class_id=" +
              this.teacher_profile.class_in_counseling
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

        axios
          .get(
            "http://127.0.0.1:8080/subject/id?subject_id=" +
              this.teacher_profile.subject_id
          )
          .then((response) => {
            // console.log(response.data.data.subject.name);
            this.subject_name = response.data.data.subject.name;
            // console.log("subject name :", this.subject_name);
          });
      })
      .catch((error) => {
        this.$swal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log(error.response.data.message);
      });
  },
};
</script>

<style></style>
