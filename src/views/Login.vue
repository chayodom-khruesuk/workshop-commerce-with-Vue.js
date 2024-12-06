<template>
  <v-app class="bg-green">
    <v-overlay :value="isLoading">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>

    <v-app-bar color="white" elevation="0">
      <v-container>
        <v-row align="center">
          <v-col class="d-flex align-center justify-evenly">
            <div class="d-flex align-center">
              <v-btn
                v-if="isLoginMode"
                icon
                class="mr-3 logo-btn"
                color="primary"
                @click="navigatorToHome"
              >
                <v-img
                  src="../assets/icon_logo.png"
                  class="nav-logo"
                  style="
                    filter: brightness(0) saturate(100%) invert(56%) sepia(74%)
                      saturate(345%) hue-rotate(75deg) brightness(96%)
                      contrast(95%);
                  "
                ></v-img>
              </v-btn>
            </div>
            <span
              style="
                color: #17bb5b;
                font-size: 22px;
                font-weight: bold;
                margin-top: 14px;
              "
              class="mr-10"
            >
              NETY SHOP
            </span>
            <span
              style="
                color: black;
                font-size: 22px;
                font-weight: bold;
                margin-top: 12px;
              "
            >
              {{ isLoginMode ? "เข้าสู่ระบบ" : "สมัครใหม่" }}
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" md="6" class="text-center">
          <div class="left-content">
            <v-img src="../assets/full_logo.png" height="500px" contain></v-img>
            <h1 class="text-darken-4 text">
              แหล่งช้อปปิ้งออนไลน์ที่ใหญ่ที่สุด<br />ในภาคใต้ของประเทศไทย
            </h1>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="d-flex justify-center align-center">
          <v-card class="pa-6" max-width="400">
            <v-card-title class="text-center">
              {{ isLoginMode ? "เข้าสู่ระบบ" : "สมัครใหม่" }}
            </v-card-title>

            <div class="input-margin">
              <input
                type="text"
                v-model="formData.username"
                :class="getInputClass('username')"
                placeholder="ชื่อผู้ใช้งาน"
                @blur="setInteracted('username')"
              />
              <span v-if="showError('username')" class="error-message">
                กรุณากรอกชื่อผู้ใช้งาน
              </span>
            </div>

            <div v-if="!isLoginMode" class="input-margin">
              <input
                type="email"
                v-model="formData.email"
                :class="getInputClass('email')"
                placeholder="อีเมล"
                @blur="setInteracted('email')"
              />
              <span v-if="showError('email')" class="error-message">
                {{ getEmailErrorMessage() }}
              </span>
            </div>

            <div class="input-margin password-container">
              <input
                :type="isPasswordVisible ? 'text' : 'password'"
                v-model="formData.password"
                :class="getInputClass('password')"
                placeholder="รหัสผ่าน"
                @blur="setInteracted('password')"
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
              <span v-if="showError('password')" class="error-message">
                กรุณากรอกรหัสผ่าน
              </span>
            </div>

            <div v-if="!isLoginMode" class="input-margin password-container">
              <input
                :type="isPasswordVisible ? 'text' : 'password'"
                v-model="formData.confirmPassword"
                :class="getInputClass('confirmPassword')"
                placeholder="ยืนยันรหัสผ่าน"
                @blur="setInteracted('confirmPassword')"
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
              <span v-if="showError('confirmPassword')" class="error-message">
                กรุณายืนยันรหัสผ่าน
              </span>
            </div>

            <button
              class="btn-login input-margin"
              :class="{ 'btn-disabled': !isFormValid }"
              :disabled="!isFormValid"
              @click="handleSubmit"
            >
              {{ isLoginMode ? "เข้าสู่ระบบ" : "สมัครบัญชีผู้ใช้" }}
            </button>

            <label class="text-lable">
              {{
                isLoginMode
                  ? "เพิ่งเคยเข้ามาใน NetyShop ใช่หรือไม่"
                  : "หากมีบัญชีผู้ใช้แล้ว คุณสามารถ"
              }}
              <button
                type="button"
                :class="isLoginMode ? 'signup-btn' : 'login-btn'"
                @click="toggleMode"
              >
                {{ isLoginMode ? "สมัครใหม่" : "เข้าสู่ระบบ" }}
              </button>
            </label>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      isLoginMode: true,
      isPasswordVisible: false,
      isLoading: false,
      formData: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      hasInteracted: {
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  },
  methods: {
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
      this.resetForm();
    },
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    navigatorToHome() {
      this.$router.push("/");
    },
    resetForm() {
      this.formData = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
      this.hasInteracted = {
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
      };
    },
    setInteracted(field) {
      this.hasInteracted[field] = true;
    },
    getInputClass(field) {
      return {
        "input-btn": true,
        "error-border":
          this.hasInteracted[field] && !this.getFieldValidation(field),
      };
    },
    showError(field) {
      return this.hasInteracted[field] && !this.getFieldValidation(field);
    },
    getEmailErrorMessage() {
      return this.formData.email.trim().length === 0
        ? "กรุณากรอกอีเมล"
        : "กรุณากรอกอีเมลให้ถูกต้อง";
    },
    getFieldValidation(field) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      switch (field) {
        case "username":
          return this.formData.username.trim().length > 0;
        case "email":
          return (
            this.formData.email.trim().length > 0 &&
            emailRegex.test(this.formData.email)
          );
        case "password":
          return this.formData.password.trim().length > 0;
        case "confirmPassword":
          return (
            this.formData.confirmPassword === this.formData.password &&
            this.formData.confirmPassword.trim().length > 0
          );
        default:
          return false;
      }
    },
    async handleSubmit() {
      try {
        if (this.isLoginMode) {
          await this.handleLogin();
        } else {
          await this.handleSignup();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    ...mapActions(["login"]),

    async handleLogin() {
      try {
        this.isLoading = true;
        const response = await this.axios.post("auth/login", {
          username: this.formData.username,
          password: this.formData.password,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", this.formData.username);

          await this.$store.dispatch("login", this.formData.username);

          this.$swal({
            icon: "success",
            title: "เข้าสู่ระบบสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });

          this.$router.push("/");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async handleSignup() {
      try {
        this.isLoading = true;
        const response = await this.axios.post("/users", {
          username: this.formData.username,
          password: this.formData.password,
          email: this.formData.email,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", this.formData.username);

          await this.$store.dispatch("login", this.formData.username);

          this.$swal({
            icon: "success",
            title: "สมัครสมาชิกสำเร็จ",
            text: "ยินดีต้อนรับเข้าสู่ระบบ",
            showConfirmButton: false,
            timer: 1500,
          });

          this.$router.push("/");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    isFormValid() {
      const baseValidation =
        this.getFieldValidation("username") &&
        this.getFieldValidation("password");

      return this.isLoginMode
        ? baseValidation
        : baseValidation &&
            this.getFieldValidation("email") &&
            this.getFieldValidation("confirmPassword");
    },
  },
};
</script>

<style>
.logo-btn {
  box-shadow: none;
}

.nav-logo {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-top: 20%;
}
.v-app-bar {
  min-height: 80px !important;
}

.signup-btn {
  font-size: 14px;
  font-weight: bold;
  color: rgb(236, 78, 78);
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
  min-height: 60px;
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
  bottom: -12px;
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
