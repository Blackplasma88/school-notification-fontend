<template>
  <div id="login-page" class="login-page">
    <div
      class="d-flex flex-wrap justify-content-center align-items-center gap-5"
    >
      <div class="login-image justify-content-center">
        <img src="@/assets/login.jpg" alt="login" width="500" />
      </div>
      <div class="p-5 m-2 border border-primary-subtle rounded-3">
        <div
          class="input justify-content-center flex-nowrap align-items-center"
        >
          <div></div>
          <h2>School Notification</h2>

          <div class="mb-3 justify-content-center">
            <label for="username" class="form-label">Username</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="username"
              placeholder="Enter username"
            />
          </div>
          <div class="mb-3 justify-content-center">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter password"
              @keyup.enter="login()"
            />
          </div>
          <div class="p-2 col-md-6 mx-auto justify-content-center">
            <button type="submit" class="btn btn-primary" @click="login()">
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import setAuthHeader from "@/util/setAuthheader";
export default {
  name: "Login",
  data() {
    return {
      id: "",
      username: "",
      password: "",
      hidden: "hidden",
    };
  },
  methods: {
    async login() {
      try {
        await axios
          .post("http://127.0.0.1:8080/sign-in", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            // async ()=> {
            localStorage.setItem("user_id", response.data.data.user_id);
            localStorage.setItem("profile_id", response.data.data.profile_id);
            localStorage.setItem("role", response.data.data.role);
            localStorage.setItem("token", response.data.data.token);
            //     };
            // setAuthHeader(localStorage.getItem("token"))
            console.log(localStorage);
            this.$swal("Success!", response.data.message, "success");
            this.$router.push("/informations");
          });
      } catch (error) {
        console.log(error);
        this.$swal("Error!", error.response.data.message, "error");
      }
    },
  },
};
</script>

<style>
.login-page {
  width: 100%;
  height: 90vh;
  margin-top: 4rem;
}
</style>
