<template>
    <div class="row border-bottom justify-content-between">
        <img :src="comment.profilePicture" class="rounded-circle border" width="50rem" height="50rem" />
        <div class="mb-3 col-10">
            <small class="text-left row">{{ comment.userName }}</small>
            <small class="text-left row">{{ comment.content }}</small>
            <div class="row justify-content-between">
                <small class="text-left" role="button" @click="handleShowReplies()">
                    {{ showReply ? "hide replies" : "show replies" }}
                </small>
                <div>
                    <small 
                        class="text-left mr-3" 
                        role="button"
                        @click="handleReplyTo(comment.id, comment.userName)">
                        reply
                    </small>
                    <small
                        v-if="comment.userId === $store.getters.stateUId"
                        class="text-left" 
                        role="button"
                        @click="handleDelete(comment.id)">
                        delete
                    </small>
                </div>
            </div>
            <div v-if="(showReply) && (comment.replies.length != 0)" class="mt-2">
                <div v-for="reply in comment.replies" :key="reply.id" class="row">
                    <img :src="reply.profilePicture" class="rounded-circle border mr-3" width="38rem" height="38rem" />
                    <div class="row">
                        <small class="text-left mb-0 col-11">{{ reply.userName }}</small>
                        <small class="text-left mb-0 col-11">{{ reply.content }}</small>
                        <small
                        v-if="reply.userId === $store.getters.stateUId"
                        class="text-right" 
                        role="button"
                        @click="handleDelete(reply.id)">
                        delete
                    </small>
                    </div>
                </div>
            </div>
        </div>
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
    methods: {
        handleShowReplies() {
            this.showReply = !this.showReply
        },

        handleReplyTo(id, uName) {
            this.$emit('reply-to-comment', id, uName)
        },

        handleDelete(id){
            this.$emit('delete-comment', id)
        }

    }
}
</script>