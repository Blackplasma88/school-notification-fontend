<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button @click="toggleSidebar">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div class="menu">
          <router-link to="/login" class="button">
            <span class="material-icons">
              <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
