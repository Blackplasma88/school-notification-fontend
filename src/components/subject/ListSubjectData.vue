<template>
  <div>
    <h2>List of Subject</h2>

    <!-- {{ subjects }} -->
    <!-- {{ subjects }} -->
    <!-- {{ filterOptions }} -->
    <!-- {{ instructors }} -->

    <div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">รหัสวิชา</th>
            <th scope="col">หมวดหมู่</th>
            <th scope="col">ชื่อวิชา</th>
            <th scope="col">หน่วยกิต</th>
            <th scope="col">ชั้นปี</th>
            <th scope="col">ผู้สอน</th>
            <th scope="col">ผู้สอน</th>
            <th scope="col">ผู้สอน</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in subjects" :key="subject.id">
            <td>{{ subject.subject_id }}</td>
            <td>{{ subject.category }}</td>
            <td>{{ subject.name }}</td>
            <td>{{ subject.credit }}</td>
            <td>ม.{{ subject.class_year }}</td>
            <td>
              <div
                v-if="
                  subject.instructor_id != null &&
                  subject.instructor_id[0] != null
                "
              >
                <td>
                  <!-- {{
                    this.instructors.filter((t) => t.id.includes(subject.id))[0]
                      .instructor_name_list
                  }} -->
                  {{ instructors[subject.index][0] }}
                </td>
              </div>
              <div v-else>
                <button
                  v-if="role === 'admin'"
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="
                    TogglePopup(
                      'buttonPopup',
                      subject.id,
                      subject.subject_id,
                      subject.category
                    )
                  "
                >
                  เพิ่ม
                </button>
              </div>
            </td>
            <td>
              <div
                v-if="
                  subject.instructor_id != null &&
                  subject.instructor_id[1] != null
                "
              >
                <td>
                  <!-- {{
                    instructors.filter((t) => t.id.includes(subject.id))[0]
                      .instructor_name_list[0]
                  }} -->
                  {{ instructors[subject.index][1] }}
                </td>
              </div>
              <div v-else>
                <button
                  v-if="role === 'admin'"
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="
                    TogglePopup(
                      'buttonPopup',
                      subject.id,
                      subject.subject_id,
                      subject.category
                    )
                  "
                >
                  เพิ่ม
                </button>
              </div>
            </td>
            <td>
              <div
                v-if="
                  subject.instructor_id != null &&
                  subject.instructor_id[2] != null
                "
              >
                <td>
                  <!-- {{
                    this.instructors.filter((t) => t.id.includes(subject.id))[0]
                      .instructor_name_list[0]
                  }} -->
                  {{ instructors[subject.index][1] }}
                </td>
              </div>
              <div v-else>
                <button
                  v-if="role === 'admin'"
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="
                    TogglePopup(
                      'buttonPopup',
                      subject.id,
                      subject.subject_id,
                      subject.category
                    )
                  "
                >
                  เพิ่ม
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
          <div>
            <label for="subject_id">รหัสวิชา :</label>
            {{ subject_id }}
          </div>

          <label for="select"> ผู้สอน :</label>
          <select
            class="form-select"
            aria-label="Select"
            name="instructor"
            id="instructor"
            v-model="instructor.instructor_name"
          >
            <option v-for="index in instructor_list" :key="index">
              {{ index }}
            </option>
          </select>
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
  name: "ListSubjectData",
  components: { EditPopup },
  props: {
    filterValue: {
      type: String,
      default: "",
    },
    filterOptions: {
      type: String,
      default: "",
    },
    instructors: {
      type: Array,
    },
    subjects: {
      type: Array,
    },
  },
  data() {
    return {
      role: "",
      popupTriggers: ref({
        buttonPopup: false,
      }),
      subject: {
        subject_id: "",
        category: "",
        name: "",
        credit: 0,
        class_year: "",
      },
      instructor: {
        subject_id: "",
        instructor_id: "",
        instructor_name: "",
      },
      instructor_list: [],
      instructor_list_id: [],

      // dataForPagination: [],
      // elementPerpage: 10,
      // currentPage: 1,
      isHidden: true,
    };
  },
  methods: {
    TogglePopup(trigger, id, subject_id, category) {
      console.log(trigger, id, subject_id, category);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      console.log(this.popupTriggers.buttonPopup);
      this.subject_id = subject_id;
      console.log("Subject ID", this.subject_id);
      axios
        .get(
          "http://127.0.0.1:8080/profile/teacher/category?category=" + category
        )
        .then((response) => {
          console.log(response.data.data.profile_list);
          for (let i = 0; i < response.data.data.profile_list.length; i++) {
            this.instructor_list.push(response.data.data.profile_list[i].name);
            this.instructor_list_id.push(
              response.data.data.profile_list[i].profile_id
            );
          }
        });
    },
    ToggleClose(trigger) {
      console.log(trigger);
      this.popupTriggers.buttonPopup = false;
      this.resetForm();
    },
    async submitForm() {
      console.log("submit");
      console.log(this.instructor_list);
      console.log(this.instructor_list_id);
      for (let i = 0; i < this.instructor_list.length; i++) {
        if (this.instructor.instructor_name == this.instructor_list[i]) {
          this.instructor.instructor_id = this.instructor_list_id[i];
          break;
        }
      }
      this.instructor.subject_id = this.subject_id;
      console.log(this.instructor);
      for (let i = 0; i < this.instructor_list.length; i++) {
        if (this.instructor.instructor_name == this.instructor_list[i]) {
          this.instructor.instructor_id = this.instructor_list_id[i];
          break;
        }
      }
      this.instructor.subject_id = this.subject_id;
      console.log(this.instructor);
      try {
        await axios
          .post("http://127.0.0.1:8080/subject/add-instructor", this.instructor)
          .then((response) => {
            console.log(response.data);
            this.resetForm();
            this.popupTriggers.buttonPopup = false;
            this.$swal("Success!", response.data.message, "success").then(
              () => {
                window.location.reload();
              }
            );
          });
      } catch (error) {
        console.log(error.response.data.message);
        this.$swal("Error!", error.response.data.message, "error");
      }
    },

    resetForm() {
      console.log("reset");
    },
    totalPage() {
      return Math.ceil(this.subjects.length / this.elementPerpage);
    },
    getDataPagination(NumberPage) {
      this.currentPage = NumberPage;
      this.dataForPagination = [];
      let start = (NumberPage - 1) * this.elementPerpage;
      let end = NumberPage * this.elementPerpage;
      this.dataForPagination = this.subjects.slice(start, end);
      console.log(this.dataForPagination);
    },
    getPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getDataPagination(this.currentPage);
      }
    },
    getNextPage() {
      if (this.currentPage < this.totalPage()) {
        this.currentPage++;
        this.getDataPagination(this.currentPage);
      }
    },
    isActive(NumberPage) {
      return NumberPage == this.currentPage ? "active" : "";
    },
  },
  mounted() {
    this.role = localStorage.getItem("role");
  },
};
</script>

<style></style>
