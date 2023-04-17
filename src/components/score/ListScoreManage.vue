<template>
  <div>
    <!-- score:{{ scores }} course:{{ courses }} -->
    <!-- {{ students }} -->
    <!-- {{ scores }}
    {{ courses }}
    {{ scores_name }} -->
    <div class="m-3 p-1">
      <div v-if="role == 'teacher'">
        <div>
          <h2>ตารางแสดงคะแนน</h2>
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">ชื่อนักเรียน</th>
                <th scope="col">สถานะ</th>
                <th scope="col">คะแนนที่ได้</th>
                <th scope="col">อัพเดตคะแนน</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="score in scores" :key="score.id">
                <td>{{ students[score.index] }}</td>
                <td>{{ score.status }}</td>

                <td>
                  <div v-if="score.status == 'create'">
                    <input type="text" />
                  </div>
                  <div v-else>
                    {{ score.score_get }}
                  </div>
                </td>
                <td>
                  <button
                    v-if="role === 'teacher'"
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="
                      TogglePopup(
                        'buttonPopup',
                        courses[score.index].id,
                        scores_name[score.index],
                        score.score_get,
                        score.student_id,
                        score.status
                      )
                    "
                  >
                    เพิ่ม
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else-if="role == 'student'">student</div>
    </div>
    <EditPopup
      v-if="popupTriggers.buttonPopup"
      @close="TogglePopup('buttonPopup')"
    >
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <div>
            <label for="student_id">รหัสนักเรียน :</label>
            {{ score.student_id }}
          </div>
          <div>
            <label for="student_id">ชื่องาน :</label>
            {{ score.name }}
          </div>

          <label for="select"> สถานะ :</label>
          <select
            class="form-select"
            aria-label="Select"
            name="status"
            id="status"
            v-model="score.status"
          >
            <option selected disabled value="">select status</option>
            <option value="normal">normal</option>
            <option value="normal">late</option>
          </select>

          <label for="select"> คะแนนที่ได้ :</label>
          <input
            type="number"
            class="form-control"
            placeholder="กรอกคะแนน"
            v-model="score.score_get"
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
import axios from "axios";
import { ref } from "vue";
import EditPopup from "@/components/main/EditPopup.vue";
export default {
  name: "ListScoreManage",
  components: {
    EditPopup,
  },
  data() {
    return {
      role: "",
      popupTriggers: ref({
        buttonPopup: false,
      }),
      score: {
        course_id: "",
        name: "",
        student_id: "",
        score_get: 0,
        status: "",
      },
    };
  },
  props: {
    filterValue: String,
    filterOptions: String,
    scores: Array,
    courses: Array,
    students: Array,
    scores_name: Array,
  },
  created() {
    this.role = localStorage.getItem("role");
  },
  methods: {
    TogglePopup(trigger, course_id, name, score_get, student_id, status) {
      console.log(trigger, course_id, name, score_get, student_id, status);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      console.log(this.popupTriggers.buttonPopup);

      console.log("course_id", course_id);
      this.score.course_id = course_id;
      this.score.student_id = student_id;
      this.score.name = name;

      console.log(this.score);
    },
    ToggleClose(trigger) {
      console.log(trigger);
      this.popupTriggers.buttonPopup = false;
      this.resetForm();
    },
    async submitForm() {
      console.log("submit");
      this.score.score_get = parseInt(this.score.score_get);
      console.log(this.score);
      axios
        .post("http://127.0.0.1:8080/score/update-student-score", this.score)
        .then((res) => {
          console.log(res);
          this.resetForm();
          this.popupTriggers.buttonPopup = false;
          this.$swal("Success!", res.data.message, "success").then(() => {
            window.location.reload();
          });
        });
    },
    resetForm() {
      this.score.course_id = "";
      this.score.name = "";
      this.score.student_id = "";
      this.score.score_get = 0;
      this.score.status = "";
    },
  },
};
</script>

<style></style>
