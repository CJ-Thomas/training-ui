<template>
    <div class="navbar justify-content-between px-5 border rounded">
        <div class="monospace font-weight-bold">JASMP</div>
        <div class="justifu-content-between ">
            <router-link class="nav-item mr-5" to="/v1/for-you">home</router-link>
            <router-link class="nav-item mr-5" to="/v1/create-post">create</router-link>
            <router-link class="nav-item" to="/v1/profile">profile</router-link>
        </div>
    </div>
</template>

<script>
    export default{
        name:'NavBar'
    }
</script>

<style scoped>
    .border-w-3{
        border-width: 4rem;
    }
</style>