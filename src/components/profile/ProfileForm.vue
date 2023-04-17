<template>
  <div>
    <h2>Profile</h2>
    <div>
      <div v-if="role == 'teacher'">
        <div>
          <h4>ชื่อ - สกุล : {{}}</h4>
        </div>
      </div>
      <div v-else-if="role == 'student'">student</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      user_id: "",
      role: "",
      profile_teacher: {
        profile_id: "",
        name: "",
        category: "",
        subject_id: "",
        class_in_counseling: "",
        course_teaches_list: [],
        slot: [],
      },
      
    };
  },
  async created() {
    this.user_id = localStorage.getItem("user_id");
    this.role = localStorage.getItem("role");

    await axios
      .get("http://127.0.0.1:8080/profile/id?id=" + this.user_id)
      .then((res) => {
        console.log(res.data.data.profile);
      });
  },
};
</script>

<style></style>
