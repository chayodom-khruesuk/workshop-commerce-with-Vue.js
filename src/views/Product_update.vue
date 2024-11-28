<template>
  <v-container>
    <v-card class="mb-4" style="margin-top: 40px; margin-bottom: 40px">
      <v-row>
        <!-- Form Section -->
        <v-col cols="12" md="6">
          <h1 class="form-title">Update Product</h1>

          <v-form ref="form" v-model="isValid" lazy-validation>
            <v-text-field
              v-model="product.productName"
              label="Product Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="product.productPrice"
              label="Price"
              type="number"
              required
            ></v-text-field>

            <v-text-field
              v-model="product.quantity"
              label="Quantity"
              type="number"
              required
            ></v-text-field>

            <v-textarea
              v-model="product.shortDescription"
              label="Short Description"
              rows="3"
            ></v-textarea>

            <v-textarea
              v-model="product.productDescri"
              label="Detailed Description"
              rows="5"
              required
            ></v-textarea>

            <v-btn
              color="primary"
              block
              :disabled="!isValid"
              @click="updateProduct"
            >
              Save Changes
            </v-btn>
          </v-form>
        </v-col>

        <!-- Image Upload Section -->
        <v-col cols="12" md="6">
          <h2 class="form-title">Upload Images</h2>
          <v-file-input
            v-model="mainImage"
            label="Main Image"
            accept="image/*"
            @change="previewImage('mainImage')"
          ></v-file-input>
          <v-img
            :src="preview.mainImage || product.mainImage"
            height="200"
            class="mb-4"
          ></v-img>

          <v-file-input
            v-model="galleryImages"
            label="Gallery Images"
            accept="image/*"
            multiple
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "update_product",
  data() {
    return {
      product: {
        productName: "",
        productPrice: "",
        quantity: "",
        shortDescription: "",
        productDescri: "",
        mainImage: "", // Add mainImage property to the product object
      },
      mainImage: null,
      galleryImages: null,
      preview: {
        mainImage: "",
      },
      isValid: false,
    };
  },
  async created() {
    try {
      const response = await axios.get(`/product/${this.$route.params.id}`);
      this.product = response.data.data;
      this.preview.mainImage = this.product.mainImage;
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  },
  methods: {
    previewImage(type) {
      if (type === "mainImage" && this.mainImage) {
        this.preview.mainImage = URL.createObjectURL(this.mainImage);
      }
    },
    async updateProduct() {
      if (this.$refs.form.validate()) {
        try {
          const formattedPrice = parseFloat(this.product.productPrice).toFixed(
            2
          );

          let mainImageBase64 = null;

          if (this.mainImage) {
            mainImageBase64 = await this.optimizeAndConvertImage(
              this.mainImage
            );
          } else {
            mainImageBase64 = this.product.mainImage;
          }

          // Prepare data for update
          const productDataUpdate = {
            productName: this.product.productName,
            productPrice: formattedPrice,
            shortDescription: this.product.shortDescription,
            productDescri: this.product.productDescri,
            quantity: this.product.quantity,
            mainImage: mainImageBase64,
            galleryImages: this.preview.galleryImages,
            specifications: this.product.specifications,
          };

          await axios.put(
            `/product/update/${this.$route.params.id}`,
            productDataUpdate
          );

          if (this.$route.path !== `/product/update/${this.$route.params.id}`) {
            this.$router.push(`/product/update/${this.$route.params.id}`);
          }

          this.$swal({
            icon: "success",
            title: "Product updated successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$router.push("/");
          });
        } catch (error) {
          console.error("Failed to update product:", error);
          this.$swal({
            icon: "error",
            title: "Failed to update product",
            text: error.response?.data?.message || error.message,
          });
        }
      }
    },

    async optimizeAndConvertImage(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.7));
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    },
  },
};
</script>

<style scoped>
.form-title {
  font-size: 24px;
  color: #0a1a48;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
