<template>
  <main id="login-page">
    <div class="d-flex justify-content-center">
      <div class="login-image">
        <img src="@/assets/login.jpg" alt="login" width="500" />
      </div>
      <div class="input">
        <h1>Login</h1>
        <form>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      id: "",
      username: "",
      password: "",
    };
  },
};
</script>

<style></style>
