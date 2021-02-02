export const state = () => ({
  auth: {
    loggedIn: false,
    user: {},
    token: localStorage.getItem('token') || sessionStorage.getItem('token')
  }
})
export const mutations = {
  add_auth_local(state, params) {
    state.auth.loggedIn = true
    state.auth.user = params.user
    localStorage.setItem('user', JSON.stringify(params.user))
    localStorage.setItem('token', params.token)
  },
  add_auth_session(state, params) {
    state.auth.loggedIn = true
    state.auth.user = params.user
    sessionStorage.setItem('user', JSON.stringify(params.user))
    sessionStorage.setItem('token', params.token)
  },
  remove_auth(state) {
    state.auth.loggedIn = false
    state.auth.user = {}
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }
}
export const actions = {
  authenticate({commit}, params) {

    const remember_me = params.remember_me
    const values = params.user

    return this.$axios.post('/login', values)
      .then(response => {

        if (remember_me) {
          commit('add_auth_local', response.data)
        } else {
          commit('add_auth_session', response.data)
        }

        this.$router.push('/')
        return Promise.reject(response)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  logout({commit}, params) {
    return this.$axios.post('/logout', params)
      .then(response => {
        commit('remove_auth')
        this.$router.push('/login')
        return Promise.reject(response)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  me({commit}, params) {
    return this.$axios.get('/me', params)
      .then(response => {
        if (sessionStorage.getItem('token')) {
          commit('add_auth_session', response)
        }
        if (localStorage.getItem('token')) {
          commit('add_auth_local')
        }
        return Promise.resolve(response)
      })
      .catch(error => {
      })
  },
  refresh({commit}) {

    return this.$axios.get('/refresh')
      .then(response => {

        commit('refresh', response.data)

        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

}
