<template>
    <div v-if="this.$store.getters.getShowModalState" class="position-absolute fixed-top w-75 m-auto h-100 col justify-content-center">
        <div class="row justify-content-between mb-4">
            <button class="btn btn-danger" @click="handleDelete"> delete post</button>
            <button class="btn btn-dark" @click="handleCloseModal"> x </button>
        </div>

        <PostCard :post="this.$store.getters.getFocusedPostState"/>
    </div>
</template>

<script>
import axios from 'axios';
import PostCard from './PostCard.vue';

export default{
    name:'ViewPostModal',
    components:{
        PostCard
    },
    methods:{
        handleCloseModal(){
            this.$store.dispatch('closeModal')
        },
        
        async handleDelete(){
            var post = this.$store.getters.getFocusedPostState

            try{
                await axios.delete(`http://localhost:8080/api/v1/post/${post.id}`)
                this.$store.dispatch('closeModal')
                
            } catch(err){
                console.log(err)
            }

        }
    }
    

}
</script>