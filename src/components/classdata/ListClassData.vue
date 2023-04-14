<template>
  <div>
    <h2>List of Class</h2>
    <div>
      <!-- {{ classes }} -->
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
          <tr v-for="c in dataForPagination" :key="c.id">
            <td>ม.{{ c.class_year }}</td>
            <td>{{ c.class_room }}</td>
            <td>{{ c.number_of_student }}</td>
            <td>
              <!-- <div v-if="c.advisor_id != null">
                <td></td>
              </div> -->
              <!-- <div v-else> -->
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="
                  TogglePopup('buttonPopup', c.id, c.class_year, c.class_room)
                "
              >
                เพิ่ม
              </button>
              <!-- </div> -->
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
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li v-on:click="getPreviousPage()" class="page-item">
          <a class="page-link">Previous</a>
        </li>
        <li
          v-for="indexPage in totalPage()"
          :key="indexPage"
          v-on:click="getDataPagination(indexPage)"
          class="page-item"
          :class="isActive(indexPage)"
        >
          <a class="page-link" href="#">{{ indexPage }}</a>
        </li>

        <li v-on:click="getNextPage()" class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
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

          <label for="select"> ผู้สอน :</label>
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
      classes: [],
      dataForPagination: [],
      elementPerpage: 10,
      currentPage: 1,
      advisor: {
        year: "",
        room: "",
        advisor_id: "",
        advisor_name: "",
      },
      advisor_list: [],
      advisor_list_id: [],
      advisor_name_list: [[]],
      popupTriggers: ref({
        buttonPopup: false,
      }),
    };
  },
  mounted() {
    axios.get("http://127.0.0.1:8080/class/all?class_year=1").then((res) => {
      console.log("classes_list");
      console.log(res.data.data.class_list);
      this.classes = res.data.data.class_list;
      this.getDataPagination(1);
      console.log("this.dataForPagination", this.dataForPagination);
    });
  },
  methods: {
    totalPage() {
      return Math.ceil(this.classes.length / this.elementPerpage);
    },
    getDataPagination(NumberPage) {
      this.currentPage = NumberPage;
      this.dataForPagination = [];
      let start = (NumberPage - 1) * this.elementPerpage;
      let end = NumberPage * this.elementPerpage;
      this.dataForPagination = this.classes.slice(start, end);
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
    viewData(class_id) {
      console.log("Class ID", class_id);
      this.$router.push("/class/" + class_id + "");
    },
    TogglePopup(trigger, id, year, room) {
      console.log(trigger, id, year, room);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      console.log(this.popupTriggers.buttonPopup);
      this.year = year;
      this.room = room;
      console.log("Class : M.", this.year + "/" + this.room);

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
    resetForm() {
      console.log("reset");
      this.advisor.year = "";
      this.advisor.room = "";
      this.advisor.advisor_id = "";
      this.advisor.advisor_name = "";
      this.advisor_list = [];
    },
  },
};
</script>

<style></style>
