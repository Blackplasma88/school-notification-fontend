<template>
  <div>
    <h2>Location Details</h2>
    <div>
      <!-- {{ location }} -->
      {{ location.building_name }}
      {{ location.floor }}
      {{ location.room }}
      <ejs-schedule height="550px"> </ejs-schedule>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-vue-schedule";
export default {
  name: "ReadLocationComponent",
  components: {
    "ejs-schedule": ScheduleComponent,
  },
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda],
  },
  data() {
    return {
      location: [],
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
