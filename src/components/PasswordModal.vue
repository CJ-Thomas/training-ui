<template>
    <div v-if="showModal" class="position-absolute container-fluid justify-content-center row fixed-top w-100 m-auto h-100 modal-bg">
        <div class="w-50 container h-50 p-5 bg-white rounded mt-5">
            <p class="justify-content-center mb-3">
                if you are sure that u want to delete your account<br/>
                type your password here
            </p>
            <input class="justify-content-center form-control mb-5" v-model="password" type="password" placeholder="enter password here" />
            <div class="row justify-content-between px-3">
                <button class="col-4 btn btn-danger" @click="handleCancle">cancel</button>
                <button class="col-4 btn btn-primary" @click="handleSubmit">submit</button>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:'PasswordModal',
    props:{
        showModal: Boolean
    },
    data(){
        return{
            password:""
        }
    },
    methods:{
        handleSubmit(){
            this.$emit('submit-request', this.password)
        },
        handleCancle(){
            this.$emit('cancel-request')
        }
    }
}
</script>

<style scoped>

.modal-bg{
    background-color: rgba(55, 55, 55, 0.5);
    overflow: hidden;
}
</style>