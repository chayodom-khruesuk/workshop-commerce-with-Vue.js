<template>
  <v-container>
    <h1 class="text-h4 mb-4">Shopping Cart</h1>
    <v-row>
      <!-- Cart Items -->
      <v-col cols="12" md="8">
        <v-card class="mb-4" v-for="item in cartItems" :key="item._id">
          <v-row no-gutters>
            <v-col cols="3">
              <v-img :src="item.mainImage" height="120" contain></v-img>
            </v-col>
            <v-col cols="9">
              <v-card-text>
                <div class="d-flex justify-space-between">
                  <div>
                    <div class="text-h6">{{ item.productName }}</div>
                    <div class="green--text">฿{{ item.productPrice }}</div>
                  </div>
                  <div>
                    <v-btn icon @click="removeFromCart(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>
                <v-text-field
                  v-model="item.quantity"
                  type="number"
                  min="1"
                  :max="item.maxQuantity"
                  outlined
                  dense
                  hide-details
                  class="mt-2"
                  style="max-width: 100px"
                  @change="updateQuantity(item)"
                ></v-text-field>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Order Summary -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Order Summary</v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between mb-2">
              <span>Subtotal</span>
              <span>฿{{ totalPrice }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="#17bb5b"
              block
              dark
              large
              @click="checkout"
              :loading="loading"
            >
              Proceed to Checkout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "cart",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    cartItems() {
      return this.$store.state.cart;
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.productPrice * item.quantity;
      }, 0);
    },
  },
  methods: {
    removeFromCart(item) {
      this.$store.commit("removeFromCart", item);
    },
    updateQuantity(item) {
      this.$store.commit("updateCartItemQuantity", item);
    },
    async checkout() {
      try {
        const orderData = {
          username: this.$store.state.username,
          products: this.cartItems.map((item) => ({
            productId: item._id,
            productName: item.productName,
            quantity: item.quantity,
            productPrice: item.productPrice,
            mainImage: item.mainImage,
          })),
        };
        console.log("Sending order data:", orderData);

        const response = await axios.post("/order", orderData, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        });

        if (response.data.success) {
          this.$store.commit("clearCart");

          this.$swal({
            icon: "success",
            title: "สั่งซื้อสำเร็จ",
            text: "ขอบคุณสำหรับการสั่งซื้อ",
            showConfirmButton: false,
            timer: 1500,
          });

          this.$router.push("/history");
        }
      } catch (error) {
        console.error("Checkout failed:", error.response?.data);
      }
    },
  },
};
</script>
