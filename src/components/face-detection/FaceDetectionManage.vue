<template>
  <div>
    <div class="rightContent gap-1">
      <div>
        <select
          class="form-select"
          aria-label="Select"
          name="class_year"
          id="class_year"
          v-model="this.class_year_get"
          @change="press"
        >
          <option selected disabled value="">ชั้นปี</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <div class="btnCreate">
        <button
          type="button"
          class="btn btn-secondary"
          @click="togglePopupCreate()"
        >
          new class
        </button>
      </div>
      <div class="btnCreate">
        <button
          type="button"
          class="btn btn-secondary"
          @click="togglePopupTrain()"
        >
          train
        </button>
      </div>
    </div>
    <CreatePopup v-if="popupTriggers.buttonPopupCreate">
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="select"> ชั้น :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.class_year"
            @change="getClassByClassYear()"
          >
            <option selected disabled>Select</option>
            <option value="1">ม.1</option>
            <option value="2">ม.2</option>
            <option value="3">ม.3</option>
            <option value="4">ม.4</option>
            <option value="5">ม.5</option>
            <option value="6">ม.6</option>
          </select>

          <label for="select"> ห้อง :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.class_room"
          >
            <option selected disabled>Select</option>
            <option v-for="item in this.class_list" :key="item.id">
              {{ item.class_room }}
            </option>
          </select>

          <div class="button-group">
            <button class="popup-close btn btn-success">Confirm</button>
            &nbsp;
            <button
              type="button"
              class="popup-close btn btn-danger"
              @click="togglePopupCreate()"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </CreatePopup>
    <CreatePopup v-if="popupTriggers.buttonPopupTrain">
      <form @submit.prevent="submitFormTrain">
        <div class="form-control">
          <label for="select"> on class :</label>
          <select
            class="form-select"
            aria-label="Select"
            v-model="this.data_name_train"
          >
            <option selected disabled>Select</option>
            <option v-for="item in this.data_list_not_train" :key="item.id">
              {{ item.name }}
            </option>
          </select>

          <div class="button-group">
            <button class="popup-close btn btn-success">Training</button>
            &nbsp;
            <button
              type="button"
              class="popup-close btn btn-danger"
              @click="togglePopupTrain()"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </CreatePopup>
    <div v-if="class_year_get != ''">
      <ListFaceDetected :class_names="this.data_list" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import CreatePopup from "@/components/main/CreatePopup.vue";
import ListFaceDetected from "./ListFaceDetected.vue";
export default {
  name: "FaceDetectionManage",
  components: {
    CreatePopup,
    ListFaceDetected,
  },
  data() {
    return {
      popupTriggers: ref({
        buttonPopupCreate: false,
        buttonPopupTrain: false,
      }),
      class_year_get: "",
      class_year: "",
      class_room: "",
      class_id: "",
      class_list: [],
      data_list_not_train: [],
      data_list: [],
      data_id_train: [],
      data_name_train: "",
    };
  },
  created() {},
  methods: {
    togglePopupCreate() {
      this.popupTriggers.buttonPopupCreate =
        !this.popupTriggers.buttonPopupCreate;
    },
    togglePopupTrain() {
      this.data_list_not_train = [];
      this.popupTriggers.buttonPopupTrain =
        !this.popupTriggers.buttonPopupTrain;

      for (let i = 0; i < this.data_list.length; i++) {
        if (this.data_list[i].data.status === "not") {
          this.data_list_not_train.push(this.data_list[i].data);
        }
      }
      console.log(this.data_list_not_train);
    },
    async submitForm() {
      for (let i = 0; i < this.class_list.length; i++) {
        if (this.class_list[i].class_room == this.class_room) {
          this.class_id = this.class_list[i].id;
          console.log(this.class_id);
          break;
        }
      }

      try {
        await axios
          .post("http://127.0.0.1:8080/face-detection/create-data", {
            class_id: this.class_id,
          })
          .then((response) => {
            this.popupTriggers.buttonPopupCreate = false;

            this.$swal("Success!", response.data.message, "success").then(
              () => {
                window.location.reload();
              }
            );
          });
      } catch (error) {
        console.log(error);
        this.$swal("Error!", error.response.data.message, "error");
      }
    },
    async submitFormTrain() {
      let data_train = {};
      for (let i = 0; i < this.data_list_not_train.length; i++) {
        if (this.data_list_not_train[i].name == this.data_name_train) {
          data_train = this.data_list_not_train[i];
          break;
        }
      }

      console.log(data_train);
      try {
        await axios
          .post("http://127.0.0.1:8080/face-detection/trained-model", {
            id: data_train.id,
            class_id: data_train.class_id,
          })
          .then((response) => {
            this.popupTriggers.buttonPopupTrain = false;
            this.$swal("Success!", response.data.message, "success").then(
              () => {
                window.location.reload();
              }
            );
          });
      } catch (error) {
        console.log(error);
        this.$swal("Error!", error.response.data.message, "error");
      }
    },
    getClassByClassYear() {
      axios
        .get("http://127.0.0.1:8080/class/all?class_year=" + this.class_year)
        .then((response) => {
          this.class_list = response.data.data.class_list;

          console.log("getByClassYear", this.class_list);
        })
        .catch((error) => {
          this.class_list = [];
          console.log(error);
        });
    },
    press() {
      this.data_list = [];
      console.log("data_list", this.data_list);
      axios
        .get(
          "http://127.0.0.1:8080/class/all?class_year=" + this.class_year_get
        )
        .then((response) => {
          this.class_list = response.data.data.class_list;
          console.log("getByClassYear", this.class_list);
          for (var i = 0; i < this.class_list.length; i++) {
            axios
              .get(
                "http://127.0.0.1:8080/face-detection/class_id?class_id=" +
                  this.class_list[i].id
              )
              .then((response) => {
                // this.classes = response.data.data.class_list;
                this.data_list.push(response.data.data);
              });
          }
        })
        .catch((error) => {
          this.class_list = [];
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
