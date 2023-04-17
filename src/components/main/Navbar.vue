<template>
  <nav
    class="w-100 navbar sticky-top navbar-expand-lg"
    style="position: fixed; top: 0; background-color: #3b5998"
  >
    <div class="container-fluid">
      <div class="container-fluid">
        <h2 class="navbar-brand">School Notification</h2>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul> -->
        <div class="menu">
          <div class="d-flex gap-4">
            <router-link
              v-if="role === 'teacher' || role === 'student'"
              to="/profile/:id"
              class="button"
            >
              <span class="material-icons">
                <font-awesome-icon icon="fa-solid fa-user" />
              </span>
            </router-link>
            <router-link to="/chat" class="button">
              <span class="material-icons">
                <font-awesome-icon icon="fa-solid fa-message" />
              </span>
            </router-link>
            <router-link to="/logout" class="button me-4">
              <span class="material-icons">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Navbar",
  data() {
    return {
      role: "",
    };
  },
  created() {
    this.role = localStorage.getItem("role");
  },
  components: { FontAwesomeIcon },
};
</script>

<style scoped>
h2 {
  color: #ffffff;
}
.material-icons {
  font-size: 1.5rem;
  color: #ffffff;
}
</style>
