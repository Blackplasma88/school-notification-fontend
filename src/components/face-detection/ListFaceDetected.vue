<template>
  <div>
    <h2>List of Face Detected</h2>
    <!-- {{ class_names }} -->
    <div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ชั้นปี/ห้อง</th>
            <th scope="col">จำนวนนักเรียน</th>
            <th scope="col">จำนวนรูปภาพ</th>
            <th scope="col">สถานะ</th>
            <th scope="col">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in class_names" :key="c.id">
            <td>ม.{{ c.data.name }}</td>
            <td>{{ c.data.number_of_student }}</td>
            <td>{{ c.data.number_of_image }}</td>
            <td>{{ c.data.status }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="viewData(c.data.class_id)"
              >
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
  name: "ListFaceDetected",
  props: {
    class_names: Array,
  },
  methods: {
    viewData(class_id) {
      console.log("Class ID", class_id);
      this.$router.push("/face-detection/" + class_id + "");
    },
  },
};
</script>

<style></style>
