<template>
  <div>
    <h2>List of Location</h2>
    <!-- {{ locations }} -->
    <!-- List {{ filterOptions }} List {{ filterValue }} -->
    <div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">เลขสถานที่</th>
            <th scope="col">ชื่ออาคาร</th>
            <th scope="col">ชั้น</th>
            <th scope="col">ห้อง</th>
            <th scope="col">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="location in locations" :key="location.id">
            <td>
              {{ location.building_name }}-{{ location.floor }}-{{
                location.room
              }}
            </td>
            <td>{{ location.building_name }}</td>
            <td>{{ location.floor }}</td>
            <td>{{ location.room }}</td>
            <td>
              <button class="btn btn-primary" @click="viewData(location.id)">
                รายละเอียด
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListLocationData",
  components: {},
  data() {
    return {};
  },
  props: {
    filterValue: String,
    filterOptions: String,
    locations: Array,
  },

  methods: {
    viewData(location_id) {
      console.log("Location ID", location_id);
      this.$router.push("/location/" + location_id);
    },
  },
};
</script>

<style></style>
