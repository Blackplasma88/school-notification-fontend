<template>
  <div>
    <!-- {{ check_names }} -->
    <!-- {{ student_names }} -->
    <!-- Course:{{ course_list }} -->
    <div>
      <h2>ตารางแสดงผลการเช็คชื่อ</h2>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">รหัสนักเรียน</th>
            <th scope="col">ชื่อ - สกุล</th>
            <th scope="col">เวลาที่เช็คชื่อ</th>
            <th scope="col">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(check_name, i) in check_names" :key="check_name.id">
            <td>{{ check_name.student_id }}</td>
            <td>{{ student_names[i] }}</td>
            <td>
              <div v-if="check_name.time != ''">
                <td>{{ format_date(check_name) }}</td>
              </div>
              <div v-else>
                <td>ยังไม่ได้เช็คชื่อ</td>
              </div>
            </td>
            <!-- <td>
              {{ course_list[i].id }}
            </td> -->
            <td>
              <div v-if="check_name.status != ''">
                {{ check_name.status }}
              </div>
              <div v-else>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="
                    TogglePopup(
                      'buttonPopup',
                      course_list[i].id,
                      check_name.student_id
                    )
                  "
                >
                  เช็คชื่อ
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
    course_list: Array,
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
  },
};
</script>

<style></style>
