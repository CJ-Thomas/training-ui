<template>
    <div class="container-fluid p-0 profile-container h-100">
        <div class="d-flex py-4">
            <span
                class="rounded-pill bg-info monospace font-weight-bold text-center display-3 py-3 px-5 text-white mr-5">
                P </span>
            <div class="d-flex flex-column justify-content-left">
                <h5 class="text-left">{{ user.uName }}</h5>
                <h6 class="mb-auto text-left">{{ user.email }}</h6>
                <small class="text-left">manage your profile</small>
            </div>
        </div>
        <div class="h-100 border rounded">
            <div v-if="this.user.posts?.length === 0" class="text-center mt-5">
                no post... :(<br />
                add a new post
            </div>
            <div v-else class="d-flex flex-wrap h-25 p-3">
                <div v-for="post in user.posts" :key="post.id" class="p-1">
                    <div>
                        <img role="button" 
                            :src="post.content"
                            class="rounded flex-grow-1" 
                            width="216rem" 
                            @click="handleViewPost(post)"    
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="position-absolute">
            <button class="btn btn-danger" @click="()=>this.showModal = false"> close </button>
            <div class="">
                <PostCard :post="focusedPost"/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PostCard from '@/components/PostCard.vue';

export default {
    name: 'ProfilePage',
    data() {
        return {
            user: [],
            focusedPost: {},
            showModal: false
        }
    },
    components: {
        PostCard
    },
    methods: {
        async fetchUserProfile() {
            this.user = (await axios.get(`http://localhost:8080/api/v1/user/${localStorage.getItem('uId')}`))
                .data.userProfile[0]

        },

        handleViewPost(post) {
            this.focusedPost = post

            this.showModal = true
        }
    },
    mounted() {
        this.fetchUserProfile()
    }
}
</script>

<style scoped>
.profile-container {
    overflow: hidden;
}
</style>