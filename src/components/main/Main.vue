<template>
  <div class="main">
    <!-- This is the sidebar -->
    <Sidebar />
    <!-- This is the main content -->
    <router-view />
    
  </div>
</template>

<script>
import Sidebar from "@/components/main/Sidebar.vue";

export default {
  components: {
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
.main {
  display: flex;
  main {
    flex: 1 1 0;
    padding: 2rem;
    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>
