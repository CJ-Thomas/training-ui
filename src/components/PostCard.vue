<template>
    <div class="row justify-content-around mb-5">
        <div class="card p-3 col-6" style="width: 30rem;">
            <img :src=post?.content class="rounded card-img-top" />
            <div class="row card-body">
                <p class="card-text mb-0 mr-auto mt-2 text-wrap col-7 text-left">{{ post?.caption }}</p>
                <div>
                    <p></p>
                    <button :class="{ 'btn': true, 'btn-outline-primary': !liked, 'btn-danger': liked }"
                        @click="handleLike(post)">like: {{ post?.likedUsers?.length }}</button>
                    <button class="btn" @click="handleFetchComments">comments</button>
                </div>
            </div>
        </div>
        <CommentSection :show="showComments" :postId="post?.id" ref="childRef" />
    </div>
</template>

<script>
import axios from 'axios';
import CommentSection from './CommentSection.vue';

export default {
    name: 'PostCard',
    components: {
        CommentSection
    },
    props: {
        post: Object
    },
    data() {
        return {
            showComments: false,
            liked: false
        }
    },
    methods: {
        handleFetchComments() {
            this.showComments = !(this.showComments)

            if (this.showComments) {
                const commentCommponent = this.$refs.childRef

                if (commentCommponent) {
                    commentCommponent.fetchComments()
                } else {
                    console.error("no reference")
                }
            }
        },

        checkUserLike() {
            this.liked = this.post?.likedUsers
                .findIndex(like => like.userId === localStorage.getItem('uId')) > -1 ? true : false
        },

        async handleLike(post) {
            if (this.liked) {
                this.liked = false

                try {
                    var like = post?.likedUsers.find(like => like.userId === localStorage.getItem('uId'))
                    await axios.delete(`http://localhost:8080/api/v1/post/interact/${like.id}`)
                    
                    this.$store.dispatch('unLikePost', { post: post, like: like })
                } catch (err) {
                    console.log(err)
                }
            } else {
                this.liked = true

                const data = {
                    userId: localStorage.getItem('uId'),
                    postId: post.id
                }

                try {
                    const result = await axios.post('http://localhost:8080/api/v1/post/interact', data)

                    this.$store.dispatch('likePost', { post: post, like: result.data })
                } catch (err) {
                    console.log(err)
                }

            }
        },
    },
    mounted() {
        this.checkUserLike()
    }
}
</script>