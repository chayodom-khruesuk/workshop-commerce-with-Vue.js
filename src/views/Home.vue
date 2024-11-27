<template>
  <v-app>
    <v-btn @click="fetchData"> </v-btn>
  </v-app>
</template>

<script>
export default {
  name: "home",
  methods: {
    async fetchData() {
      try {
        const res = await this.axios.get("/users");
        console.log(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style></style>
