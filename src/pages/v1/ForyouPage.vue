<template>
    <div class="mt-5">
        <div v-for="post in posts" class="" v-bind:key="post.id">
            <PostCard :post = post />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PostCard from '@/components/PostCard.vue';

export default {
    name: 'ForyouPage',
    components:{
        PostCard,
    },
    data(){
        return{
            posts:[],
        }
    },
    methods: {
        async fetchPosts() {
            try {
                const result  = await axios.get('http://localhost:8080/api/v1/post')
                this.$store.dispatch('initPosts', result.data)
                this.posts = this.$store.getters.getPostsState

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