<template>
    <div class="row justify-content-around mb-5">
        <div class="card p-3 col-6" style="width: 30rem;">
            <img :src=post.post class="rounded card-img-top" />
            <div class="row card-body">
                <p class="card-text mb-0 mr-auto mt-2 text-wrap col-7 text-left">{{ post.caption }}</p>
                <div>
                    <button class="btn mr-2">like: {{ post.total_likes }}</button>
                    <button class="btn" @click="handleFetchComments">comments</button>
                </div>
            </div>
        </div>
        <CommentSection :show="showComments" :postId="post.id" ref="childRef" />
    </div>
</template>

<script>
import CommentSection from './CommentSection.vue';
export default {
    name: 'PostCard',
    components:{
        CommentSection
    },
    data() {
        return {
            showComments: false
        }
    },
    methods: {
        handleFetchComments(){
            this.showComments = !(this.showComments)

            if(this.showComments){
                const commentCommponent = this.$refs.childRef
    
                if (commentCommponent){
                    commentCommponent.fetchComments()
                } else {
                    console.error("no reference")
                }
            }
        }
    },
    props: {
        post: Object
    }
}
</script>