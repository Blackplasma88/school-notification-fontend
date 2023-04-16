<template>
  <div class="app">
    <Sidebar :hidden='haveCheck === "hidden"' v-if="sid_check" />
    <div class="head">
      <Navbar :hidden='haveCheck === "hidden"' v-if="nav_check" />
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
  props: {
    haveCheck: String,
  },

  data() {
    return {
      nav_check:true,
      sid_check:true,
    };
  },

  methods: {},
  mounted(){
    if (localStorage.getItem("token") != null && localStorage.getItem("token") != undefined){
      this.nav_check = true
      this.sid_check = true
    }
    console.log(this.haveCheck)
  },
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
