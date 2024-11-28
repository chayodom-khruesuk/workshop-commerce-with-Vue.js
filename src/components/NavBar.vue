<template>
  <div>
    <nav v-if="!isAuthPage" class="navbar">
      <div class="nav-content">
        <div class="nav-left">
          <div class="d-flex align-center">
            <v-btn
              icon
              class="mr-3 logo-btn"
              color="primary"
              @click="navigatorToHome"
            >
              <v-img src="../assets/icon_logo.png" class="nav-logo"></v-img>
            </v-btn>
            <span
              style="color: white; font-size: 22px; font-weight: bold"
              class="ml-2"
            >
              NETY SHOP
            </span>
          </div>
        </div>

        <div class="nav-center">
          <div class="search-container">
            <v-text-field
              v-model="searchQuery"
              prepend-inner-icon="mdi-magnify"
              placeholder="ค้นหาสินค้าที่ต้องการ"
              outlined
              dense
              hide-details
              class="search-input"
              @keyup.enter="handleSearch"
            ></v-text-field>
          </div>
        </div>

        <div class="nav-right">
          <v-btn
            v-if="username"
            text
            class="nav-btn"
            :to="{ name: 'product_create' }"
          >
            <v-icon left color="white" size="24">mdi-plus</v-icon>
            <!-- Set consistent size and color -->
            <span class="btn-text">Create Product</span>
          </v-btn>

          <v-btn text class="nav-btn" @click="handleCartClick">
            <v-badge
              :content="cartCount"
              :value="username && cartCount"
              color="error"
              overlap
            >
              <v-icon left color="white" size="24">mdi-cart</v-icon>
            </v-badge>
          </v-btn>

          <v-btn
            v-if="!username"
            text
            :to="{ name: 'login' }"
            class="nav-btn"
            :class="{ 'active-text': $route.name === 'login' }"
          >
            <span class="btn-text">Login</span>
          </v-btn>

          <v-menu
            v-else
            bottom
            offset-y
            transition="slide-y-transition"
            :close-on-content-click="false"
            :nudge-width="70"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn text class="nav-btn" v-bind="attrs" v-on="on">
                <v-icon left color="white" size="24">mdi-account</v-icon>
                <!-- Set consistent size and color -->
                <span class="btn-text">{{ username }}</span>
                <v-icon right color="white" size="24">mdi-chevron-down</v-icon>
                <!-- Set consistent size and color -->
              </v-btn>
            </template>

            <v-list>
              <v-list-item :to="{ name: 'profile' }">
                <v-list-item-icon>
                  <v-icon color="#17bb5b" size="24">mdi-account-circle</v-icon>
                  <!-- Set consistent size -->
                </v-list-item-icon>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>

              <v-list-item :to="{ name: 'history' }">
                <v-list-item-icon>
                  <v-icon color="#17bb5b" size="24">mdi-history</v-icon>
                  <!-- Set consistent size -->
                </v-list-item-icon>
                <v-list-item-title>History</v-list-item-title>
              </v-list-item>

              <v-list-item :to="{ name: 'cal-grade' }">
                <v-list-item-icon>
                  <v-icon color="#17bb5b" size="24">mdi-star</v-icon>
                  <!-- Set consistent size -->
                </v-list-item-icon>
                <v-list-item-title>Calculate Grade</v-list-item-title>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon color="#17bb5b" size="24">mdi-logout</v-icon>
                  <!-- Set consistent size -->
                </v-list-item-icon>
                <v-list-item-title>ออกจากระบบ</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
  data() {
    return {
      searchQuery: "",
    };
  },
  created() {
    this.$store.dispatch("initializeAuth");
  },
  computed: {
    isAuthPage() {
      return ["login", "signup"].includes(this.$route.name);
    },
    username() {
      return this.$store.state.username;
    },
    cartCount() {
      return this.$store.state.cart.length;
    },
  },
  methods: {
    handleSearch() {
      console.log("Searching for:", this.searchQuery);
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
    handleCartClick() {
      if (!this.username) {
        this.$router.push("/login");
      } else {
        if (this.$route.path !== "/cart") {
          this.$router.push("/cart");
        }
      }
    },
    async navigatorToHome() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.nav-logo {
  width: 220px;
  height: 220px;
  object-fit: contain;
  margin-top: 10%;
  margin-right: 20%;
}

.logo-btn::before {
  display: none;
}

.navbar {
  background-color: #17bb5b;
  padding: 22px 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.search-container {
  width: 100%;
  max-width: 500px;
}

.search-input {
  background-color: white !important;
  border-radius: 8px;
}

.search-input .v-input__control {
  border: none !important;
}

.search-input :deep(.v-input__slot) {
  background-color: white !important;
  border: none !important;
}

.search-input :deep(.v-text-field__details) {
  display: none;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.brand-icon {
  transition: transform 0.3s ease;
}

.brand-icon:hover {
  transform: scale(1.1);
}

.nav-btn {
  background-color: #17bb5b !important;
  color: white;
  position: relative;
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: transparent !important;
  z-index: 1;
}

.nav-btn:hover {
  background-color: rgba(23, 187, 91, 0.8);
}

.nav-btn::before {
  display: none;
}

.btn-text {
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  color: #ffffff;
}

.active-text {
  background-color: rgba(255, 255, 255, 0.2);
}

.content-wrapper {
  padding-top: 80px;
  min-height: 100vh;
  width: 100%;
}
</style>
