<template>
  <main id="login-page">
    <div class="d-flex justify-content-center">
      <div class="login-image">
        <img src="@/assets/login.jpg" alt="login" width="500" />
      </div>
      <div class="input">
        <h1>Login</h1>
        
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input v-model="username" type="text" class="form-control" id="username" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input  v-model="password"  type="password" class="form-control" id="password" />
          </div>
          <button type="submit" class="btn btn-primary" @click="login()">Submit</button>
        
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      id: "",
      username: "",
      password: "",
    };
  },
  methods:{
    async login(){
      try {
        await axios
          .post("http://127.0.0.1:8080/sign-in", {
            username:this.username,
            password:this.password
          })
          .then((response) => {
            // async ()=> {
              localStorage.setItem("profile_id",response.data.data.profile_id)
                localStorage.setItem("role",response.data.data.role)
                localStorage.setItem("token",response.data.data.token)
            //     };
                
                console.log(localStorage)
                this.$router.push("/");
          });
      } catch (error) {
        console.log(error);
        this.$swal("Error!", error.response.data.message, "error");
      }
    }
  }
};
</script>

<style></style>
