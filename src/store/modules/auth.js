const state = {
    userName: localStorage.getItem('userName') || '',
    isAuth: localStorage.getItem('isAuth') || false
};

const getters = {
    stateUser: state => state.user,
    stateIsAuth: state => state.isAuth
};  


const actions = {
    
    loginAction({commit}, userAuth){
        if(userAuth.uName != "" && userAuth.uName != null){
            commit('setUserAuth', userAuth)
            localStorage.setItem('userName', userAuth.uName)
            localStorage.setItem('isAuth', userAuth.isAuth)
        }
    },

    logoutAction({commit}){
        commit('unSetUserAuth')
        localStorage.removeItem('userName')
        localStorage.removeItem('isAuth')
    }
};

const mutations = {

    setUserAuth(state, userAuth){
        state.userName = userAuth.uName
        state.isAuth = userAuth.isAuth
    },

    unSetUserAuth(state){
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