<template>
  <v-app>
    <v-container style="max-width: 1250px" class="mx-auto">
      <!-- Banner Section -->
      <v-row class="mb-4 mt-5">
        <v-col cols="8">
          <v-img
            src="https://picsum.photos/800/400"
            aspect-ratio="2"
            class="rounded-lg banner-image"
          ></v-img>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <v-img
                src="../assets/prod1.jpg"
                aspect-ratio="2"
                class="rounded-lg banner-image"
              ></v-img>
            </v-col>
            <v-col cols="12">
              <v-img
                src="../assets/prod2.jpg"
                aspect-ratio="2.1"
                class="rounded-lg banner-image"
              ></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <Categories />
      <Products />
    </v-container>
  </v-app>
</template>

<script>
import Categories from "./Categories_prod.vue";
import Products from "./Products.vue";

export default {
  name: "home",
  components: {
    Categories,
    Products,
  },
};
</script>
