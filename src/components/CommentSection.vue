<template>
    <div v-if="show" class="border rounded col-5 p-3 ">
        <div class="h-100 d-flex flex-column justify-content-between">
            <div v-if="result.length != 0" class="comment-container">
                <div v-for="comment in result" :key="comment.id" class="mb-3 d-flex flex-column justify-content-left">
                    <small class="text-left mb-0">{{ comment.content }}</small>
                    <div class="row p-3 justify-content-start">
                        <small class="text-left mr-auto" role="button" @click="handleShowReplies(comment.id)">{{ showReplyId === comment.id ? "hide replies" : "show replies"}}</small>
                        <small class="text-left" role="button" @click="handleReplyTo(comment.id)">reply</small>
                    </div>
                    <div v-if="(showReplyId === comment.id) && (comment.replies.length !=0)" >
                        <div v-for="reply in comment.replies" :key="reply.id"  class="d-flex flex-column justify-content-left" >
                            <small class="text-left mb-0">{{ reply.content }}</small>
                        </div>
                    </div>
                    <span class="border "></span>
                </div>
            </div>
            <div v-else>
                <p>no comments for this post :(</p>
            </div>
            <div class="row d-flex px-3">
                <input v-model="newComment" class="border rounded mb-4 p-1 px-2 mr-auto col-10" id="addcomment"/>
                <button @click="handleAddComment(postId)" class="py-1 rounded btn btn-outline-dark" style="width: fit-content; height: fit-content;">>></button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: 'CommentSection',
    props:{
        show:Boolean,
        postId:String
    },
    data(){
        return{
            result: [],
            showReplyId: "",
            replyToComment:"",
            newComment:""
        }
    },
    methods:{
        async fetchComments(){
            try{
                this.result = (await axios.get(`http://localhost:8080/api/v1/comment?postId=${this.postId}`)).data
                console.log(this.result)

            } catch(err) {
                console.log(err)
            }
        },

        handleReplyTo(id){
            this.replyToComment = id
            this.newComment = "@"
        },

        handleShowReplies(id){
            if (this.showReplyId === id){
                this.showReplyId = ""
            } else {
                this.showReplyId = id
            }
        },

        async handleAddComment(postId){
            if(this.newComment == ""){
                alert("empty comment")
                return
            }

            if(this.newComment[0] !== "@")
                this.replyToComment = ""    

            const data = {
                userId: localStorage.getItem('uId'),
                postId: postId,
                content: this.newComment,
                parentCommentId: this.replyToComment
            }
            console.log(data)

            try{
                const comment = (await axios.post("http://localhost:8080/api/v1/comment/", data)).data
                
                if(this.newComment[0] === '@'){
                    var commentIndex = this.result.findIndex((comment)=> comment.id === this.replyToComment)
                    this.result[commentIndex].replies = [...this.result[commentIndex].replies, comment]
                } else {
                    this.result = [...this.result, comment]
                }

            } catch(err) {
                console.log(err)
            }
            
            this.newComment = ""
            this.replyToComment = ""
        },


    },
}
</script>

<style scoped>
    .comment-container{
        overflow: scroll;
    }
</style>