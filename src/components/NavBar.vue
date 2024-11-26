<template>
    <v-app-bar app color="black" dark flat class="nav-bar">
        <v-btn icon class="mx-12">
            <v-icon color="#A7121D" size="30px">rocket_launch</v-icon>
        </v-btn>
        <v-btn text :to="{ name: 'home' }" class="mx-2" :class="{ 'active-text': $route.name === 'home' }">home</v-btn>
        <v-btn text :to="{ name: 'cal-grade' }" class="mx-2"
            :class="{ 'active-text': $route.name === 'cal-grade' }">cal-grade</v-btn>
        <v-btn text :to="{ name: 'login' }" class="mx-2"
            :class="{ 'active-text': $route.name === 'login' }">login</v-btn>
    </v-app-bar>
</template>
<script>

export default {
    methods: {
        scroll(RouteName) {
            const element = document.getElementById(RouteName);
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
}
</script>

<style>
.active-text {
    color: #A7121D !important;
}
</style>