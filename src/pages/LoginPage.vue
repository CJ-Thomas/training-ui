<template>
    <div class="container d-flex flex-column justify-content-center h-100">
        <div class="container border p-4 rounded container-width">
            <h4 class="monospace bold border rounded p-4 mb-5 bg-gradient-primary">J.A.S.M.P</h4>
            <div class="">
                <div class="d-flex flex-column">
                    <label class="text-left" name="user-name">
                        user name
                    </label>
                    <input v-model="uName" class="col-12 border rounded mb-4 p-1 px-2" id="uName"/>
                </div>
                <div class="d-flex flex-column">
                    <label class="text-left" name="password">
                        password
                    </label>
                    <input v-model="password" type="password" class="col-12 border rounded mb-4 p-1 px-2" id="password"/>
                </div>

                <button class="btn btn-primary w-100" @click="authenticate()">
                    login
                </button>
            </div>
        </div>
        <router-link class="mt-1 small" to="/register">don't have an account?</router-link>
    </div>
</template>

<script>
import axios from 'axios';

    export default{
        name:"LoginPage",
        data(){
            return{
                uName:"",
                password:"",
                showPassword: false,
            }
        },
        methods:{
            async authenticate(){
                try{
                    const result = (await axios.post('http://localhost:8080/api/v1/user/login', {
                        uName: this.uName,
                        password: this.password
                    })).data

                    
                    if(result.status !== "error"){

                        console.log(result)
                        this.$store.dispatch('loginAction', {
                            uId: result.id,
                            uName: this.uName,
                            isAuth: true,
                            bio: result.bio,
                            email: result.email
                        })
                        .then(() => this.$router.push('/v1/for-you'))

                    }
                    else{
                        alert("wrong credentials")
                    }
                } catch(err) {
                    console.log(err)
                }
            }
        }
    }
</script>

<style scoped>
    .container-width{
        width: 22rem;
    }
</style>