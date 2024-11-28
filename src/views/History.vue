<template>
  <v-container>
    <h1 class="text-h4 mb-4" style="margin: 25px">ประวัติการสั่งซื้อ</h1>
    <v-card
      v-for="order in orders"
      :key="order._id"
      class="mb-4"
      style="margin-bottom: 20px"
    >
      <v-card-title>
        Order: {{ order._id }}
        <v-spacer></v-spacer>
        <span class="text-subtitle-1">{{
          new Date(order.orderDate).toLocaleDateString()
        }}</span>
      </v-card-title>

      <v-card-text>
        <div class="text-right mt-4">
          <div class="text-h6">{{ order.username }}</div>
        </div>

        <!-- Loop through products array -->
        <div
          v-for="(product, index) in order.products"
          :key="index"
          class="text-right mt-4"
        >
          <div class="text-h6">
            Product: {{ product.productName }} | Quantity:
            {{ product.quantity }}
          </div>
        </div>

        <div class="text-right mt-4">
          <div class="text-h6">Total: ฿{{ order.totalAmount }}</div>
        </div>
      </v-card-text>

      <!-- Reorder Button -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="reorder(order.products._id)">
          สั่งซื้ออีกครั้ง
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "history",
  data() {
    return {
      orders: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("/order");
      this.orders = response.data.data;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  },
  methods: {
    reorder(products) {
      products.forEach((product) => {
        const cartItem = {
          _id: product._id,
          productName: product.productName,
          productPrice: product.productPrice,
          mainImage: product.mainImage,
          quantity: product.quantity,
          maxQuantity: product.maxQuantity || product.quantity,
        };

        this.$store.commit("reorder", cartItem);

        this.$swal({
          icon: "success",
          title: "สินค้าได้เพิ่มลงตะกร้าแล้ว",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    },
  },
};
</script>

<style scoped>
.v-card {
  position: relative;
}

.v-card-actions {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
