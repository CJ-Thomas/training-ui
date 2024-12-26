<template>
    <div class="mb-3 d-flex flex-column justify-content-left">
        <small class="text-left mb-0">{{ comment.content }}</small>
        <div class="row p-3 justify-content-start">
            <small class="text-left mr-auto" role="button" @click="handleShowReplies()">
                {{ showReply? "hide replies" : "show replies" }}
            </small>
            <small class="text-left" role="button" @click="handleReplyTo(comment.id)">reply</small>
        </div>
        <div v-if="(showReply) && (comment.replies.length != 0)">
            <div v-for="reply in comment.replies" :key="reply.id" class="d-flex flex-column justify-content-left">
                <small class="text-left mb-0">{{ reply.content }}</small>
            </div>
        </div>
        <span class="border "></span>
    </div>
</template>

<script>
export default {
    name: 'CommentComponent',
    props: {
        comment: Object
    },
    data() {
        return {
            showReply: false
        }
    },
    methods:{
        handleShowReplies(){
            this.showReply = !this.showReply
        },

        handleReplyTo(id){
            this.$emit('reply-to-comment', id)
        }

    }
}
</script>