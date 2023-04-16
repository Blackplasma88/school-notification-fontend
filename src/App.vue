<template>
  <div class="app">
    <!-- <Main /> -->
    <router-view />
  </div>
</template>

<script>
// import Main from "@/components/main/Main.vue";
export default {
  // components: {
  //   Main,
  // },

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
  width: 98.9vw;
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
