<template>
  <v-app class="bg-green">
    <NavBar />
    <v-container>
      <v-row justify="space-between">
        <v-col cols="12" md="6">
          <div>
            <v-img src="../assets/logo_shop.png" height="450px" contain></v-img>
            <h1 class="text-darken-4 text text-center mt-4">
              แหล่งช้อปปิ้งออนไลน์ที่ใหญ่ที่สุด<br />ในภาคใต้ของประเทศไทย
            </h1>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-6" max-width="400">
            <v-card-title class="text-center">เข้าสู่ระบบ</v-card-title>
            <!-- Field  Username -->
            <div class="input-margin">
              <input
                type="text"
                v-model="username"
                :class="{
                  'input-btn': true,
                  'error-border': hasInteracted.username && !isUsernameValid,
                }"
                placeholder="ชื่อผู้ใช้งาน"
                @blur="hasInteracted.username = true"
              />
              <span
                v-if="hasInteracted.username && !isUsernameValid"
                class="error-message"
              >
                กรุณากรอกชื่อผู้ใช้งาน
              </span>
            </div>
            <!-- Field Password -->
            <div class="input-margin password-container">
              <input
                :type="isPasswordVisible ? 'text' : 'password'"
                v-model="password"
                :class="{
                  'input-btn': true,
                  'error-border': hasInteracted.password && !isPasswordValid,
                }"
                placeholder="รหัสผ่าน"
                @blur="hasInteracted.password = true"
              />
              <button
                type="button"
                class="password-toggle"
                @click="togglePassword"
                :class="{
                  'error-adjust': hasInteracted.password && !isPasswordValid,
                }"
              >
                <i
                  :class="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"
                ></i>
              </button>
              <span
                v-if="hasInteracted.password && !isPasswordValid"
                class="error-message"
              >
                กรุณากรอกรหัสผ่าน
              </span>
            </div>
            <!-- Button Login -->
            <button
              class="btn-login input-margin"
              :class="{ 'btn-disabled': !isFormValid }"
              :disabled="!isFormValid"
            >
              เข้าสู่ระบบ
            </button>
            <label class="text-lable">
              เพิ่งเคยเข้ามาใน NetyShop ใช่หรือไม่
              <button
                type="button"
                class="signup-btn"
                @click="navigateToSignup"
              >
                สมัครใหม่
              </button>
            </label>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
  name: "login",
  components: {
    NavBar,
  },
  data() {
    return {
      username: "",
      password: "",
      isPasswordVisible: false,
      hasInteracted: {
        username: false,
        password: false,
      },
    };
  },
  methods: {
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    navigateToSignup() {
      this.$router.push("/Signup");
    },
  },
  computed: {
    isUsernameValid() {
      return this.username.trim().length > 0;
    },
    isPasswordValid() {
      return this.password.trim().length > 0;
    },
    isFormValid() {
      return this.isUsernameValid && this.isPasswordValid;
    },
  },
};
</script>

<style>
.signup-btn {
  color: rgb(236, 78, 78);
  font-size: 14px;
  font-weight: bold;
}

.text {
  font-weight: bold;
  color: #bfc9ca;
}

.text-lable {
  color: #bfc9ca;
  font-size: 14px;
}

.bg-green {
  background-color: #39df7e !important;
}

.input-btn {
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input-margin {
  margin-bottom: 20px;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background: #39df7e;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
}

.btn-disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.password-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  transition: top 0.3s ease;
}

.password-toggle.error-adjust {
  top: 35%;
}

.password-toggle i {
  font-size: 18px;
  color: #555;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

.error-border {
  border-color: red !important;
}
</style>
