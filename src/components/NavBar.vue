<template>
    <div class="navbar justify-content-between px-4 border rounded">
        <div class="monospace font-weight-bold">JASMP</div>
        <div>
            <router-link class="nav-item mr-5" to="/v1/for-you">home</router-link>
            <router-link class="nav-item mr-5" to="/v1/create-post">create</router-link>
            <router-link class="nav-item mr-5" to="/v1/profile">profile</router-link>
            <span class="text-danger" role="button" @click="logout">logout</span>
        </div>
    </div>
</template>

<script>
    export default{
        name:'NavBar',
        methods:{
            logout(){
                this.$store.dispatch('logoutAction')
                .then(() => this.$router.push('/login'))
            }
        }
    }
</script>

<style scoped>
    .border-w-3{
        border-width: 4rem;
    }
</style>