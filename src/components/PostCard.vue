<template>
    <div class="container row mb-5 p-0 justify-content-around">
        <div class="card p-3 col-7" style="width: 30rem;">
            <img :src = post.post class="rounded-lg card-img-top"/>
            <div class="row card-body">
                <p class="card-text mb-0 mr-auto mt-2 text-wrap col-7 text-left">{{ post.caption }}</p>
                <div>
                    <button class="btn mr-2">like: {{ post.total_likes }}</button>
                    <button class="btn" v-on:click="showComments = !(showComments)">comments</button>
                </div>
            </div>
        </div>
        <div v-if="this.showComments" class="border rounded col-4">
            comments sections
        </div>
    </div>
</template>

<script>
    export default{
        name:'PostCard',
        data(){
            return {
                showComments: false
            }
        },
        props:{
            post: Object
        }
    }
</script>