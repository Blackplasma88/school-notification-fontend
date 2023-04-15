<template>
    <main id="course-page">
      <h1>Manage School</h1>
      <SchoolDataView></SchoolDataView>
    </main>
  </template>
  
  <script>
  import SchoolDataView from "@/components/school-data/SchoolDataView.vue";
  export default {
    name: "SchoolData",
    components: {
        SchoolDataView,
    },
  }
  </script>
  
  <style>
  
  </style>