<template>
  <main id="chat-page">
    <ChatComponent />
  </main>
</template>

<script>
import axios from "axios";
import ChatComponent from "@/components/chat/ChatComponent.vue";
export default {
  name: "Chat",
  components: {
    ChatComponent,
  },
  mounted() {
    if (
      localStorage.getItem("token") == null ||
      localStorage.getItem("token") == undefined
    ) {
      this.$router.push("/login");
    }
    axios.defaults.headers = {
      Authorization: localStorage.getItem("token"),
    };
  },
};
</script>

<style></style>
