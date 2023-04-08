<template>
  <div>
    <h2>List of Information</h2>
    <div>
      <div v-for="info in information" :key="info.id">
        <InformationData
          :name="info.name"
          :description="info.description"
          :category="info.category"
          :image="info.image"
          :content="info.content"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InformationData from "@/components/information/InformationData.vue";
export default {
  name: "ListInfoData",
  components: {
    InformationData,
  },
  data() {
    return {
      information: [
        {
          id: 1,
          name: "โครงการวิชาการ ครั้งที่ 1",
          description: "รับสมัครนักเรียนเข้าร่วมโครงการวิชาการ",
          category: "News",
          content: "รับสมัครนักเรียนเข้าร่วมโครงการวิชาการ ครั้งที่ 1",
        },
        {
          id: 2,
          name: "Information 2",
          description: "เปิดเทอม",
          category: "Announce",
          image:
            "https://img.freepik.com/free-photo/group-asian-diverse-people-volunteer-teamwork-environment-conservationvolunteer-help-picking-plastic-foam-garbage-park-areavolunteering-world-environment-day_640221-303.jpg?w=996&t=st=1680959403~exp=1680960003~hmac=6d528056d821b451012dcf6f9b57d8c78ec2b052f5ae6754911904676f306844",
          content: "เลื่อนการเปิดเทอมออกไปอีก 1 เดือน",
        },
        {
          id: 3,
          name: "กิจกรรมกีฬาสี",
          description: "เปิดกิจกรรมกีฬาสี",
          category: "Activity",
          image: "Image 3",
          content: "เปิดกิจกรรมกีฬาสี",
        },
        {
          id: 4,
          name: "โครงการวิชาการ ครั้งที่ 1",
          description: "รับสมัครนักเรียนเข้าร่วมโครงการวิชาการ",
          category: "News",
          image: "Image 1",
          content: "รับสมัครนักเรียนเข้าร่วมโครงการวิชาการ ครั้งที่ 1",
        },
        {
          id: 5,
          name: "กิจกรรมกีฬาสี",
          description: "เปิดกิจกรรมกีฬาสี",
          category: "Activity",
          image: "Image 3",
          content: "เปิดกิจกรรมกีฬาสี",
        },
        {
          id: 6,
          name: "กิจกรรมกีฬาสี",
          description: "เปิดกิจกรรมกีฬาสี",
          category: "Activity",
          image: "Image 3",
          content: "เปิดกิจกรรมกีฬาสี",
        },
      ],
    };
  },
};
</script>

<style></style>
