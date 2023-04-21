<template>
  <div v-if="own === true">
    <!-- {{ own }} -->
    <div className="message own">
      <div className="messageTop">
        <img className="messageImg" src="@/assets/noAvatar.png" alt="" />
        <p className="messageText">{{ message.text }}</p>
      </div>
      <div className="messageBottom">{{ m.created_at }}</div>
    </div>
  </div>
  <div v-else>
    <div className="message">
      <div className="messageTop">
        <img className="messageImg" src="@/assets/noAvatar.png" alt="" />
        <p className="messageText">{{ message.text }}</p>
      </div>
      <div className="messageBottom">{{ m.created_at }}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Message",
  data() {
    return {
      m: {},
    };
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
    own: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    // console.log(this.message);
    this.m = this.message;
    // console.log(this.own);
    // console.log(this.m.created_at)
    this.m.created_at = moment(this.m.created_at).fromNow();
    //    console.log(this.m.created_at)
  },
};
</script>

<style>
.message {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.messageTop {
  display: flex;
}

.messageImg {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.messageText {
  padding: 10px;
  border-radius: 15px;
  background-color: #1877f2;
  color: white;
  max-width: 300px;
}

.messageBottom {
  font-size: 12px;
  margin-top: 1px;
}

.message.own {
  align-items: flex-end;
}

.message.own .messageText {
  background-color: rgb(245, 241, 241);
  color: black;
}
</style>
