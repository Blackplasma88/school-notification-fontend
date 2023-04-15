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
  </div>
</template>

<script>
export default {
  name: "ListLocationData",
  components: {},
  data() {
    return {
      dataForPagination: [],
      elementPerpage: 10,
      currentPage: 1,
    };
  },
  props: {
    filterValue: String,
    filterOptions: String,
    locations: Array,
  },

  methods: {
    totalPage() {
      return Math.ceil(this.locations.length / this.elementPerpage);
    },
    getDataPagination(NumberPage) {
      this.currentPage = NumberPage;
      this.dataForPagination = [];
      let start = (NumberPage - 1) * this.elementPerpage;
      let end = NumberPage * this.elementPerpage;
      this.dataForPagination = this.locations.slice(start, end);
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

    viewData(location_id) {
      console.log("Location ID", location_id);
      this.$router.push("/location/" + location_id);
    },
  },
};
</script>

<style></style>
