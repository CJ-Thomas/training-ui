const state = {
    userName: localStorage.getItem('userName') || '',
    email: localStorage.getItem('email') || '',
    bio: localStorage.getItem('bio') || '',
    isAuth: localStorage.getItem('isAuth') || false,
    uId: localStorage.getItem('uId') || ''
};

const getters = {
    stateUser: state => state.userName,
    stateIsAuth: state => state.isAuth,
    stateUId: state => state.uId,
    stateEmail: state => state.email,
    stateBio: state => state.bio
};  


const actions = {
    
    loginAction({commit}, userAuth){
        if(userAuth.uName != "" && userAuth.uName != null){
            commit('setUserAuth', userAuth)
            localStorage.setItem('userName', userAuth.uName)
            localStorage.setItem('isAuth', userAuth.isAuth)
            localStorage.setItem('uId', userAuth.uId)
            localStorage.setItem('email', userAuth.email)
            localStorage.setItem('bio', userAuth.bio)
        }
    },

    logoutAction({commit}){
        commit('unSetUserAuth')
        localStorage.removeItem('userName')
        localStorage.removeItem('isAuth')
        localStorage.removeItem('uId')
        localStorage.removeItem('email')
        localStorage.removeItem('bio')
    }
};

const mutations = {

    setUserAuth(state, userAuth){
        state.userName = userAuth.uName
        state.isAuth = userAuth.isAuth
        state.uId = userAuth.uId
        state.email = userAuth.email
        state.bio = userAuth.bio
    },

    unSetUserAuth(state){
        state.userName = ''
        state.isAuth = false
        state.uId = ''
        state.email = ''
        state.bio = ''
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}