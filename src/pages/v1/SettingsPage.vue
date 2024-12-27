<template>
    <div class="h-100 border rounded mt-5 p-3">
        <h5 class="row text-monospace text-left mx-3 py-3" >settings</h5>
        <span class="border row mx-3 my-2" ></span>
        <div class="row p-3">
            <div class="col-6 mb-3">
                <label class="col-12 text-left p-0">
                    User Name
                </label>
                <div class="input-group">
                    <input v-if="editUserName" v-model="newUserName" class="col-12 form-control" placeholder="new user name"/>
                    <input v-else v-model="this.$store.getters.stateUser" class="col-12 form-control" disabled/>
                    <div class="input-group-append">
                        <span :class="{'input-group-text': true, 'text-primary': !editUserName, 'text-danger': editUserName}" role="button" @click="handleUserName" >{{ editUserName? "cancel" :"edit" }}</span>
                    </div>
                </div>
            </div>

            <div class="col-6 mb-3">
                <label class="col-12 text-left p-0">
                    Email
                </label>
                <div class="input-group">
                    <input v-if="editEmail" v-model="newEmail" class="col-12 form-control" placeholder="new email"/>
                    <input v-else v-model="this.$store.getters.stateEmail" class="col-12 form-control" disabled/>
                    <div class="input-group-append">
                        <span :class="{'input-group-text': true, 'text-primary': !editEmail, 'text-danger': editEmail}" role="button" @click="handleEmail" >{{ editEmail? "cancel" :"edit" }}</span>
                    </div>
                </div>
            </div>

            <div class="col-12 mb-4">
                <label class="col-12 text-left p-0">
                    Bio
                </label>
                <div class="input-group">
                    <input v-if="editBio" v-model="newBio" class="col-12 form-control" placeholder="new bio"/>
                    <input v-else v-model="this.$store.getters.stateBio" class="col-12 form-control" disabled/>
                    <div class="input-group-append">
                        <span :class="{'input-group-text': true, 'text-primary': !editBio, 'text-danger': editBio}" role="button" @click="handleBio" >{{ editBio? "cancel" :"edit" }}</span>
                    </div>
                </div>
            </div>
            <div class="col-12 justify-content-center">
                <button v-if="editUserName || editEmail || editBio" class="btn btn-success col-2">save changes</button>
            </div>
        </div>
        <span class="border row mx-3 my-4" ></span>
        <div class="row p-3">
            <div class="col-12 mb-3">
                <div class="input-group">
                    <input class="col-12 form-control" v-model="currentPassword" type="password" placeholder="current password" />
                </div>
            </div>
            <div class="col-6 mb-5">
                <input class="col-12 form-control" v-model="newPassword" type="password" placeholder="new password"/>
            </div>

            <div class="col-6 mb-5">
                <button v-if="newPassword === confirmNewPassword && newPassword!==''" class="col-12 btn btn-outline-success">change passsword</button>
                <input v-else class="col-12 form-control" v-model="confirmNewPassword" type="password" placeholder="confirm new password"/>
            </div>
        </div>
        <span role="button" class="row p-3 mt-5 justify-content-center text-danger" @click="handleDeleteAccount" >Delete account</span>
        <PasswordModal :showModal = "showModal" v-on:cancel-request="handleCancel" v-on:submit-request="handleSubmit" />
    </div>
</template>

<script>
import PasswordModal from '@/components/PasswordModal.vue';


export default {
    name: 'SettingsPage',
    components:{
        PasswordModal
    },
    data(){
        return{
            editUserName:false,
            newUserName:"",
            editEmail:false,
            newEmail:"",
            editBio:false,
            newBio:"",
            showModal: false,
            password:"",
            currentPassword:"",
            newPassword:"",
            confirmNewPassword:""
        }
    },
    methods:{
        handleUserName(){
            if(this.editUserName){
                this.editUserName = false
            } else {
                this.editUserName = true
                this.newUserName = ""
            }
        },
        handleEmail(){
            if(this.editEmail){
                this.editEmail = false
            } else {
                this.editEmail = true
                this.newEmail = ""
            }
        },
        handleBio(){
            if(this.editBio){
                this.editBio = false
            } else {
                this.editBio = true
                this.newBio = ""
            }
        },

        async handleDeleteAccount(){
            this.showModal = true
        },

        handleSubmit(password){
            this.password = password
        },

        handleCancel(){
            this.showModal = false
            this.editUserName=false,
            this.newUserName="",
            this.editEmail=false,
            this.newEmail="",
            this.editBio=false,
            this.newBio="",
            this.showModal= false
        }
    }
}
</script>