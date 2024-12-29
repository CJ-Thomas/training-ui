<template>
    <div v-if="show" class="border rounded col-5 p-3 bg-white">
        <div class="h-100 d-flex flex-column justify-content-between">
            <div v-if="result.length != 0" class="comment-container">
                <div v-for="comment in result" :key="comment.id" class="col-12 p-3">
                    <CommentComponent 
                        :comment="comment" 
                        v-on:reply-to-comment = "handleReplyTo" 
                        v-on:delete-comment = "handleDelete"
                    />
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
import CommentComponent from './CommentComponent.vue';

export default{
    name: 'CommentSection',
    props:{
        show:Boolean,
        postId:String
    },
    components:{
        CommentComponent
    },
    data(){
        return{
            result: [],
            replyToComment:"",
            newComment:""
        }
    },
    methods:{
        async fetchComments(){
            try{
                this.result = (await axios.get(`http://localhost:8080/api/v1/comment?postId=${this.postId}`)).data
            } catch(err) {
                console.log(err)
            }
        },

        handleReplyTo(id, uName){
            console.log(id)
            this.replyToComment = id
            this.newComment = `@${uName}`
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

        async handleDelete(id){
            try{
                await axios.delete(`http://localhost:8080/api/v1/comment/${id}`)

                // var commentIndex = this.result.findIndex((comment)=> comment.id === this.replyToComment)

                this.result = this.result.filter(comment => comment.id !== id)

            } catch(err) {
                console.log(err)
            }
        }

    },
}
</script>

<style scoped>
.comment-container{
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
  height: 28rem;
  overflow-y: scroll;
}
.comment-container::-webkit-scrollbar{
    display: none;
}
</style>