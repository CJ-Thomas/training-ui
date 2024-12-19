const state = {
    userName: null,
    isAuth: false
};
const getters = {
    StateUser: state => state.user,
    StateIsAuth: state => state.isAuth
};
const actions = {
    authUserAction({commit}, userName, isAuth){
        
        if(userName !== null || userName !==""){
            commit('setUser', userName)

            commit('setIsAuth', isAuth)
        }
    }
};
const mutations = {

    setUser(state, userName){
        state.userName = userName
    },

    setIsAuth(state, isAuth){
        state.isAuth = isAuth
    },

    logOut(state){
        state.userName = null,
        state.isAuth = false
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}