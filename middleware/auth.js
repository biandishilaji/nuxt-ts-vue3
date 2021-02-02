export default async function ({store, redirect}) {

  if (store.state.account_auth.auth.token && store.state.account_auth.auth.loggedIn == false) {
    await store.dispatch('account_auth/me')
  }

  if (store.state.account_auth.auth.loggedIn == false) {
    return redirect('/login')
  }
}
