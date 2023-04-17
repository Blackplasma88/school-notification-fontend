<template>
  <div>
    <!-- {{ check_names }} -->
    <!-- {{ student_names }} -->
    <!-- Course:{{ course_list }} -->
    <div v-if="role === 'student'">
      <div>
        <h2>ตารางแสดงผลการเช็คชื่อ</h2>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">วันที่</th>
              <th scope="col">เวลาที่เช็คชื่อ</th>
              <th scope="col">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="check_name in check_names" :key="check_name.id">
              <td>{{ check_name.date }}</td>
              <td>
                <div v-if="check_name.time != ''">
                  <td>{{ check_name.time }}</td>
                  <!-- <td>{{ format_date(check_name.time) }}</td> -->
                </div>
                <div v-else>
                  <td>ยังไม่ได้เช็คชื่อ</td>
                </div>
              </td>
              <!-- <td>
              {{ course_list[i].id }}
            </td> -->
              <td>
                <div>
                  {{ check_name.status }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else-if="role === 'teacher'">
      <div>
        <h2>ตารางแสดงผลการเช็คชื่อ</h2>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">รหัสนักเรียน</th>
              <th scope="col">เวลาที่เช็คชื่อ</th>
              <th scope="col">สถานะ</th>
              <th scope="col">ผู้เช็ค</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="check_name in check_names" :key="check_name.id">
              <td>{{ check_name.student_id }}</td>
              <td>
                <div v-if="check_name.time != ''">
                  <td>{{ check_name.time }}</td>
                  <!-- <td>{{ format_date(check_name.time) }}</td> -->
                </div>
                <div v-else>
                  <td>ยังไม่ได้เช็คชื่อ</td>
                </div>
              </td>
              <!-- <td>
              {{ course_list[i].id }}
            </td> -->
              <td>
                <div>
                  {{ check_name.status }}
                </div>
              </td>
              <td>
                <div v-if="check_name.check_by !== ''">
                  {{ check_name.check_by }}
                </div>
                <div v-else>
                  <button
                    v-if="role === 'teacher'"
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="checkName(check_name)"
                  >
                    เช็ค
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <EditPopup
      v-if="popupTriggers.buttonPopup"
      @close="TogglePopup('buttonPopup')"
    >
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="select"> วันที่ :</label>
          <input
            type="text"
            class="form-control"
            name="date"
            v-model="date"
            required
            placeholder="Ex. 2021-01-30"
          />

          <div class="button-group">
            <button class="popup-close btn btn-success">Confirm</button>
            &nbsp;
            <button
              type="button"
              class="popup-close btn btn-danger"
              @click="ToggleClose('buttonPopup')"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </EditPopup>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { ref } from "vue";
import EditPopup from "@/components/main/EditPopup.vue";
export default {
  name: "ListCheckNameManage",
  data() {
    return {
      student_check: {
        course_id: "",
        student_id: "",
        date: "",
        check_by: "",
      },
      popupTriggers: ref({
        buttonPopup: false,
      }),
    };
  },
  components: {
    EditPopup,
  },
  props: {
    student_names: Array,
    check_names: Array,
    c_id: String,
    role: String,
  },
  methods: {
    format_date(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },

    TogglePopup(trigger, course_id, student_id) {
      console.log(trigger, course_id, student_id);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      this.student_check.course_id = course_id;
      this.student_check.student_id = student_id;
      console.log(this.student_check);
    },
    ToggleClose(trigger) {
      console.log(trigger);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      this.resetForm();
    },
    async submitForm() {
      console.log("submit");
      this.student_check.date = this.date;
      this.student_check.check_by = "teacher";
      console.log(this.student_check);
      axios
        .post(
          "http://127.0.0.1:8080/check-name/student-check",
          this.student_check
        )
        .then((response) => {
          this.$swal("Success!", response.data.message, "success");
          this.resetForm();
          this.popupTriggers.buttonPopup = false;
          window.location.reload();
        })
        .catch((err) => {
          this.$swal("Error!", err.response.data.message, "error");
        });
    },
    resetForm() {
      console.log("reset");
      this.course_id = "";
      this.date = "";
      this.time_late = "";
    },
    async checkName(data) {
      var date = new Date(Date.now())
      let d = date.getDate()
      let dS = ""
      if (d < 10){
       dS = "0"+d
      }else{
        dS = d+""
      }
      let mS = ""
      let m =(date.getMonth()+1)
      if (m < 10){
       mS = "0"+m
      }else{
        mS = ""+m
      }

      var dateFormat = date.getFullYear() + "-" + mS+ "-" + dS 
      await axios
        .post("http://127.0.0.1:8080/check-name/student-check", {
          course_id: this.c_id,
          date: dateFormat,
          student_id: data.student_id,
          check_by: "teacher",
        })
        .then((response) => {
          this.$swal("Success!", response.data.message, "success");
          this.resetForm();
          this.popupTriggers.buttonPopup = false;
          window.location.reload();
        })
        .catch((err) => {
          this.$swal("Error!", err.response.data.message, "error");
        });
    },
  },
};
</script>

<style></style>
