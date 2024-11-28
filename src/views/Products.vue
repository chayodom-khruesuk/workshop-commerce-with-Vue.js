<template>
  <v-row>
    <!-- Popular Products -->
    <v-col cols="12">
      <h2 class="text-h5 mb-4 green-text">สินค้าขายดี</h2>
      <v-card class="pa-4" outlined>
        <v-row>
          <v-col v-for="product in randomProducts" :key="product._id" cols="3">
            <v-card class="product-card" @click="goToProduct(product._id)">
              <v-img
                :src="product.mainImage"
                height="180"
                class="product-image"
              ></v-img>
              <v-card-title class="subtitle-1">{{
                product.productName
              }}</v-card-title>
              <v-card-text>
                <div class="text-h6 green--text">
                  ฿{{ product.productPrice }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <!-- ALL Products -->
    <v-col cols="12">
      <h2 class="text-h5 mb-4 green-text">สินค้าทั้งหมด</h2>
      <v-card class="pa-4" outlined>
        <v-row>
          <v-col v-for="product in products" :key="product._id" cols="3">
            <v-card
              class="product-card"
              @click="goToProduct(product._id)"
              :class="{ 'out-of-stock': product.quantity === 0 }"
              :disabled="product.quantity === 0 && !isAdmin"
            >
              <v-img
                :src="product.mainImage"
                height="180"
                class="product-image"
              >
                <div v-if="product.quantity === 0" class="out-of-stock-overlay">
                  สินค้าหมด
                </div>
              </v-img>
              <v-card-title class="subtitle-1">{{
                product.productName
              }}</v-card-title>
              <v-card-text>
                <div class="text-h6 green--text">
                  ฿{{ product.productPrice }}
                </div>
                <div v-if="product.quantity > 0" class="stock-status">
                  In Stock: {{ product.quantity }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Products_display",
  data() {
    return {
      products: [],
      randomProducts: [],
      timer: null,
    };
  },
  methods: {
    getRandomProducts() {
      const shuffled = [...this.products].sort(() => 0.5 - Math.random());
      this.randomProducts = shuffled.slice(0, 4);
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  async created() {
    try {
      const response = await axios.get("/product");
      this.products = response.data.data;
      this.getRandomProducts();

      // Set timer to refresh random products every minute
      this.timer = setInterval(() => {
        this.getRandomProducts();
      }, 60000); // 1 minute in milliseconds
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
  beforeDestroy() {
    // Clear interval when component is destroyed
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped>
.out-of-stock {
  opacity: 0.7;
  pointer-events: none;
}
.out-of-stock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}
.product-card {
  transition: transform 0.2s;
  border: 1px solid rgba(23, 187, 91, 0.1);
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(23, 187, 91, 0.2);
}

.product-image {
  border-bottom: 1px solid rgba(23, 187, 91, 0.1);
}

.green--text {
  color: #17bb5b !important;
}
</style>
