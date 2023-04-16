<template>
  <main id="class-page">
    <h1>Class</h1>
    <ClassForm />
  </main>
</template>

<script>
import axios from "axios";
import ClassForm from "@/components/classdata/ClassForm";
export default {
  name: "Class",
  components: {
    ClassForm,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
    axios.defaults.headers = {
            Authorization:localStorage.getItem("token"),
    }
  },
};
</script>

<style></style>
