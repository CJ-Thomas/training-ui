<template>
    <div class="container-fluid p-0 profile-container h-100">
        <div class="d-flex py-4">
            <img :src="user.profilePicture" width="120rem" class="border rounded-circle mr-4">
            <div class="d-flex flex-column justify-content-left">
                <h5 class="text-left">{{ user.uName }}</h5>
                <h6 class="text-left">{{ user.email }}</h6>
                <h6 class="text-left">{{ user.bio }}</h6>
                <router-link class="text-left" to="/v1/settings">manage your profile</router-link>
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
        <ViewPostModal v-on:handle-deleted-post="handleDeletedPost" />
    </div>
</template>

<script>
import ViewPostModal from '@/components/ViewPostModal.vue';
import axios from 'axios';

export default {
    name: 'ProfilePage',
    data() {
        return {
            user: {},
        }
    },
    components: {
        ViewPostModal
    },
    methods: {
        async fetchUserProfile() {

            try{
                const result = (await axios.get(`http://localhost:8080/api/v1/user/${localStorage.getItem('uId')}`))
    
                this.user = result.data.userProfile[0]

                this.$store.dispatch('initPosts', this.user.posts)
                
            } catch(err) {
                console.log(err)
            }

        },

        handleViewPost(post) {
            this.$store.dispatch('focusPost', { post: post, showModal: true })
        },

        handleDeletedPost(){
            this.user.posts = this.$store.getters.getPostsState
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