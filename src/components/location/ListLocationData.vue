<template>
  <div>
    <h2>List of Location</h2>
    <div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ชื่ออาคาร</th>
            <th scope="col">ชั้น</th>
            <th scope="col">ห้อง</th>
            <th scope="col">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="location in dataForPagination" :key="location.id">
            <td>
              {{ location.building_name }}-{{ location.floor }}-{{
                location.room
              }}
            </td>
            <td>{{ location.building_name }}</td>
            <td>{{ location.floor }}</td>
            <td>{{ location.room }}</td>
            <td>
              <button class="btn btn-primary">รายละเอียด</button>
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
      locations: [
        {
          id: 1,
          building_name: "อาคาร 1",
          floor: "1",
          room: "1",
        },
        {
          id: 2,
          building_name: "อาคาร 1",
          floor: "1",
          room: "2",
        },
        {
          id: 3,
          building_name: "อาคาร 1",
          floor: "1",
          room: "3",
        },
        {
          id: 4,
          building_name: "อาคาร 1",
          floor: "1",
          room: "4",
        },
        {
          id: 5,
          building_name: "อาคาร 1",
          floor: "1",
          room: "5",
        },
        {
          id: 6,
          building_name: "อาคาร 1",
          floor: "1",
          room: "6",
        },
        {
          id: 7,
          building_name: "อาคาร 1",
          floor: "1",
          room: "7",
        },
        {
          id: 8,
          building_name: "อาคาร 1",
          floor: "1",
          room: "8",
        },
        {
          id: 9,
          building_name: "อาคาร 1",
          floor: "2",
          room: "1",
        },
        {
          id: 10,
          building_name: "อาคาร 1",
          floor: "2",
          room: "2",
        },
        {
          id: 11,
          building_name: "อาคาร 1",
          floor: "2",
          room: "3",
        },
        {
          id: 12,
          building_name: "อาคาร 1",
          floor: "2",
          room: "4",
        },
        {
          id: 13,
          building_name: "อาคาร 1",
          floor: "2",
          room: "5",
        },
        {
          id: 14,
          building_name: "อาคาร 1",
          floor: "2",
          room: "6",
        },
        {
          id: 15,
          building_name: "อาคาร 1",
          floor: "2",
          room: "7",
        },
        {
          id: 16,
          building_name: "อาคาร 1",
          floor: "2",
          room: "8",
        },
        {
          id: 17,
          building_name: "อาคาร 1",
          floor: "3",
          room: "1",
        },
        {
          id: 18,
          building_name: "อาคาร 1",
          floor: "3",
          room: "2",
        },
        {
          id: 19,
          building_name: "อาคาร 1",
          floor: "3",
          room: "3",
        },
        {
          id: 20,
          building_name: "อาคาร 1",
          floor: "3",
          room: "4",
        },
        {
          id: 21,
          building_name: "อาคาร 1",
          floor: "3",
          room: "5",
        },
        {
          id: 22,
          building_name: "อาคาร 1",
          floor: "3",
          room: "6",
        },
        {
          id: 23,
          building_name: "อาคาร 1",
          floor: "3",
          room: "7",
        },
        {
          id: 24,
          building_name: "อาคาร 1",
          floor: "3",
          room: "8",
        },
        {
          id: 25,
          building_name: "อาคาร 1",
          floor: "4",
          room: "1",
        },
        {
          id: 26,
          building_name: "อาคาร 1",
          floor: "4",
          room: "2",
        },
        {
          id: 27,
          building_name: "อาคาร 1",
          floor: "4",
          room: "3",
        },
        {
          id: 28,
          building_name: "อาคาร 1",
          floor: "4",
          room: "4",
        },
        {
          id: 29,
          building_name: "อาคาร 1",
          floor: "4",
          room: "5",
        },
        {
          id: 30,
          building_name: "อาคาร 1",
          floor: "4",
          room: "6",
        },
        {
          id: 31,
          building_name: "อาคาร 1",
          floor: "4",
          room: "7",
        },
        {
          id: 32,
          building_name: "อาคาร 1",
          floor: "4",
          room: "8",
        },
      ],
      dataForPagination: [],
      elementPerpage: 10,
      currentPage: 1,
    };
  },
  mounted() {
    this.getDataPagination(1);
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
  },
};
</script>

<style></style>
