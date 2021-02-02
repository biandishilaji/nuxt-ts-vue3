export const getters = {
  isAuthenticated(state) {
    return state.account_auth.auth.loggedIn
  },

  loggedInUser(state) {
    return state.account_auth.auth.user
  }
}

