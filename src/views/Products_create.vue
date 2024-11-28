<template>
  <v-container class="create-product-container">
    <v-card class="mx-auto product-card" elevation="6">
      <div class="header-section">
        <h2 class="text-h4 font-weight-bold">สร้างผลิตภัณฑ์ของคุณ</h2>
        <p class="subtitle-1">กรุณาเพิ่มรายละเอียดผลิตภัณฑ์ของคุณด้านล่าง</p>
      </div>

      <v-divider class="my-6" style="padding: 10px"></v-divider>

      <v-form ref="form" v-model="valid" style="padding: 20px">
        <v-row>
          <!-- Left Column - Image Upload -->
          <v-col cols="12" md="6">
            <div class="image-upload-section">
              <h3 class="section-title">รูปภาพผลิตภัณฑ์</h3>
              <div class="image-upload-container">
                <v-file-input
                  v-model="product.mainImage"
                  accept="image/*"
                  label="กรุณารูปภาพผลิตภัณฑ์"
                  outlined
                  dense
                  @change="previewMainImage"
                  class="mb-5"
                ></v-file-input>
                <div class="preview-container main-preview">
                  <v-img
                    v-if="mainImagePreview"
                    :src="mainImagePreview"
                    max-height="400"
                    contain
                    class="preview-image"
                  ></v-img>
                  <div v-else class="upload-placeholder">
                    <v-icon size="64" color="grey lighten-1"
                      >mdi-image-plus</v-icon
                    >
                    <p class="mt-2 grey--text">Main Product Image</p>
                  </div>
                </div>
              </div>

              <!-- Gallery Images -->
              <div class="gallery-upload mt-5">
                <v-file-input
                  v-model="product.galleryImages"
                  accept="image/*"
                  label="รูปผลิตภัณฑ์เพิ่มเติม"
                  outlined
                  dense
                  multiple
                  chips
                  class="mt-4"
                ></v-file-input>
              </div>
            </div>
          </v-col>

          <!-- Right Column - Product Details -->
          <v-col cols="12" md="6">
            <div class="product-details-section">
              <h3 class="section-title">รายละเอียดผลิตภัณฑ์</h3>

              <v-text-field
                v-model="product.name"
                label="ชื่อผลิตภัณฑ์"
                :rules="nameRules"
                outlined
                dense
                placeholder="e.g. Gaming Laptop Intel Core i7"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="product.price"
                label="ราคาผลิตภัณฑ์"
                type="number"
                prefix="$"
                min="0"
                :rules="priceRules"
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="product.quantity"
                label="จำนวน"
                type="number"
                min="0"
                :rules="quantityRules"
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <v-textarea
                v-model="product.shortDescription"
                label="รายละเอียด"
                outlined
                dense
                rows="3"
                counter="200"
                class="mb-4"
              ></v-textarea>

              <v-textarea
                v-model="product.description"
                label="รายละเอียดเพิ่มเติม"
                :rules="descriptionRules"
                outlined
                dense
                rows="6"
                counter="1000"
                class="mb-4"
              ></v-textarea>
            </div>

            <!-- Specifications Section -->
            <div class="specifications-section mt-6" style="padding: 10px">
              <h3 class="section-title">ข้อมูลจำเพาะ</h3>
              <v-btn text color="primary" @click="addSpecification">
                <v-icon left>mdi-plus</v-icon>
                Add Specification
              </v-btn>

              <div
                v-for="(spec, index) in product.specifications"
                :key="index"
                style="padding: 12px; border-radius: 8px"
              >
                <v-row>
                  <v-col cols="12" md="5">
                    <v-text-field
                      v-model="spec.name"
                      label="ชื่อ"
                      outlined
                      dense
                      placeholder="e.g. Processor"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="spec.value"
                      label="รายละเอียด"
                      outlined
                      dense
                      placeholder="e.g. Intel Core i7"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="1"
                    class="d-flex align-center justify-center"
                  >
                    <v-btn icon @click="removeSpecification(index)">
                      <v-icon color="black">mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-6" style="padding: 10px"></v-divider>

        <!-- Action Buttons -->
        <div class="button-container">
          <v-btn text large class="mr-4" @click="$router.go(-1)">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            large
            dark
            min-width="180"
            class="mr-4"
            @click="submitProduct"
          >
            Submit Product
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductsCreate",
  data: () => ({
    valid: false,
    mainImagePreview: null,
    product: {
      name: "",
      price: "",
      quantity: "",
      shortDescription: "",
      description: "",
      mainImage: null,
      galleryImages: null,
      specifications: [],
    },
    nameRules: [
      (v) => !!v || "Product name is required",
      (v) => v.length >= 3 || "Name must be at least 3 characters",
    ],
    priceRules: [
      (v) => !!v || "Price is required",
      (v) => v > 0 || "Price must be greater than 0",
      (v) => Number.isInteger(Number(v)) || "Price must be a whole number",
    ],
    quantityRules: [
      (v) => !!v || "Quantity is required",
      (v) => v >= 0 || "Quantity must be 0 or greater",
    ],
    descriptionRules: [
      (v) => !!v || "Description is required",
      (v) => v.length >= 10 || "Description must be at least 10 characters",
    ],
  }),

  methods: {
    previewMainImage(file) {
      if (file) {
        this.mainImagePreview = URL.createObjectURL(file);
      } else {
        this.mainImagePreview = null;
      }
    },

    addSpecification() {
      this.product.specifications.push({
        name: "",
        value: "",
      });
    },

    removeSpecification(index) {
      this.product.specifications.splice(index, 1);
    },

    async submitProduct() {
      if (this.$refs.form.validate()) {
        try {
          const formattedPrice = parseFloat(this.product.price).toFixed(2);

          let mainImageBase64 = null;

          if (this.product.mainImage) {
            mainImageBase64 = await this.optimizeAndConvertImage(
              this.product.mainImage
            );
          }

          const productData = {
            productName: this.product.name,
            productPrice: formattedPrice,
            shortDescription: this.product.shortDescription,
            productDescri: this.product.description,
            quantity: this.product.quantity,
            specifications: this.product.specifications,
            mainImage: mainImageBase64,
            gallery: this.product.galleryImages,
          };

          const response = await axios.post("/product", productData);

          if (response.data.success) {
            this.$swal({
              icon: "success",
              title: "Product Created Successfully",
              text: "Your product has been added to the system.",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$router.push("/");
          }
        } catch (error) {
          console.error("Failed to submit product:", error.response?.data);
        }
      }
    },

    optimizeAndConvertImage(file) {
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
.create-product-container {
  padding: 20px;
}

.product-card {
  border-radius: 10px;
  background-color: #fafafa;
}

.header-section {
  margin-bottom: 20px;
  text-align: center;
}

h2.text-h4 {
  color: #333;
}

.subtitle-1 {
  color: #666;
}

.image-upload-section,
.section-title {
  font-weight: 600;
  font-size: 18px;
  color: #17bb5b;
  margin-bottom: 15px;
}

.image-upload-container {
  background-color: #f9f9f9;
  border: 2px dashed #17bb5b;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.upload-placeholder {
  color: #aaa;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-preview {
  width: 100%;
}

.gallery-upload {
  margin-top: 20px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.v-btn {
  background-color: #17bb5b;
  color: white;
  font-weight: 600;
}

.v-btn:hover {
  background-color: #17bb5b;
}

.v-file-input {
  background-color: #f5f5f5;
}

.v-text-field {
  background-color: #fafafa;
}
</style>
