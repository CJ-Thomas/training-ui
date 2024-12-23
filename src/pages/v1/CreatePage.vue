<template>
    <div class="mt-4 container-fluid p-0 h-100 row justify-content-center">
        
        <div class="border w-50 h-50 rounded mb-4 p-4">
            <input v-if="image === null" type="file" 
            name="fileUpload" 
            accept="image/*"
            @change="handleFileChange($event.target.files)"/>
            <div v-else class="container-fluid">
                <img :src="src" width="200rem" class="col-12 p-0 mb-auto" />
                <button class="btn btn-danger" @click="handleCancleClick"> cancle </button>
            </div>
        </div>
        <div class="border rounded container-fluid h-100 p-5">
            
            <input class="form-control mb-3" v-model="caption" placeholder="add caption here"/>
            
            <button class="btn btn-primary w-100" @click="onUpload">upload post</button>
        </div>
    </div>

</template>
<script>
import axios from 'axios';

    export default{
        name: 'CreatePage',
        data(){
            return{
                image: null,
                src: "",
                caption: ""
            }
        },
        methods:{
            handleFileChange(files){
                this.image = files[0]

                this.src = URL.createObjectURL(this.image)
            },

            handleCancleClick(){
                this.image = null

                this.src = ""
            },
            
            async onUpload(){
                const fd = new FormData();

                fd.append('content', this.image)
                fd.append('caption', this.caption)
                fd.append('userId', localStorage.getItem('uId'))

                try{
                    await axios.post('http://localhost:8080/api/v1/post', fd)

                    this.image = null
                    this.src = ""
                    this.caption = ""
                } catch(err) {
                    console.log(err)
                }
            }
        }
    }
</script>