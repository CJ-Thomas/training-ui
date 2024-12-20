<template>
    <div v-if="show" class="border rounded col-5 p-3">
        <div class="h-100 d-flex flex-column justify-content-between">
            <div v-if="result.length != 0">
                <div v-for="comment in result" :key="comment.id" class="mb-3 d-flex flex-column justify-content-left">
                    <small class="text-left mb-0">{{ comment.content }}</small>
                    <small class="text-left" role="button" @click="handleShowReplies">{{ showReply ? "hide replies" : "show replies"}}</small>
                    <div v-if="showReply && (comment.replies.length !=0)" >
                        <div v-for="reply in comment.replies" :key="reply.id"  class="d-flex flex-column justify-content-left" >
                            <small class="text-left mb-0">{{ reply.content }}</small>
                        </div>
                    </div>
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
            showReply: false,
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
        handleShowReplies(){
            this.showReply = !(this.showReply)
        },

        handleAddComment(postId){
            if(this.newComment == ""){
                alert("empty comment")
                return
            }

            const data = {
                userId: localStorage.getItem('uId'),
                postId: postId,
                content: this.newComment
            }
            console.log(data)

            try{
                const comment = axios.post("http://localhost:8080/api/v1/comment/", data)
                console.log(comment)
            } catch(err) {
                console.log(err)
            }


            this.newComment = ""
        }
    },
}
</script>