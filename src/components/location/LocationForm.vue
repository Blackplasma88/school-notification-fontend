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
      </div>
      <div class="filter">
        <div>
          <select
            class="form-select"
            aria-label="Select"
            v-model="filterOptions"
          >
            <option selected disabled value="">Filter</option>
            <option value="location_id">เลขสถานที่</option>
            <option value="building_name">ชื่ออาคาร</option>
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
            v-model="sortBy"
            @change="sortValue()"
          >
            <option selected disabled value="">Sort by</option>
            <option value="location_id">เลขสถานที่</option>
            <option value="building_name">ชื่ออาคาร</option>
            <option value="floor">ชั้น</option>
            <option value="room">ห้อง</option>
          </select>
        </div>
        &nbsp;
        <div>
          <select
            class="form-select"
            aria-label="Select"
            name="sortyBy"
            id="sortyBy"
            v-model="sortOption"
            @change="sortValue()"
          >
            <option selected disabled value="">{{ sortOption }}</option>
            <option value="Asc">Asc</option>
            <option value="Desc">Desc</option>
          </select>
        </div>
      </div>
    </div>
    <div class="rightContent">
      <button
        v-if="role === 'admin'"
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
      :locations="filterList"
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
      role: "",
      popupTriggers: ref({
        buttonPopup: false,
      }),
      locations: [],
      location: {
        building_name: "",
        floor: "",
        room: "",
      },
      filterOptions: "",
      filterValue: "",
      sortBy: "",
      sortOption: "Asc",
    };
  },
  computed: {
    filterList() {
      if (this.filterValue.trim().length > 0) {
        if (this.filterOptions == "" || this.filterOptions == "location_id") {
          return this.locations.filter((location) =>
            location.location_id
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        } else if (this.filterOptions == "building_name") {
          return this.locations.filter((location) =>
            location.building_name
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        } else if (this.filterOptions == "floor") {
          return this.locations.filter((location) =>
            location.floor
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        } else if (this.filterOptions == "room") {
          return this.locations.filter((location) =>
            location.room
              .toLowerCase()
              .includes(this.filterValue.trim().toLowerCase())
          );
        }
      }
      return this.locations;
    },
  },
  created() {
    this.role = localStorage.getItem("role");
    axios.get("http://127.0.0.1:8080/location/all").then((response) => {
      console.log("location_list");
      console.log(response.data.data.location_list);
      this.locations = response.data.data.location_list;
      console.log("this.locations", this.locations);
    });
  },
  methods: {
    clearData() {
      this.location = {
        building_name: "",
        floor: "",
        room: "",
      };
    },
    TogglePopup(trigger) {
      this.clearData();
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
            this.clearData();
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
    sortValue() {
      // น้อยไปมาก
      if (this.sortOption == "Asc") {
        if (this.sortBy === "location_id") {
          this.locations.sort((a, b) =>
            a.location_id > b.location_id ? 1 : -1
          );
        } else if (this.sortBy === "building_name") {
          this.locations.sort((a, b) =>
            a.building_name > b.building_name ? 1 : -1
          );
        } else if (this.sortBy === "floor") {
          this.locations.sort((a, b) => (a.floor > b.floor ? 1 : -1));
        } else if (this.sortBy === "room") {
          this.locations.sort((a, b) => (a.room > b.room ? 1 : -1));
        }
      } else if (this.sortOption == "Desc") {
        if (this.sortBy === "location_id") {
          this.locations.sort((a, b) =>
            a.location_id < b.location_id ? 1 : -1
          );
        } else if (this.sortBy === "building_name") {
          this.locations.sort((a, b) =>
            a.building_name < b.building_name ? 1 : -1
          );
        } else if (this.sortBy === "floor") {
          this.locations.sort((a, b) => (a.floor < b.floor ? 1 : -1));
        } else if (this.sortBy === "room") {
          this.locations.sort((a, b) => (a.room < b.room ? 1 : -1));
        }
      }
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
