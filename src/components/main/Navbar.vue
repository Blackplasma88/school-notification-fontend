<template>
  <nav
    class="navbar sticky-top navbar-expand-lg"
    style="background-color: #3b5998"
  >
    <div class="container-fluid">
      <div class="container-fluid">
        <h2 class="navbar-brand">School Notification</h2>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div class="menu">
          <div class="d-flex gap-3">
            <router-link to="/profile/:id" class="button">
              <span class="material-icons">
                <font-awesome-icon
                  icon="fa-solid fa-user"
                  size="2x"
                  style="color: #ffffff"
                />
              </span>
            </router-link>
            <router-link to="/chat" class="button">
              <span class="material-icons">
                <font-awesome-icon
                  icon="fa-solid fa-message"
                  size="2x"
                  style="color: #ffffff"
                />
              </span>
            </router-link>
            <router-link to="/logout" class="button">
              <span class="material-icons">
                <font-awesome-icon
                  icon="fa-solid fa-right-from-bracket"
                  size="2x"
                  style="color: #ffffff"
                />
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
    return {};
  },
  methods: {},
  components: { FontAwesomeIcon },
};
</script>

<style scoped>
h2 {
  color: #ffffff;
}
</style>
