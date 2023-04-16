<template>
  <div>
    <h2>List of Summary</h2>

    <div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">รหัสนักเรียน</th>
            <th scope="col">ชื่อ - นามสกุล</th>
            <th scope="col">คะแนนเก็บ</th>
            <th scope="col">คะแนนสอบกลางภาค</th>
            <th scope="col">คะแนนสอบปลายภาค</th>
            <th scope="col">คะแนนรวม</th>
            <th scope="col">จำนวนครั้งที่เข้าเรียน</th>
            <th scope="col">จำนวนที่ขาดเรียน</th>
            <th scope="col">จำนวนครั้งที่ลา</th>
            <th scope="col">เกรด</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListSummary",
  props: {
    filterOptions: String,
    filterValue: String,
    student_names: Array,
    
  },
};
</script>

<style></style>
