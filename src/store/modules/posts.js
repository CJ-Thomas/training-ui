const state = {
    posts:[]
}
const getters = {
    getPostsState: state => state.posts
}
const actions = {
    initPosts({commit}, posts){
        commit('setPosts', posts)
    },
    likePost({commit}, newLikeObj){
        commit('appendLike', newLikeObj)
    },
    unLikePost({commit}, like){
        commit('removeLike',like)
    },
    deletePost(){
        //
    }
}
const mutations = {
    setPosts(state, posts){
        state.posts = posts
    },

    appendLike(state, newLikeObj){
        var postIndex = state.posts.findIndex(post => post.id === newLikeObj.post.id)
        state.posts[postIndex].likedUsers = [...state.posts[postIndex].likedUsers, newLikeObj.like]
    },

    removeLike(state, likeObj){
        var postIndex = state.posts.findIndex(post => post.id === likeObj.post.id)
        
        state.posts[postIndex].likedUsers = state.posts[postIndex].likedUsers.filter(likedUser => likedUser.id !== likeObj.like.id)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}