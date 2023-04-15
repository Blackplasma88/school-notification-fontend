<template>
  <main id="subject-page">
    <h1>Subject</h1>
    <SubjectForm />
  </main>
</template>

<script>
import SubjectForm from "@/components/subject/SubjectForm";
export default {
  name: "Subject",
  components: {
    SubjectForm,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
