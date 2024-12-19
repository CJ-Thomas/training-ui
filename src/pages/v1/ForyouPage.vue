<template>
    <div class="mt-5">
        <div v-for="post in this.result" class="d-flex justify-content-center" v-bind:key="post.id">
            <PostCard v-bind:post = post />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PostCard from '@/components/PostCard.vue';

export default {
    name: 'ForyouPage',
    components:{
        PostCard
    },
    data(){
        return{
            result:[]
        }
    },
    methods: {
        async fetchPosts() {
            try {
                this.result = ((await axios.get('http://localhost:8080/api/v1/post')).data)
                console.log(this.result)
            } catch (err) {
                console.log(err)
            }
        }
    },
    mounted(){
        this.fetchPosts()
    }

}
</script>