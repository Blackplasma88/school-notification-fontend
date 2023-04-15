<template>
  <div>
    <h2>test</h2>
    <div class="rightContent">
      <select
        class="form-select"
        aria-label="Select"
        v-model="this.year"
        @change="getCourseList()"
      >
        <option selected disabled>select</option>
        <option v-for="item in this.term_year" :key="item.id">
          {{ item.year }}
        </option> 
      </select>
      <select
        class="form-select"
        aria-label="Select"
        v-model="this.term"
        @change="getCourseList()"
      >
        <option selected disabled>select</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <select
      class="form-select"
      aria-label="Select"
      v-model="this.course_name"
      @change="getCheckNamaList()"
    >
      <option selected disabled>select</option>
      <option v-for="item in this.course_list" :key="item.id">
        {{ item.name}}
      </option>
    </select>
    <select
      class="form-select"
      aria-label="Select"
      v-model="this.date"
      @change="getCheckNameDateData()"
    >
      <option selected disabled>select</option>
      <option v-for="item in this.date_list" :key="item.id">
        {{ item }}
      </option>
    </select>
    <div class="btnAddDate">
      <button v-if='this.role === "teacher"'
        type="button"
        class="btn btn-secondary"
        @click="togglePopupAddDate()"
      >
        add date
      </button>
    </div>
    </div>
    <CreatePopup v-if="popupTriggers.buttonPopupAddDate">
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="select"> date :</label>
          <input
            type="text"
            class="form-control"
            placeholder="date"
            v-model="this.check_name_data_new.date"
          />

          <label for="select"> time late :</label>
          <input
            type="number"
            class="form-control"
            placeholder="time late"
            v-model="this.check_name_data_new.time_late"
          />


          <div class="button-group">
            <button class="popup-close btn btn-success">Confirm</button>
            &nbsp;
            <button
              type="button"
              class="popup-close btn btn-danger"
              @click="togglePopupAddDate()"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </CreatePopup>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import CreatePopup from "@/components/main/CreatePopup.vue";
export default {
  name: "CheckNamaManage",
  components: {
    CreatePopup,
  },
  data() {
    return {
      role:"",
      popupTriggers: ref({
        buttonPopupAddDate: false,
      }),
      year:"",
      term:"",
      term_year:[],
      course_list:[],
      course_id:"",
      course_name:"",
      date_list:[],
      date:"",
      date_data:{},
      check_name_data_list:[],
      check_name_data_new:{
        date:"",
        time_late:0
      }
    };
  },
  mounted(){
    this.role = localStorage.getItem("role")
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
    togglePopupAddDate() {
      this.popupTriggers.buttonPopupAddDate = !this.popupTriggers.buttonPopupAddDate;
    },
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
    async getCheckNamaList() {
      console.log(this.course_name);
      for (let i = 0; i < this.course_list.length; i++) {
            if (this.course_list[i].name == this.course_name){
                this.course_id = this.course_list[i].id
                break
            }
        }

      axios
        .get("http://127.0.0.1:8080/check-name/check-name-in-course?course_id="+this.course_id+"&role=teacher&id=t1")
        .then((response) => {
          // console.log(response.data.data.score.name);
          this.date_list = response.data.data.check_name.date;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getCheckNameDateData() {
      axios
        .get("http://127.0.0.1:8080/check-name/check-name-data?course_id="+this.course_id+"&date="+this.date+"&role=teacher&id=t1")
        .then((response) => {
          // console.log(response.data.data.date_data);
          this.date_data = response.data.data.date_data;
          this.check_name_data_list = response.data.data.date_data.check_name_data;
          //   console.log(  this.school_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async submitForm() {
      this.check_name_data_new.course_id = this.course_id
      console.log(this.check_name_data_new)
      axios
        .post("http://127.0.0.1:8080/check-name/add-date",this.check_name_data_new)
        .then(() => {
          this.popupTriggers.buttonPopupAddDate = !this.popupTriggers.buttonPopupAddDate;
          // console.log(response.data.data.school_data);
          // this.subject_list = response.data.data.subject_list;
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
