<template>
  <div>
    <h2>Location Details</h2>
    <div>
      <!-- {{ location }} -->
      {{ location.building_name }}
      {{ location.floor }}
      {{ location.room }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ReadLocationComponent",
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

<style></style>
