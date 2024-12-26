<template>
    <div v-if="this.$store.getters.getShowModalState" class="position-absolute container-fluid justify-content-center row fixed-top w-100 m-auto h-100 modal-bg">
        <div class="w-75">
            <div class="row justify-content-between mb-3 mt-2">
                <button class="btn btn-danger" @click="handleDelete"> delete post</button>
                <button class="btn btn-dark" @click="handleCloseModal"> x </button>
            </div>
    
            <PostCard :post="this.$store.getters.getFocusedPostState"/>
        </div>
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

                this.$store.dispatch('deletePost', post)

                this.$emit('handle-deleted-post')
                
            } catch(err){
                console.log(err)
            }

        }
    }
    

}
</script>

<style scoped>

.modal-bg{
    background-color: rgba(55, 55, 55, 0.5);
}
</style>