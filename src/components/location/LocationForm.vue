<template>
  <section>
    <div class="filter">
      <div class="search-wrapper d-flex">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          v-model="filterValue"
        />
        &nbsp;
        <button type="button" class="btn btn-secondary">
          <font-awesome-icon icon="fa-solid fa-search" />
        </button>
        {{ filterValue }}
      </div>
      <div class="filter">
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="category"
            id="category"
          >
            <option selected disabled>Filter</option>
            <option value="building_name">ตึก</option>
            <option value="floor">ชั้น</option>
            <option value="room">ห้อง</option>
          </select>
        </div>
        &nbsp;
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="category"
            id="category"
          >
            <option selected disabled>Sort by</option>
            <option value="building_name">ตึก</option>
            <option value="floor">ชั้น</option>
            <option value="room">ห้อง</option>
          </select>
        </div>
      </div>
    </div>
    <div class="rightContent">
      <div>
        <select
          class="form-select"
          aria-label="Select"
          name="category"
          id="category"
        >
          <option selected disabled>วัน</option>
          <option value="monday">จันทร์</option>
          <option value="tuesday">อังคาร</option>
          <option value="wednesday">พุธ</option>
          <option value="thursday">พฤหัส</option>
          <option value="friday">ศุกร์</option>
          <option value="saturday">เสาร์</option>
          <option value="sunday">อาทิตย์</option>
        </select>
      </div>
      &nbsp;
      <button
        type="button"
        class="btn btn-secondary"
        @click="TogglePopup('buttonPopup')"
      >
        Create Location
      </button>
    </div>
    <CreatePopup
      v-if="popupTriggers.buttonPopup"
      @close="TogglePopup('buttonPopup')"
    >
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="name">อาคาร :</label>
          <input
            type="text"
            class="form-control"
            id="building_name"
            placeholder="กรอกชื่ออาคาร"
            v-model="location.building_name"
          />
          <label for="name">ชั้น :</label>
          <input
            type="text"
            class="form-control"
            id="floor"
            placeholder="กรอกเลขชั้น"
            v-model="location.floor"
          />
          <label for="name">ห้อง :</label>
          <input
            type="text"
            class="form-control"
            id="room"
            placeholder="กรอกเลขห้อง"
            v-model="location.room"
          />

          <button class="popup-close btn btn-success">Confirm</button>
          &nbsp;
          <button
            type="button"
            class="popup-close btn btn-danger"
            @click="TogglePopup('buttonPopup')"
          >
            Cancel
          </button>
        </div>
      </form>
    </CreatePopup>
    <ListLocationData
      :filterOptions="filterOptions"
      :filterValue="filterValue"
      :locations="locations"
    />
  </section>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import ListLocationData from "./ListLocationData.vue";
import CreatePopup from "@/components/main/CreatePopup.vue";
export default {
  name: "LocationForm",
  components: {
    ListLocationData,
    CreatePopup,
  },
  data() {
    return {
      popupTriggers: ref({
        buttonPopup: false,
      }),
      locations: [],
      location: {
        building_name: "",
        floor: "",
        room: "",
      },
    };
  },
  created() {
    axios.get("http://127.0.0.1:8080/location/all").then((response) => {
      console.log("location_list");
      console.log(response.data.data.location_list);
      this.locations = response.data.data.location_list;
      console.log("this.locations", this.locations);
    });
  },
  methods: {
    TogglePopup(trigger) {
      console.log(trigger);
      this.popupTriggers.buttonPopup = !this.popupTriggers.buttonPopup;
      console.log(this.popupTriggers.buttonPopup);
    },
    async submitForm() {
      console.log("create Location", this.location);

      try {
        await axios
          .post("http://127.0.0.1:8080/location/create", this.location)
          .then((response) => {
            console.log(response);
            this.resetForm();
            this.popupTriggers.buttonPopup = false;
            this.$swal("Success", response.data.message, "success").then(() => {
              window.location.reload();
            });
          });
      } catch (error) {
        console.log(error);
        this.$swal("Error", error.response.data.message, "error");
      }
    },
    resetForm() {
      this.location.building_name = "";
      this.location.floor = "";
      this.location.room = "";
    },
  },
};
</script>

<style>
.filter {
  display: flex;
  justify-content: space-between;
  align-items: right;
  margin-bottom: 0.5rem;
}

.rightContent {
  display: flex;
  justify-content: right;
}
</style>
