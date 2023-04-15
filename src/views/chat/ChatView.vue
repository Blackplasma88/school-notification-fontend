<template>
  <main id="chat-page">
    <ChatComponent />
  </main>
</template>

<script>
import ChatComponent from "@/components/chat/ChatComponent.vue";
export default {
  name: "Chat",
  components: {
    ChatComponent,
  },
  mounted(){
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined){
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
