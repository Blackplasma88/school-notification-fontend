<template>
  <div>
    <h2>List of Information</h2>
    <div>
      <div v-for="info in informations" :key="info.id">
        <InformationData
          :id="info.id"
          :name="info.name"
          :description="info.description"
          :category="info.category"
          :filepath="info.filepath"
          :content="info.content"
          :created_at="info.created_at"
          :updated_at="info.updated_at"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InformationData from "@/components/information/InformationData.vue";
import axios from "axios";
export default {
  name: "ListInfoData",
  components: {
    InformationData,
  },
  data() {
    return {
      informations: [],
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8080/information/all")
      .then((response) => {
        console.log("information_list");
        console.log(response.data.data.information_list);
        console.log("this.informations", this.informations);
        this.informations = response.data.data.information_list;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style></style>
