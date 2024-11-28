<template>
  <v-row class="mb-6">
    <v-col cols="12" class="mx-auto">
      <h2 class="text-h5 mb-4 green-text">Categories</h2>
      <v-row class="position-relative">
        <div class="categories-container">
          <div class="categories-slider" :style="sliderStyle">
            <div
              class="categories-page"
              v-for="page in categoryPages"
              :key="page[0]._id"
            >
              <v-col v-for="category in page" :key="category._id" cols="2">
                <v-card class="text-center category-card" flat>
                  <v-avatar size="64" class="mb-2 green-bg">
                    <v-icon size="32" color="#17bb5b">mdi-folder</v-icon>
                  </v-avatar>
                  <div class="category-name">{{ category.name }}</div>
                </v-card>
              </v-col>
            </div>
          </div>
        </div>
        <v-btn
          v-if="currentPage < totalPages"
          class="navigation-btn next-btn"
          icon
          @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-btn
          v-if="currentPage > 1"
          class="navigation-btn prev-btn"
          icon
          @click="prevPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Categories",
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 12,
      categories: [],
    };
  },
  async created() {
    await this.fetchCategories();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.categories.length / this.itemsPerPage);
    },
    categoryPages() {
      const pages = [];
      for (let i = 0; i < this.categories.length; i += 12) {
        pages.push(this.categories.slice(i, i + 12));
      }
      return pages;
    },
    sliderStyle() {
      return {
        transform: `translateX(-${(this.currentPage - 1) * 100}%)`,
      };
    },
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("/category");
        console.log("Categories data:", response.data.data);
        this.categories = response.data.data;
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
.green-text {
  color: #17bb5b;
}

.categories-container {
  width: 100%;
  overflow: hidden;
}

.categories-slider {
  display: flex;
  transition: transform 0.5s ease;
  width: fit-content;
}

.categories-page {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-width: 100%;
}

.category-card {
  transition: transform 0.2s;
  border: 1px solid rgba(23, 187, 91, 0.1);
  padding: 10px;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(23, 187, 91, 0.2);
}

.green-bg {
  background-color: rgba(23, 187, 91, 0.1);
}

.category-name {
  color: #333;
  margin-top: 8px;
  font-size: 0.9rem;
  font-weight: 500;
}

.category-description {
  margin-top: 4px;
  line-height: 1.2;
  height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.position-relative {
  position: relative;
}

.navigation-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #17bb5b !important;
  color: white !important;
  box-shadow: 0 2px 4px rgba(23, 187, 91, 0.2);
}

.next-btn {
  right: -20px;
}

.prev-btn {
  left: -20px;
}
</style>
