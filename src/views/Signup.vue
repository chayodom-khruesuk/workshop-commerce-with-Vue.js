<template>
  <v-app class="bg-green">
    <v-app-bar color="white" elevation="0">
      <v-container>
        <v-row align="center">
          <v-col class="d-flex align-center">
            <div class="d-flex align-center">
              <span
                class
                style="color: black; font-size: 22px; font-weight: bold"
                >สมัครใหม่</span
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <!-- Left side - Image and Text -->
        <v-col cols="12" md="6" class="text-center">
          <div class="left-content">
            <v-img src="../assets/full_logo.png" height="500px" contain></v-img>
            <h1 class="text-darken-4 text">
              แหล่งช้อปปิ้งออนไลน์ที่ใหญ่ที่สุด<br />ในภาคใต้ของประเทศไทย
            </h1>
          </div>
        </v-col>

        <!-- Right side - Login Card -->
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
          <v-card class="pa-6" max-width="400">
            <v-card-title class="text-center">สมัครใหม่</v-card-title>

            <!-- Field Username -->
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

            <!-- Field Email -->
            <div class="input-margin">
              <input
                type="email"
                v-model="email"
                :class="{
                  'input-btn': true,
                  'error-border': hasInteracted.email && !isEmailValid,
                }"
                placeholder="อีเมล"
                @blur="hasInteracted.email = true"
              />
              <span
                v-if="hasInteracted.email && !isEmailValid"
                class="error-message"
              >
                {{
                  email.trim().length === 0
                    ? "กรุณากรอกอีเมล"
                    : "กรุณากรอกอีเมลให้ถูกต้อง"
                }}
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

            <!-- Confirm Password -->
            <div class="input-margin password-container">
              <input
                :type="isPasswordVisible ? 'text' : 'password'"
                v-model="confirmPassword"
                :class="{
                  'input-btn': true,
                  'error-border':
                    hasInteracted.confirmPassword && !isConfirmPasswordValid,
                }"
                placeholder="ยืนยันรหัสผ่าน"
                @blur="hasInteracted.confirmPassword = true"
              />
              <button
                type="button"
                class="password-toggle"
                @click="togglePassword"
              >
                <i
                  :class="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"
                ></i>
              </button>
              <span
                v-if="hasInteracted.confirmPassword && !isConfirmPasswordValid"
                class="error-message"
              >
                กรุณายืนยันรหัสผ่าน
              </span>
            </div>

            <!-- Button Login -->
            <button
              class="btn-login input-margin"
              :class="{ 'btn-disabled': !isFormValid }"
              :disabled="!isFormValid"
            >
              สมัครบัญชีผู้ใช้
            </button>
            <label class="text-lable">
              หากมีบัญชีผู้ใช้แล้ว คุณสามารถ
              <button type="button" class="login-btn" @click="navigateToLogin">
                เข้าสู่ระบบ
              </button>
            </label>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isPasswordVisible: false,
      hasInteracted: {
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  },
  methods: {
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    navigateToLogin() {
      this.$router.push("/login");
    },
  },
  computed: {
    isUsernameValid() {
      return this.username.trim().length > 0;
    },
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.email.trim().length > 0 && emailRegex.test(this.email);
    },
    isPasswordValid() {
      return this.password.trim().length > 0;
    },
    isConfirmPasswordValid() {
      return (
        this.confirmPassword === this.password &&
        this.confirmPassword.trim().length > 0
      );
    },
    isFormValid() {
      return (
        this.isUsernameValid &&
        this.isEmailValid &&
        this.isPasswordValid &&
        this.isConfirmPasswordValid
      );
    },
  },
};
</script>

<style>
.v-app-bar {
  min-height: 80px !important;
}

.login-btn {
  color: rgb(236, 78, 78);
  font-size: 14px;
  font-weight: bold;
}

.text {
  font-weight: bold;
  color: #e5efef;
  position: absolute;
  bottom: 5%;
  font-size: 27px;
}

.text-lable {
  color: #bfc9ca;
  font-size: 14px;
}

.bg-green {
  background-color: #17bb5b !important;
}

.input-btn {
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 16px;
}

.input-margin {
  margin-bottom: 24px;
  position: relative;
  min-height: 55px;
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
  top: 12px;
  background: none;
  border: none;
  cursor: pointer;
}

.password-toggle i {
  font-size: 18px;
  color: #555;
}

.error-message {
  color: red;
  font-size: 12px;
  position: absolute;
  bottom: -18px;
  left: 0;
}

.error-border {
  border-color: red !important;
}

.left-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: -100px;
}
</style>
