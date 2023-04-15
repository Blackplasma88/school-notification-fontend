<template>
  <div>
     {{ classData }}
    <!-- <div>
     
      <h4>ชั้นปี : ม.{{ classData.class_year }}/ {{ classData.class_room }}</h4>
      <h4>อาจารย์ที่ปรึกษา : {{ this.advisor_name }}</h4>
      <h4>ปีการศึกษา : {{ classData.year }}</h4>
      <h4>ภาคการศึกษา : {{ classData.term }}</h4>
      <h4>จำนวนนักเรียน : {{ classData.number_of_student }}</h4>
      <div v-if="classData.number_of_student != 0">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">รหัสนักเรียน</th>
              <th scope="col">ชื่อนักเรียน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(id, name) in classData.student_id_list" :key="id">
              <td>
                {{ id }}
              </td>
              <td>{{ this.student_name_list[name] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="classData.slot != null">
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
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ReadClassComponent",
  data() {
    return {
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
      },
      student_name_list: [],
      advisor_name: "",
    };
  },
  created() {
    axios
      .get("http://127.0.0.1:8080/class/id?class_id=" + this.$route.params.id)
      .then((response) => {
        console.log("class_id", this.$route.params.id);
        console.log("class");
        console.log(response.data.data.class);
        this.classData = response.data.data.class;
        // console.log("classData", this.classData);
        // console.log("student_id_list", this.classData.student_id_list);

      //   axios
      //     .get(
      //       "http://127.0.0.1:8080/profile/id?id=" +
      //         this.classData.advisor_id +
      //         "&role=teacher"
      //     )
      //     .then((response) => {
      //       console.log("advisor");
      //       console.log("name", response.data.data.profile.name);
      //       this.advisor_name = response.data.data.profile.name;
      //     });

      //   for (var i = 0; i < this.classData.student_id_list.length; i++) {
      //     let indexI = i;
      //     console.log("indexI", indexI);
      //     console.log(
      //       "student_id_list",
      //       this.classData.student_id_list[indexI]
      //     );
      //     axios
      //       .get(
      //         "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
      //           this.classData.student_id_list[indexI] +
      //           "&role=student"
      //       )
      //       .then((response) => {
      //         console.log("student");
      //         console.log("name", response.data.data.profile.name);
      //         this.student_name_list.push(response.data.data.profile.name);
      //         this.student_name_list[indexI] = response.data.data.profile.name;
      //       });
      //   }
      //   console.log("student_name_list", this.student_name_list);
      // })
      // .catch((error) => {
      //   this.$swal({
      //     title: "Error!",
      //     text: error.response.data.message,
      //     icon: "error",
      //     confirmButtonText: "OK",
      //   });
      //   console.log(error.response.data.message);
      });
  },
};
</script>

<style></style>
