<template>
  <div>
    <div>
      <!-- {{ location }} -->
      <div>
        <h4>ชื่ออาคาร : {{ location.building_name }}</h4>
        <h4>ห้อง: {{ location.floor }}0{{ location.room }}</h4>
      </div>

      <div>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">วัน</th>
              <th scope="col">8.00 - 8.30</th>
              <th scope="col">8.30 - 9.00</th>
              <th scope="col">9.00 - 9.30</th>
              <th scope="col">9.30 - 10.00</th>
              <th scope="col">10.00 - 10.30</th>
              <th scope="col">10.30 - 11.00</th>
              <th scope="col">12.00 - 12.30</th>
              <th scope="col">12.30 - 13.00</th>
              <th scope="col">13.00 - 13.30</th>
              <th scope="col">13.30 - 14.00</th>
              <th scope="col">14.00 - 14.30</th>
              <th scope="col">14.30 - 15.00</th>
              <th scope="col">15.00 - 15.30</th>
              <th scope="col">15.30 - 16.00</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="slot in location.slot" :key="slot.day">
              <td>
                <div>
                  {{ slot.day }}
                </div>
                <div>
                  วันที่
                  <!-- {{ slot.date }} -->
                </div>
              </td>
              <td v-for="time in slot.time_slot" :key="time.time">
                <div v-if="time.status == true" style="color: green">
                  In Use
                </div>
                <div v-else style="background-color: red">
                  <!-- {{ time.time }} -->
                  <!-- {{ time.status }} -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <ejs-schedule height="550px" currentView="Week"> </ejs-schedule> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import {
//   ScheduleComponent,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
// } from "@syncfusion/ej2-vue-schedule";
export default {
  name: "ReadLocationComponent",
  // components: {
  //   "ejs-schedule": ScheduleComponent,
  // },
  // provide: {
  //   schedule: [Day, Week, WorkWeek, Month, Agenda],
  // },
  data() {
    return {
      location: {
        building_name: "",
        floor: "",
        room: "",
        slot: [
          {
            day: "",
            time_slot: [
              {
                time: "",
                status: "",
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    //"http://127.0.0.1:8080/location/id?location_id="
    axios
      .get(
        "http://127.0.0.1:8080/location/id?subject_id=" + this.$route.params.id
      )
      .then((response) => {
        console.log("location_id", this.$route.params.id);
        console.log("location");
        console.log(response.data.data.location);
        this.location = response.data.data.location;
      })
      .catch((error) => {
        this.$swal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log(error.response.data.message);
      });
  },
};
</script>

<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css";
</style>
