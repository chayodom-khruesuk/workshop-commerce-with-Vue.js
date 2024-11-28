<template>
  <v-container>
    <v-card class="mb-4" style="margin-top: 40px; margin-bottom: 40px">
      <v-row>
        <!-- Product Images -->
        <v-col cols="12" md="6">
          <v-img :src="product.mainImage" height="400" contain></v-img>
          <v-row class="mt-4">
            <v-col
              v-for="(image, i) in product.galleryImages"
              :key="i"
              cols="3"
            >
              <v-img
                :src="image"
                height="80"
                contain
                class="image-gallery"
              ></v-img>
            </v-col>
          </v-row>
        </v-col>

        <!-- Product Info -->
        <v-col cols="12" md="6">
          <!-- Edit Icon -->
          <v-btn icon class="edit-icon" @click="goToUpdatePage" color="primary">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <h1 class="product-title">{{ product.productName }}</h1>
          <div class="product-price">${{ product.productPrice }}</div>

          <div class="quantity-selector mb-4">
            <v-text-field
              v-model="quantity"
              type="number"
              label="Quantity"
              min="1"
              :max="product.quantity"
              outlined
              dense
            ></v-text-field>
          </div>

          <v-btn color="#17bb5b" x-large block dark @click="addToCart">
            Add to Cart
          </v-btn>

          <v-divider class="my-6"></v-divider>
        </v-col>
      </v-row>
    </v-card>

    <!-- Second Product Card -->
    <v-card class="mb-4" style="margin-top: 40px; margin-bottom: 40px">
      <div class="mb-4">{{ product.shortDescription }}</div>

      <!-- Product Description -->
      <div class="description-section">
        <h2 class="text-h6 mb-3">Description</h2>
        <div v-html="product.productDescri"></div>
      </div>

      <!-- Specifications -->
      <div class="specifications-section mt-6">
        <h2 class="text-h6 mb-3">Specifications</h2>
        <v-simple-table>
          <tbody>
            <tr v-for="(spec, index) in product.specifications" :key="index">
              <td class="font-weight-medium">{{ spec.name }}</td>
              <td>{{ spec.value }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "product_detail",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  async created() {
    try {
      const response = await axios.get(`/product/${this.$route.params.id}`);
      this.product = response.data.data;
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  },
  methods: {
    addToCart() {
      if (!this.$store.state.isLoggedIn) {
        this.$router.push("/login");
        return;
      }

      const cartItem = {
        _id: this.product._id,
        productName: this.product.productName,
        productPrice: this.product.productPrice,
        mainImage: this.product.mainImage,
        quantity: this.quantity,
        maxQuantity: this.product.quantity,
      };
      this.$store.commit("addToCart", cartItem);

      this.$swal({
        icon: "success",
        title: "เพิ่มสินค้าลงตะกร้าแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    goToUpdatePage() {
      this.$router.push(`/product/update/${this.product._id}`);
    },
  },
};
</script>

<style scoped>
.product-title {
  font-size: 26px;
  color: #0a1a48;
  font-weight: bolder;
  text-transform: capitalize;
  margin-bottom: 15px;
}

.product-price {
  font-size: 30px;
  color: #464a5b;
  font-weight: bold;
  margin-bottom: 15px;
}

.image-gallery {
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 100%;
}

.v-card {
  margin-top: 40px;
  margin-bottom: 40px;
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
