<template>
  <div>
    <h2>test</h2>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FaceDetectionManage",
  data() {
    return {
      year:"",
      term:"",
      term_year:[],
      course_list:[],
      course_id:"",
      course_name:"",
      course_summary:[],
    };
  },
  mounted(){
    axios
        .get("http://127.0.0.1:8080/school-data/term-year-data")
        .then((response) => {
          // console.log(response.data.data.school_data);
          this.term_year = response.data.data.school_data;
            // console.log(  this.term_year);
        })
        .catch((error) => {
          console.log(error);
        });
  },
  methods: {
    async getCourseList() {
      if (this.year === "" || this.term=== ""){
        return
      }
      axios
        .get("http://127.0.0.1:8080/course/year-term?profile_id=t1&role=teacher&year="+this.year+"&term="+this.term)
        .then((response) => {
          console.log(response.data.data.course_list);
          this.course_list = response.data.data.course_list;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getCourseSummaryList() {
      console.log(this.course_name);
      for (let i = 0; i < this.course_list.length; i++) {
            if (this.course_list[i].name == this.course_name){
                this.course_id = this.course_list[i].id
                break
            }
        }

      axios
        .get("http://127.0.0.1:8080/course-summary?course_id="+this.course_id+"&role=teacher")
        .then((response) => {
          console.log(response.data.data.course_summary);
          this.course_summary = response.data.data.course_summary;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
