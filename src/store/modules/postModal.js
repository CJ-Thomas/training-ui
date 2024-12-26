const state = {
    focusedPost: {},
    showModal: false
}

const getters = {
    getFocusedPostState: state => state.focusedPost,
    getShowModalState: state => state.showModal
}

const actions = {
    focusPost({commit}, modalData){
        commit('setPost', modalData)
    },

    closeModal({commit}){
        commit('setPost',{ post: {}, showModal:false })
    },

}

const mutations = {
    setPost(state, modalData){
        state.focusedPost = modalData.post,
        state.showModal = modalData.showModal
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}