<template>
  <div>
    <!-- {{ faceDetected }} -->
    <div>
      <h4>ชั้นปี : ม.{{ faceDetected.name }}</h4>
      <h4>จำนวนนักเรียน : {{ faceDetected.number_of_student }}</h4>

      <div v-if="faceDetected.number_of_student != 0">
        <h4>รายชื่อนักเรียน</h4>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">รหัสนักเรียน</th>
              <th scope="col">ชื่อนักเรียน</th>
              <th scope="col">อัพโหลดรูป</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(id, name) in faceDetected.student_id_list" :key="id">
              <td>
                {{ id }}
              </td>
              <td>{{ this.student_name_list[name] }}</td>
              <td>
                <input
                  class="form-control form-control-sm"
                  id="image"
                  type="file"
                  ref="file"
                  @change="selectFile"
                />
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
  name: "ReadFaceDetected",
  data() {
    return {
      faceDetected: {
        id: "",
        created_at: "",
        updated_at: "",
        status: "",
        name: "",
        class_id: "",
        student_id_list: [],
        number_of_student: "",
        image_student_path_list: [],
      },
      student_name_list: [],
      student_name: "",
      class_year: "",
      class_room: "",
      advisor_name: "",
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
    };
  },
  created() {
    axios
      .get(
        "http://127.0.0.1:8080/face-detection/class_id?class_id=" +
          this.$route.params.id
      )
      .then((response) => {
        console.log("class_id", this.$route.params.id);
        console.log("class");
        console.log(response.data.data.data);
        this.faceDetected = response.data.data.data;

        for (var i = 0; i < this.faceDetected.student_id_list.length; i++) {
          let indexI = i;
          console.log("indexI", indexI);
          console.log(
            "student_id_list",
            this.faceDetected.student_id_list[indexI]
          );
          axios
            .get(
              "http://127.0.0.1:8080/profile/profile_id?profile_id=" +
                this.faceDetected.student_id_list[indexI] +
                "&role=student"
            )
            .then((response) => {
              console.log("student");
              console.log("name", response.data.data.profile.name);
              this.student_name_list.push(response.data.data.profile.name);
              this.student_name_list[indexI] = response.data.data.profile.name;
            });
          console.log("student_name_list", this.student_name_list);
        }
      });
  },
  methods: {
    selectFile(event) {
      console.log("event", event);
      this.file = this.$refs.file.files[0];
      console.log("file_name", this.file);
    },
  },
};
</script>

<style></style>
