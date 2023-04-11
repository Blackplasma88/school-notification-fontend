<template>
  <section>
    <div class="filter">
      <div class="search-wrapper">
        <input type="text" class="form-control" placeholder="Search" />
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
      <button type="button" class="btn btn-secondary" @click="createLocation">
        Create
      </button>
    </div>
    <ListLocationData />
  </section>
</template>

<script>
import ListLocationData from "./ListLocationData.vue";
export default {
  name: "LocationForm",
  components: {
    ListLocationData,
  },
  methods: {
    createLocation() {
      console.log("createLocation");
    },
  },
};
</script>

<style></style>
