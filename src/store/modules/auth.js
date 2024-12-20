const state = {
    userName: localStorage.getItem('userName') || '',
    isAuth: localStorage.getItem('isAuth') || false,
    uId: localStorage.getItem('uId') || ''
};

const getters = {
    stateUser: state => state.user,
    stateIsAuth: state => state.isAuth,
    stateUId: state => state.uId
};  


const actions = {
    
    loginAction({commit}, userAuth){
        if(userAuth.uName != "" && userAuth.uName != null){
            commit('setUserAuth', userAuth)
            localStorage.setItem('userName', userAuth.uName)
            localStorage.setItem('isAuth', userAuth.isAuth)
            localStorage.setItem('uId', userAuth.uId)
        }
    },

    logoutAction({commit}){
        commit('unSetUserAuth')
        localStorage.removeItem('userName')
        localStorage.removeItem('isAuth')
        localStorage.removeItem('uId')
    }
};

const mutations = {

    setUserAuth(state, userAuth){
        state.userName = userAuth.uName
        state.isAuth = userAuth.isAuth
        state.uId = userAuth.uId
    },

    unSetUserAuth(state){
        state.userName = ''
        state.isAuth = false
        state.uId = ''
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}