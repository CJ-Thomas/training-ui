<template>
    <div class="mt-5">
        <PostCards v-bind:posts = this.result.data />
    </div>
</template>

<script>
import axios from 'axios';
import PostCards from '@/components/PostCards.vue';

export default {
    name: 'ForyouPage',
    components:{
        PostCards
    },
    data(){
        return{
            result:[]
        }
    },
    methods: {
        async fetchPosts() {
            try {
                this.result = await axios.get('http://localhost:8081/api/v1/post')
                console.log(this.result.data)
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