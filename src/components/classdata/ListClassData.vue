<template>
  <div>
    <div>
      <!-- List {{ filterOptions }} List {{ filterValue }} -->

      <!-- {{ advisors }} -->
      <h2>ตารางแสดงห้องเรียน</h2>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ชั้นปี</th>
            <th scope="col">ห้อง</th>
            <th scope="col">จำนวนนักเรียน</th>
            <th scope="col">ที่ปรึกษา</th>
            <th scope="col">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in classes" :key="c.id">
            <!-- {{
              (this.currentPage - 1) * this.elementPerpage + i
            }} -->
            <td>ม.{{ c.class_year }}</td>
            <td>{{ c.class_room }}</td>
            <td>{{ c.number_of_student }}</td>
            <td>
              <div v-if="c.advisor_id != ''">
                {{ advisors[c.index] }}
              </div>
              <div v-else>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="
                    TogglePopup('buttonPopup', c.id, c.class_year, c.class_room)
                  "
                >
                  เพิ่ม
                </button>
              </div>
            </td>
            <td>
              <button class="btn btn-primary" @click="viewData(c.id)">
                รายละเอียด
              </button>
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
            <label for="">ชั้นปี :</label>
            ม. {{ year }} / {{ room }}
          </div>

          <label for="select"> อาจารย์ที่ปรึกษา :</label>
          <select
            class="form-select"
            aria-label="Select"
            name="advisor"
            id="advisor"
            v-model="advisor.advisor_name"
          >
            <option v-for="index in advisor_list" :key="index">
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
  name: "ListClassData",
  components: {
    EditPopup,
  },
  data() {
    return {
      advisor: {
        class_id: "",
        year: "",
        room: "",
        advisor_id: "",
        advisor_name: "",
      },
      advisor_list: [],
      advisor_list_id: [],
      advisor_name_list: [],
      popupTriggers: ref({
        buttonPopup: false,
      }),
      dataForPagination: [],
      elementPerpage: 10,
      currentPage: 1,
    };
  },
  props: {
    filterValue: String,
    filterOptions: String,
    classes: Array,
    advisors: Array,
  },
  methods: {
    viewData(class_id) {
      console.log("Class ID", class_id);
      this.$router.push("/class/" + class_id + "");
    },
    TogglePopup(trigger, class_id, year, room) {
      console.log(trigger, class_id, year, room);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      console.log(this.popupTriggers.buttonPopup);
      this.year = year;
      this.room = room;
      this.class_id = class_id;
      console.log(
        "Class ID :" + this.class_id + " M." + this.year + "/" + this.room
      );
      axios
        .get("http://127.0.0.1:8080/profile/all?role=teacher")
        .then((response) => {
          console.log("advisor_list");
          console.log(response.data.data.profile_list);
          for (let i = 0; i < response.data.data.profile_list.length; i++) {
            this.advisor_list.push(response.data.data.profile_list[i].name);
            this.advisor_list_id.push(
              response.data.data.profile_list[i].profile_id
            );
          }
        });
    },
    ToggleClose(trigger) {
      console.log(trigger);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      this.resetForm();
    },
    async submitForm() {
      console.log("submit");
      for (let i = 0; i < this.advisor_list.length; i++) {
        if (this.advisor.advisor_name == this.advisor_list[i]) {
          this.advisor.advisor_id = this.advisor_list_id[i];
          break;
        }
      }
      this.advisor.class_id = this.class_id;
      this.advisor.year = this.year;
      this.advisor.room = this.room;
      console.log(this.advisor);
      try {
        await axios
          .post("http://127.0.0.1:8080/class/set-advisor", this.advisor)
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
      this.advisor.class_id = "";
      this.advisor.year = "";
      this.advisor.room = "";
      this.advisor.advisor_id = "";
      this.advisor.advisor_name = "";
      this.advisor_list = [];
      this.advisor_list_id = [];
      this.advisor_name_list = [];
    },
  },
};
</script>

<style></style>
