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
                <button v-if="editUserName || editEmail || editBio" class="btn btn-success col-2" @click="handleSaveChanges">save changes</button>
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
                <button v-if="newPassword === confirmNewPassword && newPassword!==''" class="col-12 btn btn-outline-danger" @click="handleCancelPassword">cancel</button>
                <input v-else class="col-12 form-control" v-model="newPassword" type="password" placeholder="new password"/>
            </div>

            <div class="col-6 mb-5">
                <button v-if="newPassword === confirmNewPassword && newPassword!==''" class="col-12 btn btn-outline-success" @click="handleChangePassword">change passsword</button>
                <input v-else class="col-12 form-control" v-model="confirmNewPassword" type="password" placeholder="confirm new password"/>
            </div>
        </div>
        <span role="button" class="row p-3 mt-5 justify-content-center text-danger" @click="handleDeleteAccount" >Delete account</span>
        <PasswordModal :showModal = "showModal" v-on:cancel-request="handleCancelEdit" v-on:submit-request="handleSubmit" />
    </div>
</template>

<script>
import PasswordModal from '@/components/PasswordModal.vue';
import axios from 'axios';


export default {
    name: 'SettingsPage',
    components:{
        PasswordModal
    },
    data(){
        return{
            editUserName:false,
            newUserName:this.$store.getters.stateUser,
            editEmail:false,
            newEmail: this.$store.getters.stateEmail,
            editBio:false,
            newBio: this.$store.getters.stateBio,
            showModal: false,
            currentPassword:"",
            newPassword:"",
            confirmNewPassword:"",
            action:"EDIT"
        }
    },
    methods:{
        handleUserName(){
            if(this.editUserName){
                this.editUserName = false
            } else {
                this.editUserName = true
                this.newUserName = this.$store.getters.stateUser
            }
        },

        handleEmail(){
            if(this.editEmail){
                this.editEmail = false
            } else {
                this.editEmail = true
                this.newEmail = this.$store.getters.stateEmail
            }
        },

        handleBio(){
            if(this.editBio){
                this.editBio = false
            } else {
                this.editBio = true
                this.newBio = this.$store.getters.stateBio
            }
        },

        handleDeleteAccount(){
            this.showModal = true
            this.action = "DELETE"
        },

        async handleSubmit(password){
            if(this.action === "EDIT"){
                var editedData = {}

                if(this.editUserName)
                    editedData = { ...editedData, uName: this.newUserName }

                if(this.editEmail)
                    editedData = { ...editedData, email: this.newEmail }

                if(this.editBio)
                    editedData = { ...editedData, bio: this.newBio }

                try{

                    await axios.put(`http://localhost:8080/api/v1/user/${this.$store.getters.stateUId}`,{
                        ...editedData,
                        password: password
                    })

                    alert("you will have to login again for the changes to take effect")
                    this.$store.dispatch('logoutAction')
                    this.$router.push('/login')

                    
                } catch (err) {
                    console.log(err)
                }
                
            } else if(this.action === "DELETE") {
                try{
                    await axios.delete(`http://localhost:8080/api/v1/user/${this.$store.getters.stateUId}`, {
                        data: {
                            password
                        }
                    })
                    this.$store.dispatch('logoutAction')
                    this.$router.push('/login')
                } catch (err) {
                    console.log(err)
                }
            }
            

        },

        handleSaveChanges(){
            this.showModal = true
            this.action = "EDIT"
        },

        handleCancelEdit(){
            Object.assign(this.$data, this.$options.data.apply(this))
        },

        async handleChangePassword(){
            if(this.newPassword === this.confirmNewPassword){
                try{
                    await axios.put(`http://localhost:8080/api/v1/user/${this.$store.getters.stateUId}/change-password`,{
                            currentPassword: this.currentPassword,
                            newPassword: this.newPassword,
                            confirmNewPassword: this.confirmNewPassword
                    })
                    alert("you will have to login again!")
                    this.$store.dispatch('logoutAction')
                    this.$router.push('/login')

                } catch(err) {
                    console.log(err)
                }
            }
        },

        handleCancelPassword(){
            this.currentPassword = ""
            this.newPassword = ""
            this.confirmNewPassword = ""
        }
    }
}
</script>