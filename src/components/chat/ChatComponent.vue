<template>
  <div>
    <div
      class="d-flex flex-nowrap justify-content-between align-items-stretch m-2 p-2 gap-0"
    >
      <div id="chatMenu" class="">
        <div id="chatMenuWrapper">
          <input
            placeholder="Search for friends"
            id="chatMenuInput"
            class="form-control"
          />
          <Conversations
            v-for="item in this.conversation_list"
            :key="item.id"
            :conversation="item"
            :id="item.id"
            :currentUser="user"
            @click="setCurrentChat(item)"
          />
        </div>
      </div>

      <div id="chatBox" class="sticky-bottom ustify-content-center">
        <div id="chatBoxWrapper" v-if="current_chat.id != undefined">
          <div id="chatBoxTop" v-if="this.messaeges.length != 0">
            <div>
              <Message
                v-for="item in this.messaeges"
                :key="item.id"
                :message="item"
                :own="item.sender === user.id"
              />
            </div>
          </div>
          <div v-else class="m-3 p-2">
            <p class="noConverationText">Open a converation to start chat</p>
            <!-- <span id="noConverationText" />
            Open a converation to start chat<span /> -->
          </div>
          <div id="chatBoxBottom" class="d-flex sticky-bottom gap-2">
            <div>
              <textarea
                id="chatMessageInput"
                class="form-control"
                placeholder="write something..."
                v-model="new_message"
              ></textarea>
            </div>

            <div class="pt-3">
              <button
                id="chatSubmitButton"
                @click="handleSubmit"
                class="btn btn-secondary btn-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div v-else class="m-3 p-2">
          <!-- <span class="noConverationText" />
          Open a converation to start chat
          <span /> -->
          <p class="noConverationText">Open a converation to start chat</p>
        </div>
      </div>

      <div id="newConversation">
        <div class="dropdown-wrapper">
          <div v-if="isVisible" class="dropdown-popover">
            <input
              id="chatMenuInput"
              class="form-control"
              v-model="searchQuery"
              type="text"
              placeholder="Search for chat"
            />

            <!-- <div class="selected-item">Select</div>
            <div class="options">
              <ul>
                <li
                  @click="selectItem(user)"
                  v-for="user in filterUser"
                  :key="user.id"
                >
                  {{ user.name }}
                </li>
              </ul>
            </div> -->

            <select
              @change="selectItem(user)"
              class="form-select"
              aria-label="Default select example"
            >
              <option selected>Select</option>
              <option v-for="user in filterUser" :key="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Conversations from "./Conversations.vue";
import Message from "./Message.vue";
// import {io} from "socket.io-client";

export default {
  name: "ChatComponent",
  components: {
    Conversations,
    Message,
  },
  data() {
    return {
      conversation_list: [],
      current_chat: {},
      messaeges: [],
      new_message: "",
      user: {
        id: "",
      },
      socket: {},
      searchQuery: "",
      selectedItem: "",
      isVisible: true,
      people: [],
    };
  },

  created() {
    this.user.id = localStorage.getItem("user_id");
    // this.user.id = "6436598bb7a3f5f85e0af7bf";
    axios
      .get("http://127.0.0.1:8080/conversation/user-id?user_id=" + this.user.id)
      .then((response) => {
        console.log(response.data.data.conversation_list);
        this.conversation_list = response.data.data.conversation_list;
        console.log(this.conversation_list[0]);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(io);
    // this.socket = io("ws://localhost:8900")
    // // io("ws://localhost:8900")
    // this.socket.on("welcome",message =>{
    //   console.log(message)
    // })
    // this.socket.emit("addUser",this.user.id)
    // this.socket.on("getUsers",users =>{
    //   console.log(users)
    // })

    // this.socket.on("getMessage", data =>{
    //     let msg = {
    //       sender:data.senderId,
    //       text:data.text,
    //       created_at:Date.now()
    //     }

    //     // arrival_message = msg
    //     console.log(msg)

    //     if (this.current_chat.members.includes(msg.sender)){
    //       this.messaeges.push(msg)
    //     }
    //   })

    axios
      .get("http://127.0.0.1:8080/profile/all?role=teacher")
      .then((response) => {
        this.people = response.data.data.profile_list;
        console.log(this.people);
      });
  },
  computed: {
    filterUser() {
      if (this.searchQuery.trim().length > 0) {
        return this.people.filter((person) =>
          person.name
            .toLowerCase()
            .includes(this.searchQuery.trim().toLowerCase())
        );
      }
      return this.people;
    },
  },
  methods: {
    selectItem(user) {
      console.log(user);
      axios
        .post("http://127.0.0.1:8080/conversation/create", {
          sender_id: this.user.id,
          receiver_id: user.id,
        })
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    scrollToEnd() {
      var con = document.querySelector(".scroll");
      console.log(con);
      var scrollHeight = con.scrollHeight;
      con.scrollTop = scrollHeight;
    },
    setCurrentChat(chat) {
      // console.log(chat);
      // console.log(this.current_chat.id)
      this.messaeges = [];
      this.current_chat = chat;
      // console.log(this.current_chat.id)

      axios
        .get(
          "http://127.0.0.1:8080/message/conversation-id?conversation_id=" +
            this.current_chat.id
        )
        .then((response) => {
          // console.log(response.data.data.message_list);
          this.messaeges = response.data.data.message_list;
          // this.conversation_list = response.data.data.conversation_list;
          console.log(this.messaeges);
          this.messaeges.scrollIntoView({ behavior: "smooth" });
        })
        .catch((error) => {
          console.log(error);
        });

      // this.$refs..scrollIntoView({ behavior: "smooth" });
    },
    handleSubmit() {
      console.log(this.new_message);
      const msg = {
        sender_id: this.user.id,
        Text: this.new_message,
        conversation_id: this.current_chat.id,
      };

      // const receiverId = this.current_chat.members.find(member => member !== this.user.id)

      // this.socket.emit("sendMessage",{
      //   senderId: this.user.id,
      //   Text: this.new_message,
      //   receiverId: this.user.id,
      // })

      axios
        .post("http://127.0.0.1:8080/message/create", msg)
        .then(() => {
          // console.log(response.data.data);
          this.new_message = "";
          axios
            .get(
              "http://127.0.0.1:8080/message/conversation-id?conversation_id=" +
                this.current_chat.id
            )
            .then((response) => {
              // console.log(response.data.data.message_list);
              this.messaeges = response.data.data.message_list;
              // this.conversation_list = response.data.data.conversation_list;
              // console.log(this.messaeges);
            })
            .catch((error) => {
              console.log(error);
            });
          // this.conversation_list = response.data.data.conversation_list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
/* 
.chatBoxWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.chatBoxTop {
  height: 100%;
  overflow-y: scroll;
  padding-right: 10px;
}

.chatBoxBottom {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
} */

/* 
.noConversationText {
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: rgb(224, 220, 220);
  cursor: default;
}

.chatMenuWrapper,
.chatBoxWrapper {
  padding: 10px;
  height: 100%;
}
.chatMenuInput {
  width: 90%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid gray;
} */

/* .newConversation {
  flex: 3;
}



.chatMessageInput {
  width: 80%;
  height: 90px;
  padding: 10px;
}

.chatSubmitButton {
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: teal;
  color: white;
}

.dropdown-wrapper {
  max-width: 300;
  position: relative;
  margin: 0 auto;
}

.selected-item {
  height: 40px;
  border: 2px solid;
  border-radius: 5px;
  padding: 5 px 10 px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown-popover {
  position: absolute;
  border: 2px solid lightgray;
  border-radius: 0.5rem;
  top: 10px;
  left: 0px;
  right: 0px;
  background-color: #fff;
  padding: 15px;
}

input {
  width: 90%;
  height: 30px;
  border: 2px solid lightgray;
  padding-left: 10px;
  align-items: center;
  text-align: center;
}

ul {
  list-style: none;
  text-align: center;
  max-height: 200;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid lightgray;
}

li {
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 1px;
  background-color: #f1f1f1;
  cursor: pointer;
  font-size: 16px;
}

li:hover {
  background: #70878a;
} */
</style>
