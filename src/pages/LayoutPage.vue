<template>
    <main class="container-fluid w-75 mt-3">
        <NavBar/>
        <router-view></router-view>
    </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

    export default{
        name:"LayoutPage",
        components: {
            NavBar
        }
    }
</script>