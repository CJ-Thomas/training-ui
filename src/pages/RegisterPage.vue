<template>
    <div class="container d-flex flex-column justify-content-center h-100">
        <div class="container border p-4 rounded w-75">
            <h4 class="monospace bold border rounded p-4 mb-5 bg-gradient-primary">Register</h4>

            <div class="col justify-content-center">
                <div class="row mb-4 justify-cotent-between p-0">
                    <div class="col-6">
                        <label class="text-left w-100" name="user-name">
                            user name
                        </label>
                        <input v-model="uName" class="col-12 border rounded p-1 px-2" id="user-name"/>
                    </div>
                    <div class="col-6">
                        <label class="text-left w-100" name="email">
                            email
                        </label>
                        <input v-model="email" class="col-12 border rounded p-1 px-2" id="email"/>
                    </div>
                </div>

                <div class="d-flex flex-column mb-4">
                        <label class="text-left" name="bio">
                            bio
                        </label>
                        <input v-model="bio" class="col-12 border rounded p-1 px-2" id="bio"/>
                    </div>
                <div class="d-flex flex-column">
                    <label class="text-left" name="password">
                        password
                    </label>
                    <input v-model="password" type="password" class="col-12 border rounded mb-4 p-1 px-2" id="password"/>
                </div>

                <div class="d-flex flex-column">
                    <label class="text-left" name="confirm-password">
                        confirm password
                    </label>
                    <input v-model="confirmPassword" type="password" class="col-12 border rounded mb-4 p-1 px-2" id="confirm-password"/>
                </div>

                <button class="btn btn-primary w-100" @click="register()">
                    register
                </button>
            </div>
        </div>
        <router-link class="mt-1 small" to="/login">have an account?</router-link>
    </div>
</template>

<script>
import axios from 'axios';


    export default{
        name:"RegisterPage",
        data(){
            return{
                uName:"",
                email:"",
                bio:"",
                password:"",
                confirmPassword:""
            }
        },
        methods:{
            async register(){

                if(this.password !==  this.confirmPassword){
                    alert("password not same")
                    return
                }

                try{
                    const result = await axios.post('http://localhost:8080/api/v1/user/',{
                        uName:this.uName,
                        email:this.email,
                        bio: this.bio,
                        password: this.password
                    })

                    if(result.status !== "error"){
                        this.$store.dispatch('loginAction', {
                            uId: result.data.id,
                            uName: this.uName,
                            isAuth: true
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