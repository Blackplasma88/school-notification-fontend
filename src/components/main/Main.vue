<template>
  <div class="app">
    <Sidebar />
    <div class="head">
      <Navbar />
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/main/Navbar.vue";
import Sidebar from "@/components/main/Sidebar.vue";

export default {
  components: {
    Navbar,
    Sidebar,
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss">
:root {
  --primary: #abffe3;
  --primary-alt: #7dffd3;
  --grey: #99ccff;
  --dark: #3b5998;
  --dark-alt: #476ebb;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--light);
}
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;
  width: 98vw;
  .head {
    flex: 1 1 0;
    padding: 0;
    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
    main {
      padding: 2rem;
    }
  }
}
</style>
