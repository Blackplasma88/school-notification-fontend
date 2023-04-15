<template>
  <div>
    <div class="rightContent">
      
      <div class="btnCreate">
        <button type="button" class="btn btn-secondary" @click="togglePopupCreate()">
          new class
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
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import CreatePopup from "@/components/main/CreatePopup.vue";
export default {
  name: "FaceDetectionManage",
  components: {
    CreatePopup,
  },
  data() {
    return {
      popupTriggers: ref({
        buttonPopupCreate: false,
      }),
      class_year: "",
      class_room: "",
      class_id: "",
      class_list: [],
    };
  },
  mounted(){
   
  },
  methods: {
    togglePopupCreate() {
      this.popupTriggers.buttonPopupCreate = !this.popupTriggers.buttonPopupCreate;

    },
    async submitForm() {
      
      

      for (let i = 0; i < this.class_list.length; i++) {
        if (this.class_list[i].class_room == this.class_room) {
          this.class_id = this.class_list[i].id;
          break;
        }
      }

      try {
        await axios
          .post("http://127.0.0.1:8080/face-detection/create-data", {
            class_id:this.class_id
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
    getClassByClassYear() {
      axios
        .get("http://127.0.0.1:8080/class/all?class_year=" + this.class_year)
        .then((response) => {
          this.class_list = response.data.data.class_list;
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
