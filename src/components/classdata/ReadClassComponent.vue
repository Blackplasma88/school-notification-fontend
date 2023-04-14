<template>
  <div>
    <div>
      <!-- {{ classData }} -->
      <h4>ชั้นปี : ม.{{ classData.class_year }}/ {{ classData.class_room }}</h4>
      <h4>อาจารย์ที่ปรึกษา : {{ classData.advisor_id }}</h4>
      <h4>ปีการศึกษา : {{ classData.year }}</h4>
      <h4>ภาคการศึกษา : {{ classData.term }}</h4>
      <h4>จำนวนนักเรียน : {{ classData.number_of_student }}</h4>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">รหัสนักเรียน</th>
            <th scope="col">ชื่อนักเรียน</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in classData.student_id_list" :key="i.student_id_list">
            <td>
              {{ i }}
            </td>
            <td>{{}}</td>
          </tr>
        </tbody>
      </table>
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
          <tr>
            <th scope="row">monday</th>
            <td>In use</td>
            <td>In use</td>
            <td>In use</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">tuesday</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">wednesday</th>
            <td>In use</td>
            <td>In use</td>
            <td>In use</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">thursday</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">friday</th>
            <td>In use</td>
            <td>In use</td>
            <td>In use</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
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
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8080/class/id?class_id=" + this.$route.params.id)
      .then((response) => {
        console.log("class_id", this.$route.params.id);
        console.log("class");
        console.log(response.data.data.class);
        this.classData = response.data.data.class;
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
