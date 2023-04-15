<template>
    <div className="conversation">
        <img
          className="conversationImg"
          src="@/assets/noAvatar.png"
          alt=""
        />
        <span className="conversationName">{{ user.name }}</span>
      </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Conversations',
    data() {
    return {
        friend_id:"",
        user:{}
    };
  },
    props: {
        conversation: {
            type: Object,
            required: true,
        },
        currentUser:{
            type: Object,
            required: true,
        }
  },
  mounted() {
        // console.log(this.conversation);
        // console.log(this.currentUser);
        // for(id in this.conversation.members){
        //     console.log(id)
        // }
        for (let i = 0; i < this.conversation.members.length; i++) {
            if (this.conversation.members[i] != this.currentUser.id){
                this.friend_id = this.conversation.members[i]
                break
            }
        }

    axios
      .get("http://127.0.0.1:8080/profile/id?id="+this.friend_id)
      .then((response) => {
        // console.log(response.data.data.conversation_list);
        this.user = response.data.data.profile;
        // console.log(this.user);
      })
      .catch((error) => {
        console.log(error);
      });
  },
}
</script>

<style>

.conversation {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 20px;
}

.conversation:hover {
    background-color: rgb(245, 243, 243);
}

.conversationImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
}

.conversationName {
    font-weight: 500;
}

</style>