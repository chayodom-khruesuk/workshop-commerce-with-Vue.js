<template>
  <div>
    <nav v-if="!isAuthPage" class="navbar">
      <div class="nav-content">
        <div class="nav-brand">
          <v-btn icon class="brand-icon">
            <v-icon color="#A7121D" size="30px">rocket_launch</v-icon>
          </v-btn>
        </div>

        <div class="nav-links">
          <v-btn
            text
            :to="{ name: 'home' }"
            class="nav-btn"
            :class="{ 'active-text': $route.name === 'home' }"
          >
            <span class="btn-text">Home</span>
          </v-btn>

          <v-btn
            text
            :to="{ name: 'cal-grade' }"
            class="nav-btn"
            :class="{ 'active-text': $route.name === 'cal-grade' }"
          >
            <span class="btn-text">Calculate Grade</span>
          </v-btn>

          <v-btn
            text
            :to="{ name: 'login' }"
            class="nav-btn"
            :class="{ 'active-text': $route.name === 'login' }"
          >
            <span class="btn-text">Login</span>
          </v-btn>
        </div>
      </div>
    </nav>
    <div :class="{ 'content-wrapper': !isAuthPage }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    isAuthPage() {
      return ["login", "signup"].includes(this.$route.name);
    },
  },
  methods: {
    scroll(RouteName) {
      const element = document.getElementById(RouteName);
      element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #1a1a1a;
  padding: 12px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.nav-content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav-brand {
  margin-right: 40px;
}

.brand-icon {
  transition: transform 0.3s ease;
}

.brand-icon:hover {
  transform: scale(1.1);
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-btn {
  position: relative;
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background-color: rgba(167, 18, 29, 0.1);
}

.btn-text {
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  color: #ffffff;
}

.active-text {
  background-color: rgba(167, 18, 29, 0.2);
  color: #a7121d !important;
}

.active-text .btn-text {
  color: #a7121d;
}

.content-wrapper {
  padding-top: 80px;
  min-height: 100vh;
  width: 100%;
}
</style>
