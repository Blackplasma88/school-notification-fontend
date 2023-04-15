<template>
  <!-- <aside hidden :class="`${is_expanded ? 'is-expanded' : ''}`"> -->
    <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div>
      <button @click="ToggleMenu">
        <img
          src="@/assets/logo.png"
          alt=""
          width="35"
          height="35"
          class="d-inline-block align-text-top"
        />
      </button>
    </div>
    &nbsp;
    <div>
      <router-link to="/profile/:id" class="button">
        <h3>Profile ID</h3>
        <h3>First Name</h3>
      </router-link>
    </div>

    <div class="menu">
      <router-link to="/" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-comments" />
        </span>
        <span class="text">Information</span>
      </router-link>
      <router-link to="/locations" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-location-dot" />
        </span>
        <span class="text">Location</span>
      </router-link>
      <router-link to="/subjects" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-book" />
        </span>
        <span class="text">Subject</span>
      </router-link>
      <router-link to="/profile/teacher" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-users" />
        </span>
        <span class="text"> Teacher Profile </span>
      </router-link>
      <router-link to="/profile/student" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-users" />
        </span>
        <span class="text"> Student Profile </span>
      </router-link>
      <router-link to="/profile/parent" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-users" />
        </span>
        <span class="text"> Parent Profile </span>
      </router-link>
      <router-link to="/classes" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-comments" />
        </span>
        <span class="text">Class</span>
      </router-link>
      <router-link to="/courses" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-list" />
        </span>
        <span class="text">Courses</span>
      </router-link>
      <router-link to="/school-manage" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-school-flag" />
        </span>
        <span class="text">School Mange</span>
      </router-link>
      <router-link to="/scores" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-table-list" />
        </span>
        <span class="text">Score</span>
      </router-link>
      <router-link to="/check-names" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-check" />
        </span>
        <span class="text">Check Names</span>
      </router-link>
      <router-link to="/summary" class="button">
        <span class="material-icons">
          <font-awesome-icon icon="fa-solid fa-chart-line" />
        </span>
        <span class="text">Summary</span>
      </router-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      is_expanded:
        localStorage.getItem("is_expanded") === "true" ? true : false,
    };
  },
  methods: {
    ToggleMenu() {
      this.is_expanded = !this.is_expanded;
      localStorage.setItem("is_expanded", this.is_expanded);
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  transition: 0.2s ease-in-out;
  position: sticky;
  .flex {
    flex: 1 1 0%;
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    // margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;
    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 1rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }
  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .menu {
    margin: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;
      .material-icons {
        font-size: 1.125rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      &:hover {
        background-color: var(--dark-alt);
        .material-icons,
        .text {
          color: var(--primary);
        }
      }
      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);
        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }
  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }
  &.is-expanded {
    width: var(--sidebar-width);
    h3,
    .button .text {
      opacity: 1;
    }
    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
    .footer {
      opacity: 0;
    }
  }
  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
